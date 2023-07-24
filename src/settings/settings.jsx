import Header from '../header/header';
import './home.css';
import React, { useState, useEffect } from 'react'


function Settings() {

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />


            <h1>Settings Page</h1>
        </div>


    );
}

export default Settings;
