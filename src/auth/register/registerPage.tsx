import './registerPage.css';
import '../../theme/theme.css';
import React, { useState } from 'react'
import { RegisterService } from '../../service/auth.service';
import { useNavigate } from "react-router-dom";
import Header from '../../component/header/header';

function RegisterPage() {
    const navigate = useNavigate();

    const [mailAddress, setMailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [wrongPassword, setWrongPassword] = useState(false);

    const [username, setUsername] = useState('');
    const [registerError, setRegisterError] = useState(false);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event);

        if (password === passwordConfirm) {
            let body = {
                email: mailAddress,
                username: username,
                password: password
            };

            console.log("J'envoie mes données à la route adéquat");
            let registerSuccess = await RegisterService(body);
            console.log(registerSuccess);

            if (registerSuccess?.code === 200) {
                console.log("Toute les donnéees sont OK donc je redirige l'utilisateur");
                setRegisterError(false);
                navigate('/login');
            } else {
                setRegisterError(true);
                console.log("Erreur lors de la connexion");
            }

            setWrongPassword(false);


        } else {
            console.log("Le mot de passe n'est pas le même");
            setWrongPassword(true);
        }

    };

    const goToLogin = async (event: any) => {
        event.preventDefault();

        navigate('/login');
    }

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
                        <label className="label">Mot de passe : *6 caractères minimun avec au moins une majuscule et une minuscule</label>
                        <br />
                        <input type="password" name="password" required onChange={(e) => setPassword(e.target.value)} className="registerFormInput"></input>
                    </div>
                    <div>
                        <label className="label">Confirmer le mot de passe :</label>
                        <br />
                        <input type="password" name="passwordConfrim" required onChange={(e) => setPasswordConfirm(e.target.value)} className="registerFormInput"></input>
                    </div>

                    {wrongPassword &&
                        <h4 className='errorMessage'>Les mots de passe ne sont pas similaire</h4>

                    }
                    <div className="centerDiv">
                        <button className="registerButton" type="submit">Inscription</button>
                    </div>
                </form>
            </div>
            <br />
            <br />
            <div className="centerDiv noAccount">
                <p>Déjà un compte ? </p><span onClick={goToLogin}><strong> Connecter vous ici</strong></span>
            </div>

        </div>


    );
}

export default RegisterPage;