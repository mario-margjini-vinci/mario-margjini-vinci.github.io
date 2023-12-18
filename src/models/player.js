import anime from 'animejs/lib/anime.es';
import Navigate from '../Components/Router/Navigate';

function addPlayer() {
    const form = document.querySelector('#setUpForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name1 = document.querySelector('#inputPseudo1').value;
        const name2 = document.querySelector('#inputPseudo2').value;
        const check3 = document.querySelector('#checkboxP3');
        const check4 = document.querySelector('#checkboxP4');
        const player1 = JSON.stringify({
            number: 1,
            name: name1,
            answerINFO: 0,
            answerCOSP: 0,
            answerIMGM: 0,
            answerDIET: 0,
            answerINFI: 0,
            answerENSE: 0,
        });
        sessionStorage.setItem('player1', player1)
        sessionStorage.setItem('currentPlayer', player1)
        
        const player2 = JSON.stringify({
            number: 2,
            name: name2,
            answerINFO: 0,
            answerCOSP: 0,
            answerIMGM: 0,
            answerDIET: 0,
            answerINFI: 0,
            answerENSE: 0,
        });
        sessionStorage.setItem('player2', player2)
        if (check3.checked) {
            const name3 = document.querySelector('#inputPseudo3').value;
            const player3 = JSON.stringify({
                number: 3,
                name: name3,
                answerINFO: 0,
                answerCOSP: 0,
                answerIMGM: 0,
                answerDIET: 0,
                answerINFI: 0,
                answerENSE: 0,
                
            });
            sessionStorage.setItem('player3', player3)
        }
        if (check4.checked) {
            const name4 = document.querySelector('#inputPseudo4').value;
            const player4 = JSON.stringify({
                number: 4,
                name: name4,
                answerINFO: 0,
                answerCOSP: 0,
                answerIMGM: 0,
                answerDIET: 0,
                answerINFI: 0,
                answerENSE: 0,
            });
            sessionStorage.setItem('player4', player4)
        }
        animationButtonStart()
    });
}

function animationButtonStart() {
    const progressLogEl = document.querySelector('#progressText');
    const promiseEl = document.querySelector('#startGame');
    
    const animation = anime
    .timeline({
        targets: promiseEl,
        delay: 400,
        duration: 600,
        endDelay: 400,
        easing: 'easeInOutSine',
        update(anim) {
            progressLogEl.innerHTML = `progress : ${Math.round(anim.progress)}%`;
        },
    })
    .add({
        translateX: 0,
    });
    
    animation.play();
    
    animation.complete = () => {
        Navigate('/game');
    };
}

function renderTurn(){
    
    // Récupère le joueur actuel du localStorage
    const currentPlayer = JSON.parse(sessionStorage.getItem('currentPlayer'));
    
    // Récupère l'élément HTML pour le tour
    const turnDiv = document.querySelector('#turn');
    
    // Modifie le contenu de la div turn pour afficher le joueur actuel
    turnDiv.innerHTML = `C'est au tour de ${currentPlayer.name} !`;
}

function nextPlayer(){
    // Récupère le joueur actuel du localStorage
    const currentPlayer = JSON.parse(sessionStorage.getItem('currentPlayer'));
    
    const player1 = JSON.parse(sessionStorage.getItem('player1'));
    const player2 = JSON.parse(sessionStorage.getItem('player2'));
    const player3 = JSON.parse(sessionStorage.getItem('player3'));
    const player4 = JSON.parse(sessionStorage.getItem('player4'));
    
    if (currentPlayer.number === 1) {
        sessionStorage.setItem('player1', JSON.stringify(currentPlayer));
        sessionStorage.setItem('currentPlayer', JSON.stringify(player2));
    } else if (currentPlayer.number === 2) {
        sessionStorage.setItem('player2', JSON.stringify(currentPlayer));
        if (player3 === null) {
            sessionStorage.setItem('currentPlayer', JSON.stringify(player1));
        } else {
            sessionStorage.setItem('currentPlayer', JSON.stringify(player3));
        }
    } else if (currentPlayer.number === 3) {
        sessionStorage.setItem('player3', JSON.stringify(currentPlayer));
        if (player4 === null) {
            sessionStorage.setItem('currentPlayer', JSON.stringify(player1));
        } else {
            sessionStorage.setItem('currentPlayer', JSON.stringify(player4));
        }
    } else if (currentPlayer.number === 4) {
        sessionStorage.setItem('player4', JSON.stringify(currentPlayer));
        sessionStorage.setItem('currentPlayer', JSON.stringify(player1));
    }
}

function checkWin(){
    const playerToVerify = JSON.parse(sessionStorage.getItem('currentPlayer'));
    if (playerToVerify.answerINFO >= 1 && playerToVerify.answerCOSP >= 1 && 
        playerToVerify.answerIMGM >=1 && playerToVerify.answerDIET >=1 && 
        playerToVerify.answerINFI >=1 && playerToVerify.answerENSE >=1){
        sessionStorage.setItem('winner', JSON.stringify(playerToVerify));
        return true
    }
    return false
}

export {addPlayer, renderTurn, nextPlayer, checkWin};