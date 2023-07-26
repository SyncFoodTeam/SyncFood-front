import Header from '../../../component/header/header';
import Menu from '../../../component/menu/menu';
import { CreateGroupService } from '../../../service/groupe.service';
import './createGroups.css';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";



function CreateGroups() {
    const navigate = useNavigate();

    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');

    const submitGroupe = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(event);

        let body = {
            Name: groupName,
            description: groupDescription
        };

        console.log("body", body);

        let loginSuccess = await CreateGroupService(body);
        console.log(loginSuccess);

    };

    const goBack = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        console.log(event);

        navigate(-1);
    }


    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />

            <div>
                <button onClick={goBack}>Go back</button>
                <div>
                    Ajout de groupe
                </div>
            </div>


            <div>
                <form onSubmit={submitGroupe}>
                    <div>
                        <label>Nom du groupe :</label>
                        <br />
                        <input type="text" name="text" required onChange={(e) => setGroupName(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Description :</label>
                        <br />
                        <input type="text" name="text" onChange={(e) => setGroupDescription(e.target.value)}></input>
                    </div>
                    {/* <div>
                        <label>Ajout de membres :</label>
                        <br />
                        <input type="text" name="text" required onChange={(e) => setGroupMembre(e.target.value)}></input>
                    </div> */}

                    <br />
                    <div>
                        <button type="submit">Créer</button>
                    </div>
                </form>
            </div>

            <Menu />
        </div>


    );
}

export default CreateGroups;
