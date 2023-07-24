import Header from '../header/header';
import './home.css';
import React, { useState, useEffect } from 'react'


function ProductMainview() {

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />


            <h1>Product Page Mainview</h1>
        </div>


    );
}

export default ProductMainview;
