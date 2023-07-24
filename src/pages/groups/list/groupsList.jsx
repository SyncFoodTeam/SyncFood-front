import Header from '../../../component/header/header';
import Menu from '../../../component/menu/menu';
import './groupsList.css';
import React from 'react'


function GroupsList() {

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />


            <h1>Groups Page List</h1>

            <Menu />
        </div>


    );
}

export default GroupsList;
