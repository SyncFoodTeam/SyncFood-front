import './lunchPage.css';
import React from 'react'
import lunchPageImage from '../../assets/lunchPageImage.svg'
import { useNavigate } from "react-router-dom";
import Header from '../../component/header/header';


function LunchPage() {
    const navigate = useNavigate();

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
                <img src={lunchPageImage}></img>
            </div>

            <div className='divButtonLoginRegister'>
                <button onClick={handleSubmitLogin} className='centerDiv loginButton'>Connexion</button>
                <button onClick={handleSubmitRegister} className='centerDiv registerButton'>Inscription</button>
            </div>


        </div>

    );
}

export default LunchPage;
