import './menu.css';
import React from 'react';

import home from '../../assets/home.svg';
import groups from '../../assets/groups.svg';
import messages from '../../assets/message.svg';
import account from '../../assets/account.svg';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function Menu() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const redirectTo = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        navigate('/');
    };

    const redirectToGroupes = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        navigate('/groupes');
    };

    const redirectToMessages = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        navigate('/messages');
    };

    const redirectToSettings = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        navigate('/settings');
    };

    return (

        <div className='menu'>
            <div className='divIcon' onClick={redirectTo}>
                <div>
                    <img src={home} alt="logo" />
                </div>
                <div>
                    <label>{t('Reception')}</label>
                </div>
            </div>

            <div className='divIcon' onClick={redirectToGroupes}>
                <div>
                    <img src={groups} alt="logo" />
                </div>
                <div>
                    <label>{t('Groups')}</label>
                </div>
            </div>

            <div className='divIcon' onClick={redirectToMessages}>
                <div>
                    <img src={messages} alt="logo" />
                </div>
                <div>
                    <label>{t('Messages')}</label>
                </div>
            </div>

            <div className='divIcon' onClick={redirectToSettings}>
                <div>
                    <img src={account} alt="logo" />
                </div>
                <div>
                    <label>{t('Account')}</label>
                </div>
            </div>

        </div>


    );
}

export default Menu;