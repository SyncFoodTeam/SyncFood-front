import Header from '../../../component/header/header';
import Menu from '../../../component/menu/menu';
import { CreateGroupService } from '../../../service/groupe.service';
import './createGroups.css';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import goBackArrow from '../../../assets/goBackArrow.svg'



function CreateGroups() {
    const navigate = useNavigate();

    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [createError, setCreateError] = useState(false);

    const submitGroupe = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(event);

        let body = {
            Name: groupName,
            description: groupDescription
        };

        console.log("body", body);

        if (body.Name !== '') {
            let loginSuccess = await CreateGroupService(body);
            console.log(loginSuccess);
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
                <form onSubmit={submitGroupe}>
                    <div className='libelleForm'>
                        <label>Nom du groupe :</label>
                        <input type="text" name="text" required onChange={(e) => setGroupName(e.target.value)}></input>
                    </div>
                    <div className='libelleForm'>
                        <label>Description :</label>
                        <input type="text" name="text" onChange={(e) => setGroupDescription(e.target.value)}></input>
                    </div>
                    {/* <div>
                        <label>Ajout de membres :</label>
                        <br />
                        <input type="text" name="text" required onChange={(e) => setGroupMembre(e.target.value)}></input>
                    </div> */}

                    <br />
                    <div>
                        <button type="submit" className='boutonAjoutGroupe'>Ajouter le groupe</button>
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

export default CreateGroups;
