// Simulating a list of saved queries for now (you can later replace this with actual data from a database or API)
const savedQueries = [
    { id: 1, title: "Contract with ABC Corp", date: "2025-03-08", content: "This is a legal document for the contract with ABC Corp." },
    { id: 2, title: "Lease Agreement", date: "2025-03-05", content: "This is a lease agreement document between John and XYZ Rentals." },
    { id: 3, title: "Terms and Conditions", date: "2025-02-20", content: "This document contains the terms and conditions for using the service." },
];

// Function to display saved queries
function displaySavedQueries() {
    const savedQueriesList = document.getElementById("savedQueriesList");

    savedQueries.forEach(query => {
        const listItem = document.createElement("li");
        listItem.classList.add("query-item");

        listItem.innerHTML = `
            <div class="query-details">
                <h3>${query.title}</h3>
                <p><strong>Date:</strong> ${query.date}</p>
                <p><strong>Content Preview:</strong> ${query.content.slice(0, 100)}...</p>
                <button class="view-btn" onclick="viewQuery(${query.id})">View Details</button>
                <button class="delete-btn" onclick="deleteQuery(${query.id})">Delete</button>
            </div>
        `;

        savedQueriesList.appendChild(listItem);
}

// Function to view query details (this can be expanded later)
function viewQuery(id) {
    const query = savedQueries.find(query => query.id === id);
    alert(`Viewing details for: ${query.title}\n\nContent: ${query.content}`);
}

// Function to delete a query
function deleteQuery(id) {
    const confirmDelete = confirm("Are you sure you want to delete this query?");
    if (confirmDelete) {
        const index = savedQueries.findIndex(query => query.id === id);
        if (index !== -1) {
            savedQueries.splice(index, 1); // Remove the query from the array
            document.getElementById("savedQueriesList").innerHTML = ''; // Clear the list
            displaySavedQueries(); // Re-render the list
        }
    }
}

// Initial call to display the saved queries
displaySavedQueries();
