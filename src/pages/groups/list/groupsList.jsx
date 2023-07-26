import { GetGroupService } from '../../../service/groupe.service';
import Header from '../../../component/header/header';
import Menu from '../../../component/menu/menu';
import './groupsList.css';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import ajout from '../../../assets/add.svg'


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

            <Header barCodeScannerIsTrue={true} />

            <h1>Groups Page List</h1>

            <div>
                {groups.map((group) => (
                    <div className='groupe'>
                        <div className='image'> IMAGE</div>
                        <div className='descriptif'> 
                            <h3>{group.name} </h3>
                            <h5>{group.description} </h5>
                        </div>
                    </div>
                ))}
                
            </div>
            <button onClick={createGroup} className="ajout"><img src={ajout} alt='Ajout de groupe'/></button>



            <Menu />
        </div>


    );
}

export default GroupsList;
