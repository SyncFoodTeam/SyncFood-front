import Header from '../header/header';
import './home.css';
import React, { useState, useEffect } from 'react'


function GroupsList() {

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />


            <h1>Groups Page List</h1>
        </div>


    );
}

export default GroupsList;
