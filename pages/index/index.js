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

  return fetch("http://localhost:5000/api/quotations/get_stats")
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
  presentation.className = "center";
  presentation.innerHTML = "Use our database of authors and quotations !<br>Here are all the advantages:";
  statsSection.appendChild(presentation);

  let statsContainer = document.createElement("div");
  statsContainer.className = "stats-container";


  let quotationsBox = document.createElement("div");
  quotationsBox.className = "stats-box"
  quotationsBox.style.border = "5px solid Green"

  let quotationsCount = document.createElement("p");
  quotationsCount.innerHTML = data.quotations_count;
  quotationsCount.className = "bigger";

  let quotationsDescription = document.createElement("p");
  quotationsDescription.innerHTML = "Quotations known worldwide for their wisdom";
  quotationsDescription.className = "center";


  let authorsBox = document.createElement("div");
  authorsBox.className = "stats-box";
  authorsBox.style.border = "5px solid Orange";

  let authorsCount = document.createElement("p");
  authorsCount.innerHTML = data.authors_count;
  authorsCount.className = "bigger";

  let authorsDescription = document.createElement("p");
  authorsDescription.innerHTML = "Authors known worldwide for their work";
  authorsDescription.className = "center";

  quotationsBox.appendChild(quotationsCount);
  quotationsBox.appendChild(quotationsDescription);

  authorsBox.appendChild(authorsCount);
  authorsBox.appendChild(authorsDescription);

  statsContainer.appendChild(quotationsBox);
  statsContainer.appendChild(authorsBox);

  statsSection.appendChild(statsContainer);
}

processApp()
