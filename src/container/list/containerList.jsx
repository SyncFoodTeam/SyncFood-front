import Header from '../header/header';
import './home.css';
import React, { useState, useEffect } from 'react'


function ContainerList() {

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />


            <h1>Container Page List</h1>
        </div>


    );
}

export default ContainerList;
