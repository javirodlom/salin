import fs from 'fs';

async function listModels() {
    let apiKey = "";
    try {
        const env = fs.readFileSync('.env.local', 'utf8');
        const match = env.match(/VITE_GEMINI_API_KEY=(.*)/);
        if (match) apiKey = match[1].trim();
    } catch (e) {
        console.error("Could not read .env.local");
        return;
    }

    try {
        const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await resp.json();
        if (data.models) {
            const chatModels = data.models.filter(m => m.supportedGenerationMethods.includes('generateContent'));
            console.log("SUPPORTED CHAT MODELS:");
            chatModels.forEach(m => {
                console.log(`- ${m.name}`);
            });
        } else {
            console.log("No models found or error in API key:", data);
        }
    } catch (err) {
        console.error("Error fetching models:", err.message);
    }
}

listModels();
