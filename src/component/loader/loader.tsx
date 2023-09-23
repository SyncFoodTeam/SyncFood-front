import { BounceLoader } from 'react-spinners';
import './loader.css';
import React from 'react';
import { useTranslation } from 'react-i18next';


function Loader() {
    const { t } = useTranslation();

    return (
        <div className='loader'>
            <BounceLoader color="#36D7B7" loading={true} size={100} />
            <div>
                <h2>{t('Loading')}...</h2>

            </div>
        </div>
    );
}

export default Loader;