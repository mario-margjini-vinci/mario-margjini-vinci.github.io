import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import SetUpPage from '../Pages/SetUpPage';


const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/connexion' : LoginPage,
  '/setup': SetUpPage,
  '/inscription' : RegisterPage
};

export default routes;
