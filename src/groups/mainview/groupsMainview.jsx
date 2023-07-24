import Header from '../header/header';
import './home.css';
import React, { useState, useEffect } from 'react'


function GroupsMainview() {

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />


            <h1>Groups Page Mainview</h1>
        </div>


    );
}

export default GroupsMainview;
