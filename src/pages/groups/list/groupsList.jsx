import Header from '../../../component/header/header';
import Menu from '../../../component/menu/menu';
import './groupsList.css';
import React from 'react'
import { useNavigate } from "react-router-dom";


function GroupsList() {
    const navigate = useNavigate();

    const createGroup = async (event) => {
        event.preventDefault();

        navigate('/createGroups');
    }

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />


            <h1>Groups Page List</h1>

            <button onClick={createGroup}>Créer un Groupe</button>


            <Menu />
        </div>


    );
}

export default GroupsList;
