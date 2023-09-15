let serverStatus = document.getElementById("server-status");
let statsSection = document.getElementById("stats-section");

async function processApp() {

  await fetchData()
  .then(response => {
    serverStatus.innerHTML = "Successfully connected to the database !";
    displayData(response.data);
  })
  .catch(error => {
    serverStatus.innerHTML = error;
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

  .catch(error => {
    throw new Error(`Error attempting request the server: '${error.message}'.`);
  });
}

function displayData(data) {
  serverStatus.innerHTML = data;
  // let presentation = document.createElement("p");
  // presentation.className = "center";
  // presentation.innerHTML = "Use our database of authors and quotations !<br>Here are all the advantages:";

  // let quotations = document.createElement("p");
  // quotations.textContent = data.quotations_count.toString();

  // statsSection.appendChild(presentation);
  // statsSection.appendChild(quotations);
}

processApp()
