import './styles.css';

import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { getTokenData, isAuthenticated } from 'util/auth';
import { removeAuthData } from 'util/storage';
import history from 'util/history';
import { AuthContext } from 'AuthContext';

const Navbar = () => {
  
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData()
      });
    }
    else {
      setAuthContextData ({
        authenticated: false
        });
      }
  }, [setAuthContextData]);

  const handleLogautClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData ({
      authenticated: false
      });
    history.replace('/');
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
      <div className="container-fluid">
        {' '}
        {/* previne quebra de linha entre logo e itens */}
        <Link to="/" className="nav-logo-text">
          <h4>MovieFlix</h4>
        </Link>
        <div className="nav-login-logout">
          {authContextData.authenticated ? (
            <>
            <span className="nav-username">{authContextData.tokenData?.user_name}</span>
            <a href="#logout" onClick={handleLogautClick}>SAIR</a>
            </>
          ) : (
            <Link to="/">LOGIN</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
