import Header from '../header/header';
import './home.css';
import React, { useState, useEffect } from 'react'


function AddProduct() {

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />


            <h1>Add Product Page</h1>
        </div>


    );
}

export default AddProduct;
