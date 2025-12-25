import { GoogleGenerativeAI } from "@google/generative-ai";
import { LeadData } from "../types";

const SYSTEM_INSTRUCTION = `
You are the AI Assistant for "Salin", a leading pharmaceutical distributor in Mexico.
Your goal is to answer operational questions and QUALIFY leads for the sales team.

KEY BUSINESS INFO (Use this to answer questions):
- We provide integral pharmaceutical distribution for pharmacies, clinics, and hospitals.
- Cold Chain: We handle 2-8°C and -15 to -25°C with IoT sensors and real-time monitoring.
- Compliance: Strict adherence to COFEPRIS, NOM-059, GDP (Good Distribution Practices), and ALCOA+ traceability.
- Operations: 24/7 digital ordering, automated FEFO (First Expired, First Out) management to reduce waste.
- Returns: Agile return policies.
- Coverage: Mexico national coverage.
- NO MEDICAL ADVICE: You do not give medical advice, dosage, or clinical recommendations. You only discuss logistics, supply, and regulation.

LEAD QUALIFICATION FLOW:
1. Greet the user warmly.
2. If the user is asking general questions, answer them.
3. If the user shows interest in buying or becoming a client, start the qualification process conversationally. Do not ask all questions at once. Ask 1-2 at a time.
4. Required Info to Collect:
   - Name
   - Establishment Type (Pharmacy, Clinic, Hospital, etc.)
   - City and State (Mexico)
   - Approximate Monthly Purchase Volume (Low/Medium/High or $ amount)
   - Categories of Interest (2-8°C, Biologics, Generics, High Specialty, OTC)
   - Sanitary License & Notice of Operation (Yes / In Process / No)
   - Urgency (This week / This month / Exploring)
   - Email
   - Phone
5. Logic:
   - If License = Yes/In Process AND Volume = Med/High AND Urgency = Week/Month -> High Intent.
   - If License = No -> Offer guidance but mark as "Nurture".
6. Once you have sufficient info, CALL the 'submitLead' tool. Tell the user you are connecting them with an advisor.

TONE: Professional, helpful, expert, yet approachable.
`;

const tools = [
  {
    functionDeclarations: [
      {
        name: 'submitLead',
        description: 'Submits the qualified lead information to the sales team system.',
        parameters: {
          type: "object",
          properties: {
            name: { type: "string", description: "Lead's full name" },
            establishmentType: { type: "string", description: "Type of establishment (e.g., Pharmacy)" },
            location: { type: "string", description: "City and State" },
            monthlyVolume: { type: "string", description: "Approximate monthly purchase volume" },
            categories: {
              type: "array",
              items: { type: "string" },
              description: "Product categories of interest"
            },
            licenseStatus: {
              type: "string",
              enum: ['Sí', 'En trámite', 'No'],
              description: "Status of Sanitary License"
            },
            urgency: {
              type: "string",
              enum: ['Esta semana', 'Este mes', 'Explorando'],
              description: "Urgency of requirement"
            },
            email: { type: "string", description: "Contact email" },
            phone: { type: "string", description: "Contact phone number" }
          },
          required: ['name', 'location', 'email']
        }
      }
    ]
  }
];

let chatSession: any = null;

export const initializeChat = async () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Gemini API Key is missing in .env.local");
    return null;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: tools as any
    });

    chatSession = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });
    console.log("Gemini session initialized correctly");
    return chatSession;
  } catch (err: any) {
    console.error("Error initializing Gemini:", err.message);
    return null;
  }
};

export const sendMessageToGemini = async (message: string, onLeadSubmit?: (lead: LeadData) => void) => {
  if (!chatSession) {
    await initializeChat();
  }

  if (!chatSession) return "Error: No se pudo inicializar el servicio de IA. Revisa las variables de entorno.";

  try {
    const result = await chatSession.sendMessage(message);
    const response = result.response;

    // Check for function calls
    const functionCalls = response.functionCalls();
    if (functionCalls && functionCalls.length > 0) {
      for (const call of functionCalls) {
        if (call.name === 'submitLead') {
          const leadData = call.args as unknown as LeadData;
          if (onLeadSubmit) {
            onLeadSubmit(leadData);
          }

          // Respond to the tool call
          const toolResult = await chatSession.sendMessage([{
            functionResponse: {
              name: 'submitLead',
              response: { result: "Success. Lead captured. Tell the user an advisor will contact them shortly." }
            }
          }]);

          return toolResult.response.text();
        }
      }
    }

    return response.text();
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    const errorMsg = error.message || "Error desconocido";
    return `Lo siento, hubo un error al procesar tu mensaje. (Detalle: ${errorMsg})`;
  }
};
