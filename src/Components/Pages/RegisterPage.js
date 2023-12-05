import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';

const RegisterPage = () => {
    clearPage();
    renderRegisterPage();
    
};

function renderRegisterPage() {
    const main = document.querySelector('main');
    main.innerHTML = `
    <section class="bg-primary">
    <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-xl-9 mb-5">
    
                <h1 class="text-white mb-4 mt-3">Inscription</h1>
    
                    <div class="card" style="border-radius: 15px;">
                    
                        <div class="card-body">
                        <div class="row align-items-center pt-4 pb-3">
                                <div class="col-md-3 ps-5">
    
                                    <h6 class="mb-0">Nom*</h6>
    
                                </div>
                                <div class="col-md-9 pe-5">
                                <input type="text" class="form-control form-control-lg" />
                                </div>
                            </div>
    
                            <hr class="mx-n3">
                            <div class="row align-items-center pt-4 pb-3">
                                <div class="col-md-3 ps-5">
    
                                    <h6 class="mb-0">Prénom*</h6>
    
                                </div>
                                <div class="col-md-9 pe-5">
                                <input type="text" class="form-control form-control-lg" />
                                </div>
                            </div>
    
                            <hr class="mx-n3">
    
                            <div class="row align-items-center pt-4 pb-3">
                                <div class="col-md-3 ps-5">
    
                                    <h6 class="mb-0">Adresse e-mail*</h6>
    
                                </div>
                                <div class="col-md-9 pe-5">
                                <input type="text" class="form-control form-control-lg" />
                                </div>
                            </div>
    
                            <hr class="mx-n3">
    
                            <div class="row align-items-center py-3">
                                <div class="col-md-3 ps-5">
    
                                    <h6 class="mb-0">Mot de passe*</h6>
    
                                </div>
                                <div class="col-md-9 pe-5">
    
                                    <input type="password" class="form-control form-control-lg"/>
    
                                </div>
                            </div>
                            <hr class="mx-n3">
                            <div class="row align-items-center py-3">
                                <div class="col-md-3 ps-5">
    
                                    <h6 class="mb-0">Confirmer le mot de passe*</h6>
    
                                </div>
                                <div class="col-md-9 pe-5">
    
                                    <input type="password" class="form-control form-control-lg"/>
    
                                </div>
                            </div>
                            <hr class="mx-n3">
                            <div class="mx-5">
                               <a href="" id="toConnexion"> Déjà un compte ? Connectez-vous ici</a>
                            </div>
   
                            </div>
                            <div class="card-body mx-3">Les champs marqués d'une * sont obligatoires </div>
                            <div class="px-5 py-4">
                                <button type="submit" class="btn btn-primary btn-lg">Inscription</button>
                            </div>
                            
    
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
    </section>
    `

    const link = document.querySelector('#toConnexion');
    link.addEventListener('click', (e) => {
        e.preventDefault();
            Navigate('/connexion');
    });
};



export default RegisterPage;
