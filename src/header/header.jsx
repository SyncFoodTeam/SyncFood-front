import './header.css';
import React from 'react'
import barCodeScanner from '../assets/barCodeScanner.svg'
import logo from '../assets/logo.svg'

function Header({ barCodeScannerIsTrue }) {



    return (
        <header>
            {barCodeScannerIsTrue &&
                <div>
                    <img src={barCodeScanner} className="App-logo" alt="logo" />
                </div>
            }
            <div>
                <img src={logo} className="logo" alt="logo" />
            </div>

        </header>
    );
}

export default Header;