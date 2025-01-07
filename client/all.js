const serverStatus = document.getElementById("server-status");
const quotationsSection = document.getElementById("quotations-section");

async function processApp() {

    await fetchData()
        .then(response => {
            serverStatus.innerHTML = "Successfully connected to the database !";
            displayData(response);
        })
        .catch(error => {
            serverStatus.innerHTML = error.message;
        });
}

async function fetchData() {
    try {
        const response = await fetch("https://quotations.gabriel.paris/api/get_quotations_with_authors");
        if (!response.ok) {
            throw new Error(`Error requesting the server: '${response.status}'.`);
        }
        const formattedResponse = await response.json();
        return formattedResponse.data;

    } catch (error) {
        throw new Error(`Error attempting request the server: '${error.message}'.`);
    }
}

function displayData(data) {
    for (let row of data) {
        displayQuotation(row);
    }
}

function displayQuotation(data) {
    const container = document.createElement("div");
    container.className = "quote-container";

    const box = document.createElement("div");
    box.className = "quote-box";

    const quote = document.createElement("q");
    quote.className = "left";
    quote.textContent = data.quotation;

    const author = document.createElement("p");
    author.className = "right";

    if (data.first_name !== null) {
        author.textContent = `${data.first_name} `;
    }

    author.textContent += `${data.last_name}`;

    if (data.publication !== null) {
        author.textContent += `, ${data.publication}`;
    }

    box.appendChild(quote);
    box.appendChild(author);

    container.appendChild(box);
    quotationsSection.appendChild(container);
}

processApp()
