import { GamePage } from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import SetUpPage from '../Pages/SetUpPage';
import PersonalStatsPage from '../Pages/PersonnalStatsPage';
import StatsPage from '../Pages/StatPage';
import LogOutPage from '../Pages/LogOutPage';
import Question from '../Pages/Question';
import Win from '../Pages/Win';


const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/connexion' : LoginPage,
  '/setup': SetUpPage,
  '/inscription' : RegisterPage,
  '/stats' : PersonalStatsPage,
  '/gameStats' : StatsPage,
  '/logOut': LogOutPage,
  '/question': Question,
  '/win': Win,
};

export default routes;
