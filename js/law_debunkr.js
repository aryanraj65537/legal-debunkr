document.getElementById("analyzeBtn").addEventListener("click", async function() {
    const legalText = document.getElementById("legalText").value;

    if (!legalText.trim()) {
        alert("Please enter some legal text to simplify.");
        return;
    }

    const apiKey = "#"; // Replace with your actual OpenAI API key
    const endpoint = "https://api.openai.com/v1/chat/completions";

    const requestBody = {
        model: "gpt-4", // Use the latest available model
        messages: [
            { role: "system", content: "You are a legal expert simplifying complex legal jargon into layman's terms. Make the output concise and clear (2-3 sentences)" },
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
            const simplifiedText = data.choices[0].message.content;
            document.getElementById("output").innerHTML = `<p>${simplifiedText}</p>`;

            // Show the Save Query button after the result is displayed
            const saveQueryBtn = document.getElementById("saveQueryBtn");
            saveQueryBtn.style.display = "block"; // Make the Save Query button visible

            // Store the simplified text for later saving
            saveQueryBtn.addEventListener("click", async function() {
                const userId = "user-id-placeholder"; // Replace with actual user ID logic if using Firebase Auth
                await saveQuery(legalText, userId, "Legal Query", simplifiedText); // Save both original and simplified texts
                alert("Query saved successfully!");
            });

        } else {
            document.getElementById("output").innerHTML = `<p>Error processing the request. Try again.</p>`;
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("output").innerHTML = `<p>Failed to simplify text. Please try again later.</p>`;
    }
});

// Save the query to Firestore
async function saveQuery(originalText, userId, title, simplifiedText) {
    if (!userId) {
        alert("You must be logged in to save queries.");
        return;
    }

    try {
        const db = firebase.firestore(); // Firebase Firestore reference
        await db.collection("saved_queries").add({
            userId: userId,
            title: title,
            originalText: originalText,
            simplifiedText: simplifiedText,
            timestamp: new Date()
        });
    } catch (error) {
        console.error("Error saving query:", error);
    }
}
