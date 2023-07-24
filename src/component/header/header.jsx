import './header.css';
import React from 'react'
import barCodeScanner from '../../assets/barCodeScanner.svg'
import logo from '../../assets/logo.svg'

function Header({ barCodeScannerIsTrue }) {



    return (
        <header>

            <div>
                {barCodeScannerIsTrue &&
                    <div className='codeScanner'>
                        <img src={barCodeScanner} />
                    </div>
                }
                <div>
                    <img src={logo} className="logo" />
                </div>
            </div>

        </header>
    );
}

export default Header;