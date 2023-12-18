import { clearPage, hideFooter} from '../../utils/render';
import Navigate from '../Router/Navigate';
import { getAuthenticatedUser, isAuthenticated } from '../../utils/auths';
import { updateStatistics } from '../../models/statistic';

const StatPage = async () => {
    clearPage();
    
    if(sessionStorage.length === 0){
        Navigate('/setup');
    } else{
        renderStatPage();

    if (isAuthenticated()){
        await addToPersonalStats();
    } 
}
}

    

function renderStatPage(){
    const main = document.querySelector('main');
    main.innerHTML=`
    <h1 class="text-center" style="padding: 4% ">Statistiques de la partie</h1>
    <div class="container-fluid">
        <div class="row">

            <!-- Table 1 -->
            <div class="col-md-3">
                <table class="table table-bordered table-info">
                    <thead>
                        <tr>
                            <th id="player1Name"></th>
                        </tr>
                    </thead>
                    <tbody id="content1"></tbody>
                </table>
            </div>

            <!-- Table 2 -->
            <div class="col-md-3">
                <table class="table table-bordered table-success">
                    <thead>
                        <tr>
                            <th id="player2Name"></th>
                        </tr>
                    </thead>
                    <tbody id="content2"></tbody>
                </table>
            </div>

            <!-- Table 3 -->
            <div class="col-md-3" id="table3">
                <table class="table table-bordered table-danger">
                    <thead>
                        <tr>
                            <th id="player3Name"></th>
                        </tr>
                    </thead>
                    <tbody id="content3"></tbody>
                </table>
            </div>

            <!-- Table 4 -->
            <div class="col-md-3">
                <table class="table table-bordered table-warning" id="table4">
                    <thead>
                        <tr>
                            <th id="player4Name"></th>
                        </tr>
                    </thead>
                    <tbody id="content4"></tbody>
                </table>
            </div>

        </div>
    </div>
    <div class="d-flex flex-column align-items-center justify-content-center mt-5">
<input type="button" class = "btn btn-primary btn-lg" value="Rejouer" style="float:center;" id='replay' />
</div>
    `
    hideFooter()
    players()

const btn = document.querySelector('#replay');
btn.addEventListener('click', () => {
    Navigate('/setup');
});
}

function players(){
    /* Récupère tous les endroits où il un nom a display */
    const player1Name = document.querySelector("#player1Name");
    const player2Name = document.querySelector("#player2Name");
    const player3Name = document.querySelector("#player3Name");
    const player4Name = document.querySelector("#player4Name");
    
    /* Récupère les joueurs du sessionStorage */
    const player1 = JSON.parse(sessionStorage.getItem('player1'));
    const player2 = JSON.parse(sessionStorage.getItem('player2'));
    const player3 = JSON.parse(sessionStorage.getItem('player3'));
    const player4 = JSON.parse(sessionStorage.getItem('player4'));
    
    /* Affiche les stats des joueurs dans les bonnes cases */
    player1Name.innerHTML = player1.name;
    const container = document.querySelector("#content1");
    container.innerHTML = `
    <tr><td> INFO: ${player1.answerINFO}</td></tr>
    <tr><td> DIET: ${player1.answerDIET}</td></tr>
    <tr><td> INFI: ${player1.answerINFI}</td></tr>
    <tr><td> COSP: ${player1.answerCOSP}</td></tr>
    <tr><td> IMGM: ${player1.answerIMGM}</td></tr>
    <tr><td> ENSE: ${player1.answerENSE}</td></tr>
    `
    
    player2Name.innerHTML = player2.name;
    const container2 = document.querySelector("#content2");
    container2.innerHTML = `
    <tr><td> INFO: ${player2.answerINFO}</td></tr>
    <tr><td> DIET: ${player2.answerDIET}</td></tr>
    <tr><td> INFI: ${player2.answerINFI}</td></tr>
    <tr><td> COSP: ${player2.answerCOSP}</td></tr>
    <tr><td> IMGM: ${player2.answerIMGM}</td></tr>
    <tr><td> ENSE: ${player2.answerENSE}</td></tr>
    `
    
    
    if (player3 === null){
        const table3 = document.querySelector("#table3");
        table3.style.display = "none"
    }else{
        player3Name.innerHTML = player3.name
        const container3 = document.querySelector("#content3");
        container3.innerHTML = `
        <tr><td> INFO: ${player3.answerINFO}</td></tr>
        <tr><td> DIET: ${player3.answerDIET}</td></tr>
        <tr><td> INFI: ${player3.answerINFI}</td></tr>
        <tr><td> COSP: ${player3.answerCOSP}</td></tr>
        <tr><td> IMGM: ${player3.answerIMGM}</td></tr>
        <tr><td> ENSE: ${player3.answerENSE}</td></tr>
        `
    }
    
    
    if (player4 === null){
        const table4 = document.querySelector("#table4");
        table4.style.display = "none"
    }else{
        player4Name.innerHTML = player4.name
        const container4 = document.querySelector("#content4");
        container4.innerHTML = `
        <tr><td> INFO: ${player4.answerINFO}</td></tr>
        <tr><td> DIET: ${player4.answerDIET}</td></tr>
        <tr><td> INFI: ${player4.answerINFI}</td></tr>
        <tr><td> COSP: ${player4.answerCOSP}</td></tr>
        <tr><td> IMGM: ${player4.answerIMGM}</td></tr>
        <tr><td> ENSE: ${player4.answerENSE}</td></tr>
        `
    }
}

async function addToPersonalStats(){
    const authenticatedPlayer = getAuthenticatedUser();
    const player = JSON.parse(sessionStorage.getItem('player1'));
    const winner = JSON.parse(sessionStorage.getItem('winner'));
    let win = false;
    if(player.name === winner.name) {
        win = true;
    }
    const nbAnswer = getNbAnswer(player);
    console.log(nbAnswer);
    const favoriteCategory = getFavoriteCategory(player);
    const options = {
        method: 'PUT',
            body: JSON.stringify({
                nbQuestionsAsked: nbAnswer,
                gameWin: win,
                favoriteCategory,
            }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': authenticatedPlayer.token,
            },
    }
   await updateStatistics(authenticatedPlayer.id, options);
}

function getNbAnswer(player) {
    return parseInt(player.answerCOSP, 10) + parseInt(player.answerDIET, 10) + parseInt(player.answerENSE,10) + parseInt(player.answerIMGM, 10) + parseInt(player.answerINFI,10) + parseInt(player.answerINFO, 10);
}

function getFavoriteCategory(player){
    let favoriteCategory = "INFO";
    const nbINFO = parseInt(player.answerINFO, 10);
    const nbDIET = parseInt(player.answerDIET, 10);
    const nbCOSP = parseInt(player.answerCOSP, 10);
    const nbENSE = parseInt(player.answerENSE, 10);
    const nbIMGM = parseInt(player.answerIMGM, 10);
    const nbINFI = parseInt(player.answerINFI, 10);
    let nbFavoriteCategory = nbINFO;

    if(nbFavoriteCategory < nbCOSP){
        favoriteCategory = "COSP";
        nbFavoriteCategory = nbCOSP;
    }

    if(nbFavoriteCategory < nbDIET) {
        favoriteCategory = "DIET";
        nbFavoriteCategory = nbDIET;
    }

    if(nbFavoriteCategory< nbENSE){
        favoriteCategory = "ENSE";
        nbFavoriteCategory = nbENSE;
    }

    if(nbFavoriteCategory < nbIMGM){
        favoriteCategory = "IMGM";
        nbFavoriteCategory = nbIMGM;
    }

    if(nbFavoriteCategory< nbINFI){
        favoriteCategory = "INFI";
        nbFavoriteCategory = nbINFI;
    }

return favoriteCategory;
}
export default StatPage;