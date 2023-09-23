import { useTranslation } from 'react-i18next';
import Header from '../../component/header/header';
import Menu from '../../component/menu/menu';
import './message.css';
import React from 'react'


function Messages() {
    const { t } = useTranslation();

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={true} />


            <h1>{t('Message Pages')}</h1>

            <div>{t('This function is not yet implemented in the application')}</div>

            <Menu />
        </div>


    );
}

export default Messages;
