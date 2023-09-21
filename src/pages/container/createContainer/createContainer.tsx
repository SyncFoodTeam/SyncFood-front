
import Header from '../../../component/header/header';
import Menu from '../../../component/menu/menu';
import './createContainer.css';
import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { CreateFoodContainerService } from '../../../service/container.service';
import { useTranslation } from 'react-i18next';
import GoBack from '../../../component/goBack/goBack';


function CreateContainer() {
    const navigate = useNavigate();

    const [containerName, setContainerName] = useState('');
    const [containerDescription, setContainerDescription] = useState('');
    const [createError, setCreateError] = useState(false);
    const [user, setUser] = useState('');
    const [storageLocation, setStorageLocation] = useState('')
    const location = useLocation();
    const { t } = useTranslation();

    const id = location.state?.id;

    const submitContainer = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        console.log(event);

        let body = {
            name: storageLocation,
            description: containerDescription,
            groupId: id,
        };

        console.log("body", body);

        if (body.name !== '') {
            let containerCreate = await CreateFoodContainerService(body);
            console.log(containerCreate);
            setCreateError(false);
            navigate(-1);
        } else {
            setCreateError(true);
        }


    };

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={true} />

            <div>
                <GoBack />
            </div>

            <div className='createCard'>

                <div className="modifyDiv">
                    <label>{t('Name of the container')} :</label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            name="storage"
                            value="frigo"
                            onChange={(e) => setStorageLocation(e.target.value)}
                            required
                        /> {t('Fridge')}
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            name="storage"
                            value="placard"
                            onChange={(e) => setStorageLocation(e.target.value)}
                            required
                        /> {t('Closet')}
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            name="storage"
                            value="congélateur"
                            onChange={(e) => setStorageLocation(e.target.value)}
                            required
                        /> {t('Freezer')}
                    </label>
                </div>

                <div className="modifyDiv">
                    <label>{t('Description')} :</label>
                    <br />
                    <input type="text" name="decription"
                        onChange={(e) => setContainerDescription(e.target.value)}
                        className='modifyInput'
                    ></input>
                </div>
            </div>
            <div>
                <button type="submit" className='boutonAjoutGroupe' onClick={submitContainer}>{t('Add the container')}</button>
            </div>
            {createError &&
                <h4 className='errorMessage'>{t('The name is not specified')}</h4>
            }

            <Menu />
        </div>


    );
}

export default CreateContainer;
