const serverStatus = document.getElementById("server-status");
const statsSection = document.getElementById("stats-section");

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

async function fetchData() {

  try {
    const response = await fetch("http://localhost:5000/api/quotations/get_stats");
    if (!response.ok) {
      throw new Error(`Error requesting the server: '${response.status}'.`);
    }
    const formatedResponse = await response.json();
    const data = formatedResponse.data;
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error attempting request the server: '${error.message}'.`);
  }
}

function displayData(data) {
  const presentation = document.createElement("p");
  presentation.className = "center";
  presentation.innerHTML = "Use our database of authors and quotations !<br>Here are all the advantages:";
  statsSection.appendChild(presentation);

  const statsContainer = document.createElement("div");
  statsContainer.className = "stats-container";


  const quotationsBox = document.createElement("div");
  quotationsBox.className = "stats-box"
  quotationsBox.style.border = "5px solid Green"

  const quotationsCount = document.createElement("p");
  quotationsCount.innerHTML = data.quotations_count;
  quotationsCount.className = "bigger";

  const quotationsDescription = document.createElement("p");
  quotationsDescription.innerHTML = "Quotations known worldwide for their wisdom";
  quotationsDescription.className = "center";


  const authorsBox = document.createElement("div");
  authorsBox.className = "stats-box";
  authorsBox.style.border = "5px solid Orange";

  const authorsCount = document.createElement("p");
  authorsCount.innerHTML = data.authors_count;
  authorsCount.className = "bigger";

  const authorsDescription = document.createElement("p");
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
