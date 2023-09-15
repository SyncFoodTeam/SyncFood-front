
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

    const submitContainer = async (event: React.MouseEvent<HTMLElement>) => {
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

            <div className="divGoBackButton">
                <button onClick={goBack} className="returnToLastPage"><img src={goBackArrow} alt='Retour en arrière' /></button>
            </div>

            <div className='createCard'>

                <div className="modifyDiv">
                    <label>Nom du groupe :</label>
                    <br />
                    <input type="text" name="text"
                        onChange={(e) => setContainerName(e.target.value)}
                        className='modifyInput'
                        required
                    ></input>
                </div>

                <div className="modifyDiv">
                    <label>Description :</label>
                    <br />
                    <input type="text" name="decription"
                        onChange={(e) => setContainerDescription(e.target.value)}
                        className='modifyInput'
                    ></input>
                </div>
            </div>
            <div>
                <button type="submit" className='boutonAjoutGroupe' onClick={submitContainer}>Ajouter le container</button>
            </div>
            {createError &&
                <h4 className='errorMessage'>Le nom n'est pas renseigné</h4>
            }

            <Menu />
        </div>


    );
}

export default CreateContainer;
