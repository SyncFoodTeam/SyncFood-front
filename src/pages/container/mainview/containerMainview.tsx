import { useTranslation } from 'react-i18next';
import Header from '../../../component/header/header';
import './containerMainview.css';
import React, { useState, useEffect } from 'react'


function ContainerMainview() {
    const { t } = useTranslation();

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />


            <h1>{t('Container Page Mainview')}</h1>
        </div>


    );
}

export default ContainerMainview;
