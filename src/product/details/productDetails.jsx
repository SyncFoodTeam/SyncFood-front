import Header from '../header/header';
import './home.css';
import React, { useState, useEffect } from 'react'


function ProductDetails() {

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />


            <h1>Product Page Details</h1>
        </div>


    );
}

export default ProductDetails;
