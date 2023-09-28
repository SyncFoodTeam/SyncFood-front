import moment from 'moment';
import Header from '../../component/header/header';
import Loader from '../../component/loader/loader';
import Menu from '../../component/menu/menu';
import IUser from '../../interface/auth.interface';
import { InformationMe, UpdateInformationMe } from '../../service/auth.service';
import './settings.css';
import React, { useState, useEffect } from 'react'

import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import IError from '../../interface/error.interface';
import ErrorComponent from '../../component/error/errorComponent';
import GoBack from '../../component/goBack/goBack';



function Settings() {
    const navigate = useNavigate();
    const [email, setMailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModify, setIsModify] = useState(false);
    const [memberSince, setMemberSince] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [informationMe, setInformationMe] = useState<IUser>({});
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<IError>({});
    const [wrongPassword, setWrongPassword] = useState(false);
    const [passwordChange, setPasswordChange] = useState(false);

    const { t } = useTranslation();

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
            setMemberSince(moment(user.dataUser.creationDate, "YYYYMMDD").fromNow());
            console.log(memberSince);
        } else {
            setError(true);
        }
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        console.log(event);
        if (password === passwordConfirm) {
            setWrongPassword(false);
            let body = {
                userName: userName || informationMe?.userName,
                email: email || null,
                password: password || informationMe?.password
            };

            console.log("J'envoie mes données à la route adéquat");
            let modifySuccess = await UpdateInformationMe(body);
            console.log(modifySuccess);
            if (modifySuccess.code === 200) {
                setError(false);
                navigate('/');
            } else {
                console.log("Erreur lors de la modification");
                setErrorMessage(modifySuccess.dataUser);
                setError(true);
            }
        } else {
            console.log("Le mot de passe n'est pas le même");
            setWrongPassword(true);
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

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        // Faites quelque chose avec le nouveau mot de passe, par exemple :
        console.log("Nouveau mot de passe :", newPassword);
        setPassword(newPassword);
        setPasswordChange(true);
    };

    return (
        <div>

            <div className="settings">
                {!loading &&
                    <div>
                        <Header barCodeScannerIsTrue={false} />


                        <GoBack name={t('My settings')} />

                        <div className="centerDiv">
                            {!isModify &&
                                <div>
                                    <div className='settingsCards'>
                                        <div className='divButtonModify'>
                                            <button className='buttonModify' onClick={modifyInformation}><i className="fa-solid fa-pen-to-square fa-lg"></i></button>
                                        </div>
                                        <div>
                                            {t('Username')} : {informationMe.userName}#{informationMe.discriminator}
                                        </div>
                                        <br />
                                        <div>
                                            {t('Mail Address')} : {informationMe.email}
                                        </div>
                                        <br />
                                        <div>
                                            {t('Password')} : **********
                                        </div>
                                        <br />
                                        <div>
                                            {t('Member since')} : {memberSince}
                                        </div>
                                    </div>



                                </div>
                            }
                            {isModify &&
                                <div>
                                    <form className='settingsModify' >
                                        <div>
                                            <label className="label">{t('Username')} :</label>
                                            <br />
                                            <input type="text" name="text"
                                                defaultValue={informationMe.userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                                className="settingsFormInput"></input>
                                        </div>
                                        <br />
                                        <div>
                                            <label className="label">{t('Mail Address')} :</label>
                                            <br />
                                            <input type="text" name="email"
                                                defaultValue={informationMe.email}
                                                onChange={(e) => setMailAddress(e.target.value)}
                                                className="settingsFormInput"></input>
                                        </div>
                                        <br />
                                        <div>
                                            <label className="label">{t('Password')} :</label>
                                            <br />
                                            <input type="password" name="password"
                                                defaultValue={'**********'}
                                                onChange={handlePasswordChange}
                                                className="settingsFormInput"></input>
                                        </div>
                                        <br />
                                        {passwordChange && <div>
                                            <label className="label">{t('Confirm password')} :</label>
                                            <br />
                                            <input type="password" name="passwordConfrim"
                                                required
                                                className="settingsFormInput"
                                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                            ></input>
                                        </div>}

                                        {wrongPassword &&
                                            <h4 className='errorMessage'>{t('Passwords are not similar')}</h4>
                                        }

                                        {error &&
                                            <ErrorComponent name={errorMessage.name} value={errorMessage.value} resourceNotFound={errorMessage.resourceNotFound} searchedLocation={errorMessage.searchedLocation} />
                                        }
                                        <br />
                                    </form>
                                    <div className="centerDiv">
                                        <button className="modifyButton" onClick={handleSubmit}>{t('Modify')}</button>
                                    </div>

                                </div>
                            }
                        </div>

                        {!isModify &&
                            <div className="centerDiv">
                                <button className="logOutButton" onClick={deconnect}>{t('Disconnect')}</button>
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
