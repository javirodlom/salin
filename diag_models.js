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

    const modelsToTest = [
        'gemini-1.5-flash-8b',
        'gemini-flash-latest',
        'gemini-pro-latest',
        'gemini-1.5-pro',
        'gemini-1.5-pro-latest'
    ];

    for (const modelName of modelsToTest) {
        try {
            console.log(`Testing ${modelName}...`);
            const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: "hi" }] }] })
            });
            const data = await resp.json();
            if (resp.ok) {
                console.log(`✅ SUCCESS with ${modelName}`);
                return modelName;
            } else {
                console.log(`❌ FAILED with ${modelName}: [${resp.status}] ${data.error ? data.error.message : JSON.stringify(data)}`);
            }
        } catch (err) {
            console.log(`❌ ERROR testing ${modelName}: ${err.message}`);
        }
    }
}

listModels();
