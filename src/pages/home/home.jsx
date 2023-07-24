import Header from '../../component/header/header';
import Menu from '../../component/menu/menu';
import './home.css';
import React, { useState, useEffect } from 'react'


function Home() {

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={true} />


            <h1>Home Page</h1>

            <Menu/>
        </div>


    );
}

export default Home;
