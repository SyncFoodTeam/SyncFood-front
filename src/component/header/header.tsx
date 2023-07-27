import './header.css';
import React from 'react';
import barCodeScanner from '../../assets/barCodeScanner.svg';
import logo from '../../assets/logo.svg';
import { useNavigate } from "react-router-dom";

interface barCodeScannerIsTrueProps {
    barCodeScannerIsTrue?: boolean;
}

const Header: React.FC<barCodeScannerIsTrueProps> = ({
    barCodeScannerIsTrue = false
}) => {

    const navigate = useNavigate();

    const goToHome = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        navigate('/');
    }

    return (
        <header>

            <div className='headerMenu'>
                {barCodeScannerIsTrue &&
                    <div className='codeScanner'>
                        <img src={barCodeScanner} alt='barCode' />
                    </div>
                }
                <div className="logo" onClick={goToHome}>
                    <img src={logo} alt='logo' />
                </div>
            </div>

        </header>
    );
}

export default Header;