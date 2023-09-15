const headerTemplate = document.createElement('template');

headerTemplate.innerHTML = `
  <link rel="stylesheet" type="text/css" href="../../styles.css">

  <!--Import fonts from Google Fonts-->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Open+Sans|Monaco|Actor|Tahoma|
  Verdana|Arial">

  <!--Import icons from Google Fonts-->
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">

  <header>
    <img class="center block" alt="Icon representing a sunrise." width="100px"  src="../../img/icon.png">
    <div class="center container">
      <div class="center box">
        <h1>Quotations</h1>
      </div>  
    </div>
    <nav>
      <ul>
        <li><a href="../../pages/index/index.html">Home</a></li>
        <li><a href="../../pages/all/all.html">All quotations</a></li>
        <li><a href="../../pages/search/search.html">Search quotations</a></li>
        <li><a href="../../pages/contact/contact.html">Contact</a></li>
      </ul>
    </nav>
  </header>
`;

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(headerTemplate.content);
  }
}

customElements.define('header-component', Header);
