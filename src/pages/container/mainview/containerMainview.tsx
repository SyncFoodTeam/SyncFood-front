import Header from '../../../component/header/header';
import './home.css';
import React, { useState, useEffect } from 'react'


function ContainerMainview() {

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />


            <h1>Container Page Mainview</h1>
        </div>


    );
}

export default ContainerMainview;
