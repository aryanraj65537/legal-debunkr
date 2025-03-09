document.getElementById("analyzeBtn").addEventListener("click", async function () {
    const fileInput = document.getElementById("contractFile");
    if (fileInput.files.length === 0) {
        alert("Please upload a contract file to simplify.");
        return;
    }

    const file = fileInput.files[0];
    const fileType = file.name.split('.').pop().toLowerCase();

    if (fileType === "pdf") {
        processPDF(file);
    } else {
        alert("Currently, only PDF files are supported. Please upload a valid PDF.");
    }
});

function processPDF(file) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = async function () {
        const typedarray = new Uint8Array(reader.result);

        // Ensure pdf.js is loaded
        if (typeof pdfjsLib === "undefined" || !pdfjsLib.getDocument) {
            console.error("pdf.js is not properly loaded.");
            document.getElementById("output").innerHTML = `<p>PDF processing library not found. Please refresh and try again.</p>`;
            return;
        }

        pdfjsLib.getDocument(typedarray).promise.then(async function (pdf) {
            let extractedText = "";
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                extractedText += textContent.items.map(item => item.str).join(" ") + "\n\n";
            }
            sendToOpenAI(extractedText);
        }).catch(error => {
            console.error("Error loading PDF:", error);
            document.getElementById("output").innerHTML = `<p>Failed to read the PDF. Please try another file.</p>`;
        });
    };

    reader.onerror = function () {
        console.error("Error reading PDF file.");
        document.getElementById("output").innerHTML = `<p>Failed to read the PDF. Please try again.</p>`;
    };
}

async function sendToOpenAI(text) {
    if (!text.trim()) {
        document.getElementById("output").innerHTML = `<p>No text extracted. Please upload a valid document.</p>`;
        return;
    }

    const apiKey = "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"; // Replace with actual OpenAI API key
    const endpoint = "https://api.openai.com/v1/chat/completions";

    const requestBody = {
        model: "gpt-4",
        messages: [
            { role: "system", content: "You are a legal expert simplifying complex contract language into layman's terms." },
            { role: "user", content: `Simplify this contract text: ${text}` }
        ],
        max_tokens: 800,
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
        document.getElementById("output").innerHTML = `<p>Failed to simplify the contract. Please try again later.</p>`;
    }
}
