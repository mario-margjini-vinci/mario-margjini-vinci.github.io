import { clearPage, hideFooter } from '../../utils/render';
import { getAllStatistics } from '../../models/statistic';
import { clearAuthenticatedUser, getAuthenticatedUser, isAuthenticated } from '../../utils/auths';
import Navigate from '../Router/Navigate';
import { deletePrivacy } from '../../utils/privacy';
import { deleteAuthenticatedUser } from '../../models/user';
import Navbar from '../Navbar/Navbar';

const PersonnalStatsPage = async () => {
  if (!isAuthenticated()){
      Navigate('/connexion')
  } else{
    clearPage();
  await renderPersonalStatsPage();   
  }
};

async function renderPersonalStatsPage(){
  const main = document.querySelector('main');
  main.innerHTML=`  
  <h1 class="text-center" style="padding: 4% " id="username"></h1>

  <div class='container'>
  <div class="d-flex justify-content-center pt-5">
  <div class="card border-primary mb-3 w-50 d-flex" ">
  <div class="card-body text-primary">
  <table class="table">
  
  <tbody>
  
  <tr>
  <th scope="row">Nombre de questions répondues</th>
  <td id = "nb_questions"></td>
  
  <tr>
  <th scope="row">Nombre de parties jouées</th>
  <td id = "nb_parties"></td>
  
  </tr>
  <tr>
  <th scope="row">Nombre de victoires</th>
  <td id = "nb_victoires"></td>
  
  </tr>
  <tr>
  <th scope="row">Catégorie préférée</th>
  <td id = "categorie"></td>
  
  </tr>
  </tbody>
  </table>
  
  </div>
  </div>
  </div>
  </div>
  </div>
  <div class="container d-flex justify-content-center pt-5">
    <button id="deleteRGPD" class="btn btn-secondary">Retirer son consentement sur les règles RGPD</button>
  </div>

  <div class="container d-flex justify-content-center pb-5 pt-1">
    <p class="text-danger">Cette action entraînera la suppression de votre compte ainsi que de ses données !</p>
  </div>
  `
  hideFooter();
  await renderStats();
  attachEventListenerToDeleteRGPDButton();
}

async function renderStats() {
  const username = document.querySelector('#username');
  const tdNbQuestion = document.querySelector('#nb_questions');
  const tdNbParties = document.querySelector('#nb_parties');
  const tdNbVictoires = document.querySelector('#nb_victoires');
  const tdCategorie = document.querySelector('#categorie');

  const user = getAuthenticatedUser();
  const options = {
    headers: {
        'Authorization': user.token
    },
}
  const stats = await getAllStatistics(user.id, options);
  username.innerHTML = `Statistiques de ${stats.nom_utilisateur}`
  tdNbQuestion.innerHTML = `${stats.nb_questions_posees} questions posées` 
  tdNbParties.innerHTML = `${stats.nb_parties_jouees} parties jouées` 
  tdNbVictoires.innerHTML = `${stats.nb_victoire} parties remportées`
  tdCategorie.innerHTML = `${stats.nom_categorie}`

}

async function attachEventListenerToDeleteRGPDButton() {
  const button = document.querySelector('#deleteRGPD');
  const authenticatedUser = getAuthenticatedUser();
  button.addEventListener('click', async () => {
    deletePrivacy();
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': authenticatedUser.token
    },
    }
    await deleteAuthenticatedUser(authenticatedUser.id, options);
    clearAuthenticatedUser();
    Navbar();
    Navigate('/');
  })
}


export default PersonnalStatsPage;