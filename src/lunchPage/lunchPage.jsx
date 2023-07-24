import Header from '../header/header';
import './lunchPage.css';
import React from 'react'
import lunchPageImage from '../assets/lunchPageImage.svg'
import { useNavigate } from "react-router-dom";


function LunchPage() {
    const navigate = useNavigate();

    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        console.log(event);
        navigate('/login');
    }

    const handleSubmitRegister = async (event) => {
        event.preventDefault();
        console.log(event);
        navigate('/register');

    }

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />
            <div className='centerDiv'>
                <img src={lunchPageImage}></img>
            </div>

            <div>
                <button onClick={handleSubmitLogin} className='centerDiv loginButton'>Connexion</button>
                <button onClick={handleSubmitRegister} className='centerDiv registerButton'>Inscription</button>
            </div>


        </div>

    );
}

export default LunchPage;
