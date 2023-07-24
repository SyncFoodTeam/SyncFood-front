import Header from '../header/header';
import './home.css';
import React, { useState, useEffect } from 'react'


function CreateUsers() {

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />


            <h1>Create Users Page</h1>
        </div>


    );
}

export default CreateUsers;
