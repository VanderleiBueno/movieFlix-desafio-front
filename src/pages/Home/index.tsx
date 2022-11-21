import { ReactComponent as Image } from 'assets/images/main-image.svg';
import Login from './Login';
import './styles.css';

const Home = () => {
  return (
    <div className="login-container">
      <div className="banner-container">
        <h1>Avalie Filmes</h1>
        <p>Diga o que você achou do seu filme favorito</p>
        <Image />
      </div>
      <div>
        <Login />
      </div>
    </div>
  );
};

export default Home;
