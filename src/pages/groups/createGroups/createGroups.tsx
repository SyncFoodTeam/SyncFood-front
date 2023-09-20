import Header from '../../../component/header/header';
import Menu from '../../../component/menu/menu';
import { CreateGroupService } from '../../../service/groupe.service';
import './createGroups.css';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import goBackArrow from '../../../assets/goBackArrow.svg'
import ErrorComponent from '../../../component/error/errorComponent';
import IError from '../../../interface/error.interface';
import { useTranslation } from 'react-i18next';
import Loader from '../../../component/loader/loader';



function CreateGroups() {
    const navigate = useNavigate();

    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [createError, setCreateError] = useState(false);
    const [user, setUser] = useState('');
    const [error, setError] = useState<IError>({});
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();


    const submitGroupe = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        console.log(event);

        let body = {
            Name: groupName,
            Description: groupDescription
        };

        console.log("body", body);

        if (body.Name !== '') {
            let createSuccess = await CreateGroupService(body);

            console.log("Résultat de ma création", createSuccess)
            if (createSuccess?.code === 200) {
                console.log("Toute les donnéees sont OK donc je redirige l'utilisateur");
                setCreateError(false);
                navigate(-1);
            } else {
                console.log("Erreur lors de la création");
                setError(createSuccess.dataGroup);
            }

        } else {
            setCreateError(true);
        }

        setLoading(false);

    };

    const goBack = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        console.log(event);

        navigate(-1);
    }



    return (
        <div className="App">

            <Header barCodeScannerIsTrue={true} />
            <div className='divGoBack'>
                <button onClick={goBack} className="returnToLastPage"><img src={goBackArrow} alt='Retour en arrière' /></button>
                <h2>{t('Group Creation')}</h2>
            </div>

            {!loading &&
                <div className='formulaire'>
                    <form onSubmit={submitGroupe}>
                        <div className='libelleForm'>
                            <label>{t('Name of the group')} :</label>
                            <input type="text" name="text" required onChange={(e) => setGroupName(e.target.value)}></input>
                        </div>
                        <div className='libelleForm'>
                            <label>{t('Description')} :</label>
                            <input type="text" name="text" onChange={(e) => setGroupDescription(e.target.value)}></input>
                        </div>

                        <br />
                        <div>
                            <button type="submit" className='boutonAjoutGroupe'>{t('Add Groupe')}</button>
                        </div>

                    </form>
                </div>
            }

            {createError &&
                <h4 className='errorMessage'>{t('The name is not specified')}</h4>
            }

            {error &&
                <ErrorComponent name={error.name} value={error.value} resourceNotFound={error.resourceNotFound} searchedLocation={error.searchedLocation} />
            }

            {loading &&
                <Loader />
            }
            <Menu />
        </div>


    );
}

export default CreateGroups;
