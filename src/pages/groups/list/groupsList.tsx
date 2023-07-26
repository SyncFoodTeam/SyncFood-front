import { GetGroupService } from '../../../service/groupe.service';
import Header from '../../../component/header/header';
import Menu from '../../../component/menu/menu';
import './groupsList.css';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import ajout from '../../../assets/add.svg'
import IGroups from '../../../interface/groups.interface';
import moment from 'moment';


function GroupsList() {
    const navigate = useNavigate();
    const [groups, setGroups] = useState<IGroups[]>([]);
    const [noData, setNoData] = useState(false);

    useEffect(() => {
        getGroup();
    }, []);
    
    const createGroup = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        navigate('/createGroups');
    }

    async function getGroup() {
        console.log("getGroup()");
        let myGroups = await GetGroupService();

        console.log(myGroups);

        if (myGroups.length > 0) {
            console.log("j'ai des data:")
            setNoData(false);
            setGroups(myGroups);

            console.log({ groups });
        } else {
            setNoData(true);
        }
    }


    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />

            <h1>Groups Page List</h1>

            {!noData &&
                <div>
                    {groups.map((group: IGroups, index: number) => (
                        <div key={index}>
                            <div>
                                <div>
                                    <h5>Nom : {group.name} </h5>
                                    <h5>Description : {group.description} </h5>
                                    <h5>Date de Création : {moment(group.creationDate).format("YYYY/MM/DD kk:mm:ss")} </h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
            {noData &&
                <h4 className='errorMessage'>
                    Erreur
                </h4>
            }
            <button onClick={createGroup} className="ajout"><img src={ajout} alt='Ajout de groupe'/></button>



            <Menu />
        </div>


    );
}

export default GroupsList;