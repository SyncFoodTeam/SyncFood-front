import moment from 'moment';
import Header from '../../component/header/header';
import Loader from '../../component/loader/loader';
import Menu from '../../component/menu/menu';
import IUser from '../../interface/auth.interface';
import { InformationMe, UpdateInformationMe } from '../../service/auth.service';
import './settings.css';
import React, { useState, useEffect } from 'react'

import { useNavigate } from "react-router-dom";



function Settings() {
    const navigate = useNavigate();
    const [email, setMailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModify, setIsModify] = useState(false);
    const [memberSince, setMemberSince] = useState('');

    const [informationMe, setInformationMe] = useState<IUser>({});

    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await getInfo();
            setLoading(false);
        };

        fetchData();
    }, []);

    async function getInfo() {
        let user = await InformationMe();
        if (user?.code == 200 && user?.dataUser) {
            setError(false);
            setInformationMe(user.dataUser);
            setMemberSince(moment(informationMe.creationDate, "YYYYMMDD").fromNow());
        } else {
            setError(true);
        }
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
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

    const modifyInformation = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        setIsModify(true);
    };

    return (
        <div>

            <div className="settings">
                {!loading &&
                    <div>
                        <Header barCodeScannerIsTrue={false} />


                        <h1>Mes paramètres</h1>

                        <div className="centerDiv">
                            {!isModify &&
                                <div>
                                    <div className='divButtonModify'>
                                        <button className='buttonModify' onClick={modifyInformation}><i className="fa-solid fa-pen-to-square fa-lg"></i></button>
                                    </div>
                                    <div className='settingsCards'>
                                        <div>
                                            UserName : {informationMe.userName}
                                        </div>
                                        <br />
                                        <div>
                                            Adresse Mail : {informationMe.email}
                                        </div>
                                        <br />
                                        <div>
                                            Mot de passe : **********
                                        </div>
                                        <br />
                                        <div>
                                            Membre depuis : {memberSince}
                                        </div>
                                    </div>



                                </div>
                            }
                            {isModify &&
                                <div>
                                    <form className='settingsModify' >
                                        <div>
                                            <label className="label">UserName :</label>
                                            <br />
                                            <input type="text" name="text"
                                                defaultValue={informationMe.userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                                className="settingsFormInput"></input>
                                        </div>
                                        <br />
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
                                    </form>
                                    <div className="centerDiv">
                                        <button className="modifyButton" onClick={handleSubmit}>Modifié</button>
                                    </div>
                                </div>
                            }
                        </div>

                        {!isModify &&
                            <div className="centerDiv">
                                <button className="logOutButton" onClick={deconnect}>Déconnexion</button>
                            </div>
                        }

                    </div>
                }
            </div>
            {!loading &&
                <Menu />
            }
            {loading &&
                <Loader />
            }
        </div>


    );
}

export default Settings;
