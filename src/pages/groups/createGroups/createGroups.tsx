import Header from '../../../component/header/header';
import Menu from '../../../component/menu/menu';
import { CreateGroupService, searchUserForAddGroupeService } from '../../../service/groupe.service';
import './createGroups.css';
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import goBackArrow from '../../../assets/goBackArrow.svg'
import AddUser from '../addUser/addUser';
import BounceLoader from 'react-spinners/BounceLoader';
import ErrorComponent from '../../../component/error/errorComponent';
import IError from '../../../interface/error.interface';



function CreateGroups() {
    const navigate = useNavigate();

    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [createError, setCreateError] = useState(false);
    const [user, setUser] = useState('');
    const [error, setError] = useState<IError>({});
    const [loading, setLoading] = useState(false);


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
                <h2>Création de Groupe</h2>
            </div>

            {!loading &&
                <div className='formulaire'>
                    <form onSubmit={submitGroupe}>
                        <div className='libelleForm'>
                            <label>Nom du groupe :</label>
                            <input type="text" name="text" required onChange={(e) => setGroupName(e.target.value)}></input>
                        </div>
                        <div className='libelleForm'>
                            <label>Description :</label>
                            <input type="text" name="text" onChange={(e) => setGroupDescription(e.target.value)}></input>
                        </div>

                        <br />
                        <div>
                            <button type="submit" className='boutonAjoutGroupe'>Ajouter le groupe</button>
                        </div>

                    </form>
                </div>
            }

            {createError &&
                <h4 className='errorMessage'>Le nom n'est pas renseigné</h4>
            }

            {error &&
                <ErrorComponent name={error.name} value={error.value} resourceNotFound={error.resourceNotFound} searchedLocation={error.searchedLocation} />
            }

            {loading &&
                <BounceLoader color="#36d7b7" />
            }
            <Menu />
        </div>


    );
}

export default CreateGroups;
