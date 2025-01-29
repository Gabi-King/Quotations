const headerTemplate = document.createElement('template');

headerTemplate.innerHTML = `
  <link rel="stylesheet" type="text/css" href="styles.css" />
  
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Roboto&family=Open+Sans&family=Monaco&family=Actor&family=Tahoma&family=Verdana&display=swap" rel="stylesheet" />
  
  <header>
    <img class="center block" alt="Icon representing a sunrise." width="100px"  src="img/icon.png" />
    <div class="center container">
      <div class="center box">
        <h1>Quotations</h1>
      </div>
    </div>
    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="all.html">All quotations</a></li>
        <li><a href="search.html">Search quotations</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
  </header>
`;

class Header extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(headerTemplate.content);
  }
}

customElements.define('header-component', Header);
