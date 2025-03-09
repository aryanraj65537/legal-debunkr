document.getElementById("analyzeBtn").addEventListener("click", async function() {
    const legalText = document.getElementById("legalText").value;

    if (!legalText.trim()) {
        alert("Please enter some legal text to simplify.");
        return;
    }

    const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your actual OpenAI API key
    const endpoint = "https://api.openai.com/v1/chat/completions";

    const requestBody = {
        model: "gpt-4", // Use the latest available model
        messages: [
            { role: "system", content: "You are a legal expert simplifying complex legal jargon into layman's terms." },
            { role: "user", content: `Simplify this legal text: ${legalText}` }
        ],
        max_tokens: 500,
        temperature: 0.7
    };

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
            document.getElementById("output").innerHTML = `<p>${data.choices[0].message.content}</p>`;
        } else {
            document.getElementById("output").innerHTML = `<p>Error processing the request. Try again.</p>`;
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("output").innerHTML = `<p>Failed to simplify text. Please try again later.</p>`;
    }
});
