import './header.css';
import React from 'react'
import barCodeScanner from '../../assets/barCodeScanner.svg'
import logo from '../../assets/logo.svg'

function Header({ barCodeScannerIsTrue }) {



    return (
        <header>

            <div className='headerMenu'>
                {barCodeScannerIsTrue &&
                    <div className='codeScanner'>
                        <img src={barCodeScanner} alt='barCode' />
                    </div>
                }
                <div className="logo">
                    <img src={logo} alt='logo'/>
                </div>
            </div>

        </header>
    );
}

export default Header;