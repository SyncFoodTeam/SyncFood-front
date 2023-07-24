import Header from '../header/header';
import './home.css';
import React, { useState, useEffect } from 'react'


function ContainerDetails() {

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />


            <h1>Container Page Details</h1>
        </div>


    );
}

export default ContainerDetails;
