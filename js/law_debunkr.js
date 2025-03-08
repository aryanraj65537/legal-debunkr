document.getElementById("analyzeBtn").addEventListener("click", function() {
    const legalText = document.getElementById("legalText").value;
    const output = document.getElementById("output");

    // Simulating a call to the GPT API (replace with actual API in future)
    if (legalText) {
        output.innerHTML = `
            <p><strong>Original Text:</strong></p>
            <p>${legalText}</p>
            <p><strong>Simplified Version:</strong></p>
            <p>This is a simplified explanation of the legal document. The terms and conditions have been made clearer to help you understand better.</p>
        `;
    } else {
        output.innerHTML = "<p>Please enter some legal text to simplify.</p>";
    }
});
