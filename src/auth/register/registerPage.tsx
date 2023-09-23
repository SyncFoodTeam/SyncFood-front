import './registerPage.css';
import '../../theme/theme.css';
import React, { useState } from 'react'
import { RegisterService } from '../../service/auth.service';
import { useNavigate } from "react-router-dom";
import Header from '../../component/header/header';
import ErrorComponent from '../../component/error/errorComponent';
import IError from '../../interface/error.interface';
import Loader from '../../component/loader/loader';
import { useTranslation } from 'react-i18next';

function RegisterPage() {
    const navigate = useNavigate();

    const [mailAddress, setMailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [wrongPassword, setWrongPassword] = useState(false);

    const [username, setUsername] = useState('');
    const [registerError, setRegisterError] = useState(false);
    const [error, setError] = useState<IError>({});
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event);
        setLoading(true);

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
                console.warn({ registerSuccess })
                setError(registerSuccess.dataUser);
            }

            setWrongPassword(false);


        } else {
            console.log("Le mot de passe n'est pas le même");
            setWrongPassword(true);
        }
        setLoading(false);
    };

    const goToLogin = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        navigate('/login');
    }

    return (
        <div className="App">
            {!loading &&
                <div>
                    <Header barCodeScannerIsTrue={false} />

                    <div className="centerDiv registerForm">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="label">{t('Mail Address')} :</label>
                                <input type="text" name="mailAddress" required onChange={(e) => setMailAddress(e.target.value)} className="registerFormInput"></input>
                            </div>
                            <br />
                            <div>
                                <label className="label">{t('Username')} :</label>
                                <input type="text" name="text" required onChange={(e) => setUsername(e.target.value)} className="registerFormInput"></input>
                            </div>
                            <br />
                            <div>
                                <label className="label">* {t('Password')} : </label>
                                <input type="password" name="password" required onChange={(e) => setPassword(e.target.value)} className="registerFormInput"></input>
                                <div className='passwordRecommendation'>{t('*6 characters minimum with at least one uppercase and one lowercase')}</div>
                            </div>
                            <br />
                            <div>
                                <label className="label">{t('Confirm password')} :</label>
                                <input type="password" name="passwordConfrim" required onChange={(e) => setPasswordConfirm(e.target.value)} className="registerFormInput"></input>
                            </div>

                            {error &&
                                <ErrorComponent name={error.name} value={error.value} resourceNotFound={error.resourceNotFound} searchedLocation={error.searchedLocation} />
                            }

                            {wrongPassword &&
                                <h4 className='errorMessage'>{t('Passwords are not similar')}</h4>
                            }
                            <div className="centerDiv">
                                <button className="register-Button" type="submit">{t('Registration')}</button>
                            </div>
                        </form>
                    </div>
                    <br />
                    <br />
                    <div className="centerDiv noAccount">
                        <p>{t('Already an account')} ? </p><span onClick={goToLogin}><strong className='haveAccount'> {t('Log in here')}</strong></span>
                    </div>
                </div>
            }

            {loading &&
                <Loader />
            }
        </div>


    );
}

export default RegisterPage;
