import Header from '../../component/header/header';
import Menu from '../../component/menu/menu';
import IUser from '../../interface/auth.interface';
import { InformationMe, UpdateInformationMe } from '../../service/auth.service';
import './settings.css';
import React, { useState, useEffect} from 'react'

import { useNavigate } from "react-router-dom";



function Settings() {
    const navigate = useNavigate();
    const [email, setMailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const [informationMe, setInformationMe] = useState<IUser>({});

    const [error, setError] = useState(false);

    useEffect(() => {
        getInfo();
    }, []);

    async function getInfo() {
        let user = await InformationMe();
        if(user?.code == 200 && user?.data){
            setError(false);
            setInformationMe(user.data);
        }else{
            setError(true);
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(event);

        let body = {
            userName: userName || informationMe?.userName,
            email: email || informationMe?.email,
            password: password || informationMe?.password
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

    const deconnect = async (event: React.MouseEvent<HTMLElement>) => {
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
                        <input type="text" name="email"
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
