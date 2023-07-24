import Header from '../header/header';
import './home.css';
import React, { useState, useEffect } from 'react'


function Home() {

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />


            <h1>Bravo t'es connecté</h1>
        </div>


    );
}

export default Home;
