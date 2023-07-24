import Header from '../header/header';
import './home.css';
import React, { useState, useEffect } from 'react'


function CreateGroups() {

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />


            <h1>Create Groups Page</h1>
        </div>


    );
}

export default CreateGroups;
