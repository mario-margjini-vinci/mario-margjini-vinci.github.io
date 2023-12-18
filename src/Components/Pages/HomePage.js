// eslint-disable-next-line import/no-extraneous-dependencies
import anime from 'animejs/lib/anime.es';
import { clearPage} from '../../utils/render';
import Navigate from '../Router/Navigate';


const HomePage = () => {
  clearPage();
  renderHomePage();
  launchButtonPlayAnimation();
};

function renderHomePage() {
  const main = document.querySelector('main');
  main.innerHTML = `<div class="mt-2 pb-5 d-flex flex-column align-items-center">
  <div class="container-fluid d-flex justify-content-center" style="padding-top: 5%;">
    <h1 class="text-center text-primary display-1">
      Trivial Vinci
    </h1>
  </div>

  <div class="align-middle text-center" style="padding-top: 5%;" >
    <div class="d-flex justify-content-center">
      <button type="button" class="btn btn-primary btn-lg" id="buttonPlay">PLAY</button>
    </div>
    <div class="d-flex justify-content-center pt-5">
      <i class="bi bi-book"><a href="#Rulesdiv"> Règles du jeu </a></i>
    </div>
  </div>

  <div style="padding-top: 80%"></div>
  <h2 class="text-center">Règles du jeu :</h2>
  </br>

  <div class="container-fluid d-flex justify-content-center" id="Rulesdiv">
  
 
  <p class="text-center">
    Bienvenue dans Trivial Vinci, le jeu de culture générale sur les études de la haute école Leonard De Vinci.
    Le but du jeu est simple : </br>
    Soyez le premier joueur à repondre correctement a une question de chaque catégorie afin d'obtenir les 6 étoiles de couleurs<br>
    et remporter la partie !</br>
    Le jeu comporte 6 catégorie. Informatique (INFO), Diétique (DIET), Infirmier (INFI), Coaching sportif (COSP), Imagerie (IMGM), Enseignant (ENSE).<br> 
    comment jouer ?</br>
    Un partie se joue à jusqu'a 4 joueurs sur le même ordinateur lorsque votre tour arrive prenez la main sur l'ordinateur et faites tourner la roue puis répondez a la question.</br>
    Si vous trouvez la bonne réponse, vous pouvez rejouer sinon c'est au tour du joueur suivant.
  </p>
  </div>
  <div class="container-fluid d-flex justify-content-center">
  <a href="#UpPage" class="text-secondary"> Retourner à la page du haut</a>
  </div>
</div>
  `;
}

function launchButtonPlayAnimation() {
  const buttonPlay = document.querySelector('#buttonPlay');
  const animation = anime({
    targets: buttonPlay,
    scale: 25, // Double la taille du bouton
    opacity: 0, // Rend le bouton transparent
    duration: 400, // Durée de l'animation en millisecondes
    easing: 'easeInOutQuad',
    autoplay: false,
  });
  /* const animation = anime({
    targets: buttonPlay,
    width: '10%', // -> from '28px' to '100%',
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true,
    autoplay: false
  }); */
  buttonPlay.addEventListener('click', () => animation.play());

  animation.complete = () => {
    Navigate('/setup');
  };

};


export default HomePage;
