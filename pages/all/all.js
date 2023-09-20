let quotationsStatus = document.getElementById("quotations-status");
let quotationsSection = document.getElementById("quotations-section");

async function processApp() {

    await fetchData()
    .then(response => {
      quotationsStatus.innerHTML = "Successfully connected to the database !";
      displayData(response.data);
    })
    .catch(error => {
      quotationsStatus.innerHTML = error.message;
    });
}

function fetchData() {
  return fetch("http://127.0.0.1:5000/api/quotations/get_quotations_with_authors")

  .then(response => {
    if (!response.ok) {
      throw new Error(`Error requesting the server: '${response.status}'.`);
    }
    return response.json();
  })

  .catch(error => {
    throw new Error(`Error attempting request the server: '${error.message}'.`);
  });
}

function displayData(data) {
  for (let row of data) {
    displayQuotation(row);
  }
}

function displayQuotation(data) {
  let container = document.createElement("div");
  container.className = "quote-container";
  
  let box = document.createElement("div");
  box.className = "quote-box";
  
  let quote = document.createElement("q");
  quote.className = "left";
  quote.textContent = data.quotation;
  
  let author = document.createElement("p");
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
