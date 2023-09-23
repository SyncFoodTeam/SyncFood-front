import './lunchPage.css';
import React from 'react'
import lunchPageImage from '../../assets/lunchPageImage.svg'
import { useNavigate } from "react-router-dom";
import Header from '../../component/header/header';
import { useTranslation } from 'react-i18next';


function LunchPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSubmitLogin = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        console.log(event);
        navigate('/login');
    }

    const handleSubmitRegister = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        console.log(event);
        navigate('/register');

    }

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />
            <div className='centerDiv imageSyncFood'>
                <img style={{width: '75%' }} src={lunchPageImage}></img>
            </div>

            <div className='divButtonLoginRegister'>
                <button onClick={handleSubmitLogin} className='centerDiv loginButton'>{t('Connection')}</button>
                <button onClick={handleSubmitRegister} className='centerDiv registerButton'>{t('Registration')}</button>
            </div>


        </div>

    );
}

export default LunchPage;
