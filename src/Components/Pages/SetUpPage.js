import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';
import addPlayer from '../../models/game';

const SetUpPage = () => {
    clearPage();
    renderSetUpPage();
    attachChangeEventToP3();
    attachChangeEventToP4();
}

function renderSetUpPage(){
  const main = document.querySelector('main');
  main.innerHTML=`
  <h1 class="text-center text-primary" style="padding: 4% ">Configurez la partie</h1>
  <form id="setUpForm">
    <div class="container overflow-hidden text-center " style="padding-bottom: 50%">
        <div class="row row-cols-1 row-cols-md-2 g-4">
            <div class="col">
                <div class="card">
                    <div class="card-body bg-info">
                        <h5 class="card-title">Joueur 1 </h5>
                        <div class="row mb-3">
                            <label for="inputPseudo1" class="col-sm-2 col-form-label">Pseudo :</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputPseudo1" required>
                            </div>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckCheckedDisabled" checked disabled>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-body bg-success">
                        <h5 class="card-title">Joueur 2 </h5>
                        <div class="row mb-3">
                            <label for="inputPseudo2" class="col-sm-2 col-form-label">Pseudo :</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputPseudo2" required>
                            </div>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckCheckedDisabled" checked disabled>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-body bg-danger">
                        <h5 class="card-title">Joueur 3 </h5>
                        <div class="row mb-3">
                            <label for="inputPseudo3" class="col-sm-2 col-form-label">Pseudo :</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputPseudo3" disabled>
                            </div>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="checkboxP3">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div class="card-body bg-warning ">
                        <h5 class="card-title">Joueur 4 </h5>
                        <div class="row mb-3">
                            <label for="inputPseudo4" class="col-sm-2 col-form-label">Pseudo :</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputPseudo4" disabled>
                            </div>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="checkboxP4">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pt-4">
            <input class="btn btn-primary" type="submit" id="startGame" value="COMMENCER LA PARTIE!"> 
        </div>
    </div>
  </div>
</form>
</div>
`
attachChangeEventToP3();
attachChangeEventToP4();
attachEventToSubmit();
}

function attachChangeEventToP3(){
    const check = document.querySelector('#checkboxP3')
    const t = document.querySelector('#inputPseudo3')
    check.addEventListener('change',() =>{
        if(check.checked){
            t.disabled = false; 
            t.required = true;  
        }else{
            t.disabled = true;
            t.required = false;
            t.value = "";
        }
    })
}

function attachChangeEventToP4(){
    const check = document.querySelector('#checkboxP4')
    const t = document.querySelector('#inputPseudo4')
    check.addEventListener('change',() =>{
        if(check.checked){
            t.disabled = false;  
            t.required = true; 
        }else{
            t.disabled = true;
            t.required = false;
            t.value = "";
        }
    })
}
function attachEventToSubmit(){
    const form = document.querySelector('#setUpForm');
    
    form.addEventListener('submit',(e) => {    
        e.preventDefault();
        const name1 = document.querySelector('#inputPseudo1');
        const name2 = document.querySelector('#inputpseudo2');
        const check3 = document.querySelector('#checkboxP3')
        const check4 = document.querySelector('#checkboxP4')
        const player1 = {
            name:name1,
            answerBIN:0,
            answerCOA:0,
            answerBIM:0,
            answerDIE:0,
            answerINF:0
            
        };
        const player2 = {
            name:name2,
            answerBIN:0,
            answerCOS:0,
            answerBIM:0,
            answerDIE:0,
            answerINF:0
        };
        
        if(check3.checked){
            const name3 = document.querySelector('#inputPseudo3')
            const player3 = {
                name:name3,
                answerBIN:0,
                answerCOS:0,
                answerBIM:0,
                answerDIE:0,
                answerINF:0};
            addPlayer(player3)
        }
        if(check4.checked){
            const name4 = document.querySelector('#inputPseudo4')
            const player4 = {
                name:name4,answerBIN:0,
                answerCOS:0,
                answerBIM:0,
                answerDIE:0,
                answerINF:0
            };
            addPlayer(player4);
        }
        addPlayer(player1);
        addPlayer(player2);
        Navigate('/game');
    })
}

export default SetUpPage;