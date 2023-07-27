import Header from '../../component/header/header';
import Menu from '../../component/menu/menu';
import './message.css';
import React from 'react'


function Messages() {

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={true} />


            <h1>Message Pages</h1>

            <Menu />
        </div>


    );
}

export default Messages;