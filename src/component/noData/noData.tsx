import { useTranslation } from 'react-i18next';
import './noData.css';
import React from 'react';


function NoDataComponent() {
    const { t } = useTranslation();

    return (
        <div className='errorMessage'>
          {t('No Data')}
        </div>
    );
}

export default NoDataComponent;