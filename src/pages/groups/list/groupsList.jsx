import { GetGroupService } from '../../../service/groupe.service';
import Header from '../../../component/header/header';
import Menu from '../../../component/menu/menu';
import './groupsList.css';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";


function GroupsList() {
    const navigate = useNavigate();

    const createGroup = async (event) => {
        event.preventDefault();

        navigate('/createGroups');
    }

    const [groups, setGroups] = useState([]);


    useEffect(() => {
        getGroup();
    }, []);

    async function getGroup() {
        console.log("getGroup()");
        let groups = await GetGroupService();
        setGroups(groups);
    }




    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />

            <h1>Groups Page List</h1>

            <button onClick={createGroup}>Créer un Groupe</button>

            <div>
                <ul>
                    {groups.map((objet) => (
                    <li key={objet.id}>
                        <h3>{objet.name}</h3>
                        <p>{objet.description}</p>
                    </li>
                    ))}
                </ul>
            </div>


            <Menu />
        </div>


    );
}

export default GroupsList;
