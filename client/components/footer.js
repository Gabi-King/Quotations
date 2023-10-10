const footerTemplate = document.createElement('template');

footerTemplate.innerHTML = `
  <link rel="stylesheet" type="text/css" href="../styles.css">

  <!--Import fonts from Google Fonts-->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Open+Sans|Monaco|Actor|Tahoma|
  Verdana|Arial">

  <!--Import icons from Google Fonts-->
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">

  <footer>
    <div>
      <img class="center block" src="../img/logo.png" alt="Logo of my company Gabriel Dong-Phuong" width="100px">
      <p>Author: <i>Gabriel PHAN</i><br>
        Website: <a target="_blank" href="https://www.gabriel.paris">gabriel.paris</a><br>
        (c) 2023 Gabriel PHAN. All rights reserved.</p>
    </div>
  </footer>
`;

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(footerTemplate.content);
  }
}

customElements.define('footer-component', Footer);
