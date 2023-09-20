import { useTranslation } from 'react-i18next';
import Header from '../../../component/header/header';
import './containerList.css';
import React from 'react'


function ContainerList() {
    const { t } = useTranslation();

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={true} />


            <h1>{t('Container Page List')}</h1>
        </div>


    );
}

export default ContainerList;
