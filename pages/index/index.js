let serverStatus = document.getElementById("server-status");
let statsSection = document.getElementById("stats-section");

async function processApp() {

  await fetchData()
  .then(data => {
    serverStatus.innerHTML = "Successfully connected to the database !";
    displayData(data);
  })
  .catch(error => {
    serverStatus.innerHTML = error.message;
  });
}

function fetchData() {

  return fetch("http://127.0.0.1:5000/api/quotations/get_stats")
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error requesting the server: '${response.status}'.`);
    }
    return response.json();
  })
  .then(response => {
    return response.data;
  })
  .then(data => {
    return JSON.parse(data);
  })
  .catch(error => {
    throw new Error(`Error attempting request the server: '${error.message}'.`);
  });
}

function displayData(data) {
  let presentation = document.createElement("p");
  presentation.className = "center bigger";
  presentation.innerHTML = "Use our database of authors and quotations !<br>Here are all the advantages:";

  let quotations_count = document.createElement("p");
  quotations_count.innerHTML = `Quotations Count: ${data.quotations_count}`;

  let authors_count = document.createElement("p");
  authors_count.innerHTML = `Authors Count: ${data.authors_count}`;

  statsSection.appendChild(presentation);
  statsSection.appendChild(quotations_count);
  statsSection.appendChild(authors_count);
}

processApp()
