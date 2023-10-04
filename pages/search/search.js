const serverStatus = document.getElementById("server-status");
const searchSection = document.getElementById("search-section");
const inputPhrase = document.getElementById("phrase");

inputPhrase.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    processApp();
  }
});

async function processApp() {
  initializePage();

  serverStatus.innerHTML = "Requesting the server...";

  fetchData(inputPhrase.value)
  .then(response => {
    serverStatus.innerHTML = "Successfully connected to the database !";
    displayData(response);
  })
  .catch(error => {
    serverStatus.innerHTML = error.message;
  });  
}

function initializePage() {
  const elements = document.getElementsByClassName("result");

  // Convert the collection to an array for easier manipulation
  const elementsArray = Array.from(elements);
  
  // Loop through the array and remove each element
  elementsArray.forEach(function(element) {
      element.parentNode.removeChild(element);
  });
}

async function fetchData(phrase) {
  const baseUrl = "http://localhost:5000/api/quotations/search_quotations";
  const params = `?phrase=${phrase}`;

  try {
    const response = await fetch(baseUrl + params);
    if (!response.ok) {
      throw new Error(`Error requesting the server: '${response.status}'.`);
    }
    formattedResponse = await response.json();
    return formattedResponse.data;

  } catch (error) {
    throw new Error(`Error attempting request the server: '${error.message}'.`);
  }
}

function displayData(data) {

  if (data.length === 0) {
    const p = document.createElement("p");
    p.innerHTML = "No result found.";
    p.className = "result";
    searchSection.appendChild(p);

  } else if (data.length === 1) {
    const p = document.createElement("p");
    p.innerHTML = "Result:";
    p.className = "result";
    searchSection.appendChild(p);

    for (let row of data) {
      displayQuotation(row);
    }

  } else if (data.length >= 1) {
    const p = document.createElement("p");
    p.innerHTML = "Results:";
    p.className = "result";
    searchSection.appendChild(p);

    for (let row of data) {
      displayQuotation(row);
    }

  } else {
    throw new Error("Error in API response.")
  }
}

function displayQuotation(data) {
  const container = document.createElement("div");
  container.className = "quote-container result";
  
  const box = document.createElement("div");
  box.className = "quote-box result";
  
  const quote = document.createElement("q");
  quote.className = "left result";
  quote.textContent = data.quotation;
  
  const author = document.createElement("p");
  author.className = "right result";
  
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
  searchSection.appendChild(container);
}
