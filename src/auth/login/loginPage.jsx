import './loginPage.css';
import '../../theme/theme.css';
import React, { useState } from 'react'
import Header from '../../header/header';
import { LoginService } from '../../service/auth.service';
import { useNavigate } from "react-router-dom";


function LoginPage() {
    const navigate = useNavigate();
    const [mailAddress, setMailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setloginError] = useState(false);



    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(event);


        let body = {
            email: mailAddress,
            password: password
        };

        // try catch pour tester la route de connexion

        console.log("J'envoie mes données à la route adéquat");
        let loginSuccess = await LoginService(body);
        console.log(loginSuccess);
        if (loginSuccess) {
            setloginError(false);
            navigate('/');
        } else {
            setloginError(true);
            console.log("Erreur lors de la connexion");
        }
    };

    const goToRegister = async (event) => {
        event.preventDefault();

        navigate('/register');
    }

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />

            <div className="centerDiv loginForm">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label">Adresse Mail :</label>
                        <br />
                        <input type="text" name="mailAddress" required onChange={(e) => setMailAddress(e.target.value)} className="loginFormInput"></input>
                    </div>
                    <br />
                    <div>
                        <label className="label">Mot de passe :</label>
                        <br />
                        <input type="password" name="password" required onChange={(e) => setPassword(e.target.value)} className="loginFormInput"></input>
                    </div>

                    <br />
                    <div className="centerDiv">
                        <button className="loginButton" type="submit">Connexion</button>
                    </div>
                </form>
            </div>
            {loginError &&
                <h2>Adresse Mail ou Mot De Passe Incorrect</h2>
            }
            <br />
            <div className="centerDiv noAccount">
                <p>Pas de compte ? </p><button onClick={goToRegister}><strong> Créez en un ici</strong></button>
            </div>


        </div>


    );
}

export default LoginPage;
