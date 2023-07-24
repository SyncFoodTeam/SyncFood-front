import Header from '../../component/header/header';
import Menu from '../../component/menu/menu';
import './settings.css';
import React from 'react'


function Settings() {

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />


            <h1>Settings Page</h1>

            <Menu />
        </div>


    );
}

export default Settings;
