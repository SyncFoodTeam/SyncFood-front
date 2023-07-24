import './registerPage.css';
import '../../theme/theme.css';
import React, { useState, useEffect } from 'react'
import Header from '../../header/header';
import { Register } from '../../dao/auth.dao';


function RegisterPage() {

    const [mailAddress, setMailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [username, setUsername] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event);

        if (password === passwordConfirm) {
            let body = {
                email: mailAddress,
                username: username,
                password: password
            };

            // try catch pour tester la route de register

            try {
                console.log("J'envoie mes données à la route adéquat");
                await Register(body);
            } catch (e) {
                console.log("Erreur lors de la connexion", e)
            }
        } else {
            console.log("Le mot de passe n'est pas le même");
        }

    };

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />

            <div className="centerDiv registerForm">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label">Adresse Mail :</label>
                        <br />
                        <input type="text" name="mailAddress" required onChange={(e) => setMailAddress(e.target.value)} className="registerFormInput"></input>
                    </div>
                    <br />
                    <div>
                        <label className="label">Nom d'utilisateurs :</label>
                        <br />
                        <input type="text" name="text" required onChange={(e) => setUsername(e.target.value)} className="registerFormInput"></input>
                    </div>
                    <br />
                    <div>
                        <label className="label">Mot de passe :</label>
                        <br />
                        <input type="password" name="password" required onChange={(e) => setPassword(e.target.value)} className="registerFormInput"></input>
                    </div>
                    <div>
                        <label className="label">Confirmer le mot de passe :</label>
                        <br />
                        <input type="password" name="passwordConfrim" required onChange={(e) => setPasswordConfirm(e.target.value)} className="registerFormInput"></input>
                    </div>
                    <div className="centerDiv">
                        <button className="registerButton" type="submit">Inscription</button>
                    </div>
                </form>
            </div>
            <br />
            <br />
            <div className="centerDiv noAccount">
                <p>Déjà un compte ? </p><strong> Connecter vous ici</strong>
            </div>

        </div>


    );
}

export default RegisterPage;
