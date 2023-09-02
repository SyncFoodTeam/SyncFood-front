import Header from '../../../component/header/header';
import './containerList.css';
import React, { useState, useEffect } from 'react'


function ContainerList() {

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={true} />


            <h1>Container Page List</h1>
        </div>


    );
}

export default ContainerList;
