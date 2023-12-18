// eslint-disable-next-line import/no-extraneous-dependencies

import { clearPage, hideFooter } from '../../utils/render';
import Navigate from '../Router/Navigate';
import { renderTurn } from '../../models/player';



const GamePage = async () => {
  clearPage();

  if(sessionStorage.length === 0) {
    Navigate('/setup');
  } else{
    renderGamePage();
  }
};

function renderGamePage(){ 
  const main = document.querySelector('main');
    main.innerHTML =`
        <div id="turn" class ="text-center fs-2"></div>
        <div class="mb-5" style = "text-align:center;">
            <canvas id="canvas" width="500" height="500"></canvas>
            <div>
              <input type="button" class = "btn btn-primary btn-lg" value="TOURNER LA ROUE!" style="float:center;" id='spin' />
            </div>
        </div>
        <div class="position relative p-5">
            <div class="position-absolute top-0 start-0 mt-5">
                <div class="card mt-4">
                    <div class = "card-body bg-info">
                        <h5 id="player1Name" class="card-title">Joueur 1 </h5>
                        <div id='stars1'>
                        </div>
                    </div>
                </div>
            </div>
            <div class="position-absolute top-0 end-0 mt-5">
                <div class="card mt-4">
                    <div class = "card-body bg-success">
                        <h5 id="player2Name" class="card-title">Joueur 2 </h5>
                        <div id='stars2'>
                        </div>
                    </div>
                </div>
            </div>
            <div id="player3Card" class="position-absolute bottom-0 start-0">
                <div class="card">
                    <div class = "card-body bg-danger">
                        <h5 id="player3Name" class="card-title">Joueur 3 </h5>
                        <div id='stars3'>
                        </div>
                    </div>
                </div>
            </div>
            <div id="player4Card" class="position-absolute bottom-0 end-0">
                <div class="card mt-4">
                    <div class = "card-body bg-warning">
                        <h5 id="player4Name" class="card-title">Joueur 4 </h5>
                        <div id='stars4'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ` 
    hideFooter()
    stars()
    players()
    renderWheel()
    renderTurn()
    
}



// ************************************************************************************* 
// Title: <Roulette Wheel> 
// Author: <Barney Parker> 
// Date: <December 4, 2014> 
// Code version: <1.0> 
// Availability: <https://codepen.io/barney-parker/pen/OPyYqy> 
// 
// *************************************************************************************/
function renderWheel(){
    const options = ['INFO', 'DIET', "INFI", 'COSP', 'IMGM', 'ENSE'];

    const colors = ["Salmon", "Thistle", "Yellow", "LimeGreen", "SkyBlue", "violet"]
    
    let startAngle = 0;
    const arc = Math.PI / (options.length / 2);
    let spinTimeout = null;
    
    let spinTime = 0;
    let spinTimeTotal = 0;
    
    let ctx;

    document.getElementById("spin").addEventListener("click", () => {
      spin();
      document.getElementById("spin").style.visibility = "hidden";
      setTimeout(() => {
        Navigate('/question')
      }, 5000); 
        
    });

    function drawRouletteWheel() {
      const canvas = document.getElementById("canvas");
      if (canvas.getContext) {
        const outsideRadius = 200;
        const textRadius = 160;
        const insideRadius = 125;
    
        ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,500,500);
    
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
    
        ctx.font = '20px Lobster, cursive';
    
        for(let i = 0; i < options.length; i+=1) {
          const angle = startAngle + i * arc;
          ctx.fillStyle = colors[i];
    
          ctx.beginPath();
          ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
          ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
          ctx.stroke();
          ctx.fill();
    
          ctx.save();
          ctx.shadowOffsetX = -1;
          ctx.shadowOffsetY = -1;
          ctx.shadowBlur    = 0;
          ctx.shadowColor   = "rgb(220,220,220)";
          ctx.fillStyle = "black";
          ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 
                        250 + Math.sin(angle + arc / 2) * textRadius);
          ctx.rotate(angle + arc / 2 + Math.PI / 2);
          const text = options[i];
          ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
          ctx.restore();
        } 
    
        // Arrow
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
        ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.fill();
      }
    }
    let spinAngleStart;
    
    function spin() {
      spinAngleStart = Math.random() * 10 + 10
      spinTime = 0;
      spinTimeTotal = Math.random() * 3 + 4 * 1000;
      rotateWheel();
    }

    function rotateWheel() {
      spinTime += 30;
      if(spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
      }
      const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
      startAngle += (spinAngle * Math.PI / 180);
      drawRouletteWheel();
      spinTimeout = setTimeout(rotateWheel, 30);
    }
    
    
    function stopRotateWheel() {
      clearTimeout(spinTimeout);
      const degrees = startAngle * 180 / Math.PI + 90;
      const arcd = arc * 180 / Math.PI;
      const index = Math.floor((360 - degrees % 360) / arcd);
      ctx.save();
      ctx.font = 'bold 40px Helvetica, Arial';
      const text = options[index]
      sessionStorage.setItem('categorie', text)
      ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
      ctx.restore();
    }

    function easeOut(t, b, c, d) {
      const p = t/d
      const ts = (p)*p;
      const tc = ts*p;
      return b+c*(tc + -3*ts + 3*p);
    }
    
    drawRouletteWheel();
}

function players(){
  const player1Name = document.querySelector("#player1Name");
  const player1 = JSON.parse(sessionStorage.getItem('player1'));
  player1Name.innerHTML = player1.name;
  if(player1.answerINFO>0){
    const starINFO1 = document.querySelector("#starINFO1");
    starINFO1.style.color= "Salmon"
  }
  if(player1.answerDIET>0){
    const starDIET1 = document.querySelector("#starDIET1");
    starDIET1.style.color= "Thistle"
  }
  if(player1.answerINFI>0){
    const starINFI1 = document.querySelector("#starINFI1");
    starINFI1.style.color= "Yellow"
  }
  if(player1.answerCOSP>0){
    const starCOSP1 = document.querySelector("#starCOSP1");
    starCOSP1.style.color= "LimeGreen"
  }
  if(player1.answerIMGM>0){
    const starIMGM1 = document.querySelector("#starIMGM1");
    starIMGM1.style.color= "SkyBlue"
  }
  if(player1.answerENSE>0){
    const starENSE1 = document.querySelector("#starENSE1");
    starENSE1.style.color= "violet"
  }
  
  const player2Name = document.querySelector("#player2Name");
  const player2 = JSON.parse(sessionStorage.getItem('player2'))
  player2Name.innerHTML = player2.name;
  if(player2.answerINFO>0){
    const starINFO2 = document.querySelector("#starINFO2");
    starINFO2.style.color= "Salmon"
  }
  if(player2.answerDIET>0){
    const starDIET2 = document.querySelector("#starDIET2");
    starDIET2.style.color= "Thistle"
  }
  if(player2.answerINFI>0){
    const starINFI2 = document.querySelector("#starINFI2");
    starINFI2.style.color= "Yellow"
  }
  if(player2.answerCOSP>0){
    const starCOSP2 = document.querySelector("#starCOSP2");
    starCOSP2.style.color= "LimeGreen"
  }
  if(player2.answerIMGM>0){
    const starIMGM2 = document.querySelector("#starIMGM2");
    starIMGM2.style.color= "SkyBlue"
  }
  if(player2.answerENSE>0){
    const starENSE2 = document.querySelector("#starENSE2");
    starENSE2.style.color= "violet"
  }
  const player3Name = document.querySelector("#player3Name");
  const player3 = JSON.parse(sessionStorage.getItem('player3'));
  if (player3 === null){
    player3Name.innerHTML = "Non actif"
    const player3Stars = document.querySelector("#stars3");
    player3Stars.innerHTML='';
  }else{
    player3Name.innerHTML = player3.name
    if(player3.answerINFO>0){
      const starINFO3 = document.querySelector("#starINFO3");
      starINFO3.style.color= "Salmon"
    }
    if(player3.answerDIET>0){
      const starDIET3 = document.querySelector("#starDIET3");
      starDIET3.style.color= "Thistle"
    }
    if(player3.answerINFI>0){
      const starINFI3 = document.querySelector("#starINFI3");
      starINFI3.style.color= "Yellow"
    }
    if(player3.answerCOSP>0){
      const starCOSP3 = document.querySelector("#starCOSP3");
      starCOSP3.style.color= "LimeGreen"
    }
    if(player3.answerIMGM>0){
      const starIMGM3 = document.querySelector("#starIMGM3");
      starIMGM3.style.color= "SkyBlue"
    }
    if(player3.answerENSE>0){
      const starENSE3 = document.querySelector("#starENSE3");
      starENSE3.style.color= "violet"
    }
  }
  
  const player4Name = document.querySelector("#player4Name");
  const player4 = JSON.parse(sessionStorage.getItem('player4'))
  if (player4 === null){
    player4Name.innerHTML = "Non actif"
    const player4Stars = document.querySelector("#stars4");
    player4Stars.innerHTML='';
  }else{
    player4Name.innerHTML = player4.name
    if(player4.answerINFO>0){
      const starINFO4 = document.querySelector("#starINFO4");
      starINFO4.style.color= "Salmon"
    }
    if(player4.answerDIET>0){
      const starDIET4 = document.querySelector("#starDIET4");
      starDIET4.style.color= "Thistle"
    }
    if(player4.answerINFI>0){
      const starINFI4 = document.querySelector("#starINFI4");
      starINFI4.style.color= "Yellow"
    }
    if(player4.answerCOSP>0){
      const starCOSP4 = document.querySelector("#starCOSP4");
      starCOSP4.style.color= "LimeGreen"
    }
    if(player4.answerIMGM>0){
      const starIMGM4 = document.querySelector("#starIMGM4");
      starIMGM4.style.color= "SkyBlue"
    }
    if(player4.answerENSE>0){
      const starENSE4 = document.querySelector("#starENSE4");
      starENSE4.style.color= "violet"
    }
  }
}

function stars(){
  const starsPlayer1 = document.querySelector("#stars1");
  starsPlayer1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id ='starINFO1'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id ='starCOSP1'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id ='starIMGM1'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id ='starDIET1'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id='starINFI1'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id='starENSE1'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>`
  const starsPlayer2 = document.querySelector("#stars2");
  starsPlayer2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id ='starINFO2'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id ='starCOSP2'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id ='starIMGM2'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id ='starDIET2'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id='starINFI2'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id='starENSE2'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>`
  const starsPlayer3 = document.querySelector("#stars3");
  starsPlayer3.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id ='starINFO3'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id ='starCOSP3'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id ='starIMGM3'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id ='starDIET3'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id='starINFI3'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id='starENSE3'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>`
  const starsPlayer4 = document.querySelector("#stars4");
  starsPlayer4.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id ='starINFO4'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id ='starCOSP4'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id ='starIMGM4'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id ='starDIET4'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id='starINFI4'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" id='starENSE4'>
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>`
}


export {GamePage, players, renderTurn,stars} ;   