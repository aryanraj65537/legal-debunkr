// Event listener for the 'Simplify' button to call GPT API and simplify legal text
document.getElementById("analyzeBtn").addEventListener("click", async function () {
    const legalText = document.getElementById("legalText").value.trim();
    const output = document.getElementById("output");
    const analyzeBtn = document.getElementById("analyzeBtn");

    if (!legalText) {
        output.innerHTML = "<p>Please enter some legal text to simplify.</p>";
        return;
    }

    // Disable the button to prevent multiple clicks
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = "Simplifying... Please wait.";

    output.innerHTML = "Simplifying... Please wait.";

    // Call the OpenAI API to simplify the text
    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer YOUR_OPENAI_API_KEY`, // Add your OpenAI API key here
            },
            body: JSON.stringify({
                model: "text-davinci-003", // You can also use other models like "gpt-3.5-turbo"
                prompt: `Simplify the following legal text so that it is easily understandable by a general audience:\n\n${legalText}`,
                max_tokens: 150, // Limit the length of the response
                temperature: 0.7, // Control the randomness of the model's response
            }),
        });

        const data = await response.json();
        
        if (data.choices && data.choices.length > 0) {
            output.innerHTML = `
                <p><strong>Original Text:</strong></p>
                <p>${legalText}</p>
                <p><strong>Simplified Version:</strong></p>
                <p>${data.choices[0].text.trim()}</p>
            `;
        } else {
            output.innerHTML = "<p>Could not simplify the text. Please try again.</p>";
        }
    } catch (error) {
        console.error("Error simplifying text:", error);
        output.innerHTML = "<p>An error occurred. Please try again later.</p>";
    }

    // Re-enable the button after the operation
    analyzeBtn.disabled = false;
    analyzeBtn.innerHTML = "Simplify";
});
