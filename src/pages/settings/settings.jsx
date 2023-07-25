import Header from '../../component/header/header';
import Menu from '../../component/menu/menu';
import { InformationMe, UpdateInformationMe } from '../../service/auth.service';
import './settings.css';
import React, { useState, useEffect} from 'react'

import { useNavigate } from "react-router-dom";



function Settings() {
    const navigate = useNavigate();
    const [mailAddress, setMailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const [informationMe, setInformationMe] = useState({});


    useEffect(() => {
        getInfo();
    }, []);

    async function getInfo() {
        let user = await InformationMe();
        setInformationMe(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(event);

        let body = {
            userName: userName || informationMe.userName,
            email: mailAddress || informationMe.mailAddress,
            password: password || informationMe.password
        };

        console.log("J'envoie mes données à la route adéquat");
        let loginSuccess = await UpdateInformationMe(body);
        console.log(loginSuccess);
        if (loginSuccess) {
            navigate('/');
        } else {
            console.log("Erreur lors de la connexion");
        }
    };

    const deconnect = async (event) => {
        event.preventDefault();

        console.log(event);
        navigate('/login');
        localStorage.clear();
    };



    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />


            <h1>Mes paramètres</h1>

            <div className="centerDiv settingsForm">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label">UserName :</label>
                        <br />
                        <input type="text" name="text"
                            defaultValue={informationMe.userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="settingsFormInput"></input>
                    </div>
                    <div>
                        <label className="label">Adresse Mail :</label>
                        <br />
                        <input type="text" name="mailAddress"
                            defaultValue={informationMe.email}
                            onChange={(e) => setMailAddress(e.target.value)}
                            className="settingsFormInput"></input>
                    </div>
                    <br />
                    <div>
                        <label className="label">Mot de passe :</label>
                        <br />
                        <input type="password" name="password"
                            defaultValue={'**********'}
                            onChange={(e) => setPassword(e.target.value)}
                            className="settingsFormInput"></input>
                    </div>

                    <br />
                    <div className="centerDiv">
                        <button className="loginButton" type="submit">Modifié</button>
                    </div>
                </form>
            </div>

            <div>
                <button onClick={deconnect}>Déconnexion</button>
            </div>

            <Menu />
        </div>


    );
}

export default Settings;
