
import Header from '../../../component/header/header';
import Menu from '../../../component/menu/menu';
import './createContainer.css';
import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import goBackArrow from '../../../assets/goBackArrow.svg'
import { CreateFoodContainerService } from '../../../service/container.service';


function CreateContainer() {
    const navigate = useNavigate();

    const [containerName, setContainerName] = useState('');
    const [containerDescription, setContainerDescription] = useState('');
    const [createError, setCreateError] = useState(false);
    const [user, setUser] = useState('');

    const location = useLocation();

    const id = location.state?.id;

    const submitContainer = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(event);

        let body = {
            name: containerName,
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

    const goBack = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        console.log(event);

        navigate(-1);
    }



    return (
        <div className="App">

            <Header barCodeScannerIsTrue={true} />

            <button onClick={goBack} className="returnToLastPage"><img src={goBackArrow} alt='Retour en arrière' /></button>


            <div className='formulaire'>
                <form onSubmit={submitContainer}>
                    <div className='libelleForm'>
                        <label>Nom du container :</label>
                        <input type="text" name="text" required onChange={(e) => setContainerName(e.target.value)}></input>
                    </div>
                    <div className='libelleForm'>
                        <label>Description :</label>
                        <input type="text" name="text" onChange={(e) => setContainerDescription(e.target.value)}></input>
                    </div>

                    <br />
                    <div>
                        <button type="submit" className='boutonAjoutGroupe'>Ajouter le container</button>
                    </div>
                </form>
            </div>
            {createError &&
                <h4 className='errorMessage'>Le nom n'est pas renseigné</h4>
            }

            <Menu />
        </div>


    );
}

export default CreateContainer;
