import { useTranslation } from 'react-i18next';
import './serverError.css';
import React from 'react'


function ServerError() {
    const { t } = useTranslation();

    return (
        <div>
            {t('Error 500: Server error')}
        </div>


    );
}

export default ServerError;
