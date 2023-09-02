import './loginPage.css';
import '../../theme/theme.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../component/header/header';
import { LoginService } from '../../service/auth.service';
import ErrorComponent from '../../component/error/errorComponent';
import IError from '../../interface/error.interface';


function LoginPage() {
    const navigate = useNavigate();
    const [mailAddress, setMailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setloginError] = useState(false);
    const [error, setError] = useState<IError>({});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(event);

        let body = {
            email: mailAddress,
            password: password
        };

        console.log("J'envoie mes données à la route adéquat");
        let loginCode = await LoginService(body);

        console.log("Résultat de mon login service", loginCode)
        if (loginCode?.code === 200) {
            console.log("Toute les donnéees sont OK donc je redirige l'utilisateur");
            setloginError(false);
            navigate('/');
        } else {
            console.log("Erreur lors de la connexion");
            setloginError(true);
            setError(loginCode.dataUser);
        }
    };

    const goToRegister = async (event: React.MouseEvent<HTMLElement>) => {
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
                <ErrorComponent name={error.name} value={error.value} resourceNotFound={error.resourceNotFound} searchedLocation={error.searchedLocation} />
            }
            <br />
            <div className="centerDiv noAccount">
                <p>Pas de compte ? </p><span onClick={goToRegister}><strong> Créez en un ici</strong></span>
            </div>


        </div>


    );
}

export default LoginPage;
