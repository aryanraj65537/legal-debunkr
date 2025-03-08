document.getElementById("analyzeBtn").addEventListener("click", function() {
    const fileInput = document.getElementById("contractFile");
    const output = document.getElementById("output");

    // Check if a file is uploaded
    if (fileInput.files.length === 0) {
        output.innerHTML = "<p>Please upload a document to simplify.</p>";
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    // Read the file as text (For simplicity in this example)
    reader.onload = function(event) {
        const fileContent = event.target.result;
        
        // Simulate a call to an API to analyze the file content
        output.innerHTML = `
            <p><strong>Original Content:</strong></p>
            <p>${fileContent.slice(0, 300)}...</p> <!-- Show first 300 characters of the document -->
            <p><strong>Simplified Version:</strong></p>
            <p>This is a simplified explanation of the document's terms and conditions. The legal jargon has been made clearer for easier understanding.</p>
        `;
    };

    // Simulate file reading process for text files (replace with proper PDF or DOCX parsing in real implementation)
    reader.readAsText(file);
});
