import './loginPage.css';
import '../../theme/theme.css';
import React, { useState } from 'react'
import Header from '../../header/header';
import { Login } from '../../dao/auth.dao';


function LoginPage() {
    const [mailAddress, setMailAddress] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(event);


        let body = {
            email: mailAddress,
            password: password
        };

        // try catch pour tester la route de connexion

        try {
            console.log("J'envoie mes données à la route adéquat");
            await Login(body);
        } catch (e) {
            console.log("Erreur lors de la connexion", e)
        }
    };

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
            <br />
            <div className="centerDiv noAccount">
                <p>Pas de compte ? </p><strong> Créez en un ici</strong>
            </div>
        </div>


    );
}

export default LoginPage;
