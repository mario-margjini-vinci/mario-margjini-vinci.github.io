import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';

const LoginPage = () => {
    clearPage();
    renderLoginPage();
    
};

function renderLoginPage() {
    const main = document.querySelector('main');
    main.innerHTML = `
    <section class="vh-100 bg-primary" ;">
    <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-xl-9">
    
                <h1 class="text-white mb-4 mt-3">Connexion</h1>
    
                    <div class="card" style="border-radius: 15px;">
                        <div class="card-body">
    
                            <div class="row align-items-center pt-4 pb-3">
                                <div class="col-md-3 ps-5">
    
                                    <h6 class="mb-0">Nom d'utilisateur</h6>
    
                                </div>
                                <div class="col-md-9 pe-5">
                                <input type="text" class="form-control form-control-lg" />
                                </div>
                            </div>
    
                            <hr class="mx-n3">
    
                            <div class="row align-items-center py-3">
                                <div class="col-md-3 ps-5">
    
                                    <h6 class="mb-0">Mot de passe</h6>
    
                                </div>
                                <div class="col-md-9 pe-5">
    
                                    <input type="password" class="form-control form-control-lg"/>
    
                                </div>
                            </div>
    
                            <hr class="mx-n3">
                            <div class="mx-5">
                                <a href="" id = "toInscription">Pas encore inscrit ? Inscrivez-vous ici</a>  
                            </div>

                            <div class="px-5 py-4">
                                <button type="submit" class="btn btn-primary btn-lg">Connexion</button>
                            </div>
                            
    
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
    </section>
    `

    const link = document.querySelector('#toInscription');
link.addEventListener('click', (e) => {
    e.preventDefault();
    Navigate('/inscription')
})
}




export default LoginPage;
