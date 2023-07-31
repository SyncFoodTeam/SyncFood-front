import Header from '../../../component/header/header';
import Menu from '../../../component/menu/menu';
import { CreateGroupService, searchUserForAddGroupeService } from '../../../service/groupe.service';
import './createGroups.css';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import goBackArrow from '../../../assets/goBackArrow.svg'



function CreateGroups() {
    const navigate = useNavigate();

    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [createError, setCreateError] = useState(false);
    const [user, setUser] = useState('');


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

    const handleChange = async (event) => {
        // 👇 Get input value from "event"
        setUser(event.target.value);
        console.log(user)
        let token = JSON.parse(localStorage.getItem('token'));

        console.log(token)
        if(user !== ''){
            let users = await searchUserForAddGroupeService(token, 'Admin');
        }else{
            console.log("user non trouvé");
        }
      };


    return (
        <div className="App">

            <Header barCodeScannerIsTrue={true} />

            <button onClick={goBack} className="returnToLastPage"><img src={goBackArrow} alt='Retour en arrière' /></button>


            <div className='formulaire'>
                <form onSubmit={submitGroupe}>
                    <div className='libelleForm'>
                        <label>Nom du groupe :</label>
                        <br />
                        <input type="text" name="text" required onChange={(e) => setGroupName(e.target.value)} className='inputs'></input>
                    </div>
                    <div className='libelleForm'>
                        <label>Description :</label>
                        <br />
                        <input type="text" name="text" onChange={(e) => setGroupDescription(e.target.value)} className='inputs'></input>
                    </div>
                    {/* <div>
                        <label>Ajout de membres :</label>
                        <br />
                        <input type="text" name="text" required onChange={(e) => setGroupMembre(e.target.value)}></input>
                    </div> */}

                    <div>
                        <input type="text" name="addUser" onChange={handleChange} className='inputs'></input>

                        {/* <h2>Message: {user}</h2> */}
                    </div>

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
