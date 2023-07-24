import Header from '../header/header';
import './home.css';
import React, { useState, useEffect } from 'react'


function ProductList() {

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />


            <h1>Product Page List</h1>
        </div>


    );
}

export default ProductList;
