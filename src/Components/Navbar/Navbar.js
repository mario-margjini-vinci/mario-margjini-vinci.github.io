
// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const navbar = `
<nav class="navbar navbar-expand-sm navbar-light" id="UpPage">

  <div class="d-flex justify-content-between w-100 pt-3">
    

    <div class="nav nav-underline ps-5">
      <a class="nav-link" style="font-size: 20px" href="#" data-uri="/">Accueil</a> 
    </div>

    <div class="nav nav-underline pe-5">
      <a class="nav-link" style="font-size: 20px" href="#" data-uri="/connexion">Se connecter</a>
      <a class="nav-link" style="font-size: 20px" href="#" data-uri="/inscription">S'inscrire</a>
    </div>

  </div>

</nav>
  `;
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;
