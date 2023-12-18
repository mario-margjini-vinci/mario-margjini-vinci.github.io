import { clearPage, hideFooter } from '../../utils/render';
import win from '../../img/win.png';
import Navigate from '../Router/Navigate';

const Win = async () => {
const winner = JSON.parse(sessionStorage.getItem('winner'));
    
    if (!winner) {
        Navigate('/game');
        return;
    }
    

    clearPage();
    
    renderWinPage();
};


function renderWinPage(){
    const main = document.querySelector('main');
    main.innerHTML = `<div class="container-fluid d-flex align-items-center justify-content-center" style="padding-top: 5%;">
    <h1 class="text-center text-primary display-1" id="msg"></h1>
</div>
<div id="win" class="d-flex flex-column align-items-center justify-content-center mt-5">

</div>
<div class="d-flex flex-column align-items-center justify-content-center mt-5">
<input id="toStats"type="button" class = "btn btn-primary btn-lg" value="Aller aux statistiques de partie" style="float:center;"/>
</div>
`
hideFooter()
renderImage(win)  
    const msg = document.querySelector('#msg');
    msg.innerHTML = ` Victoire ! ${JSON.parse(sessionStorage.getItem('winner')).name} a gagné !`
    
    const btn = document.querySelector('#toStats');
    btn.addEventListener('click', () => {
        Navigate('/gameStats');
    });
}

function renderImage(url){
    const img = document.querySelector('#win');
    img.innerHTML += `<img src="${url}" height="350">`
  }
export default Win;