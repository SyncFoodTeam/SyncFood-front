import { GetGroupService } from '../../../service/groupe.service';
import Header from '../../../component/header/header';
import Menu from '../../../component/menu/menu';
import './groupsList.css';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import ajout from '../../../assets/add.svg'
import NoDataComponent from '../../../component/noData/noData';
import IGroups from '../../../interface/groups/groups.interface';


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

        setGroups(myGroups);

        if (groups && groups.length > 0) {
            console.log("j'ai des data:")
            setNoData(false);
        } else {
            setNoData(true);
        }
    }


    return (
        <div className="App">

            <Header />

            <h1>Groups Page List</h1>

            {!noData &&
                <div>
                    {groups.map((group: IGroups, index: number) => (
                        <div key={index}>

                            <div className='groupe'>
                                <div className='image'> IMAGE</div>
                                <div className='descriptif'>
                                    <h3>{group.name} </h3>
                                    <h5>{group.description} </h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
            {noData &&
                <NoDataComponent />
            }
            <button onClick={createGroup} className="ajout"><img src={ajout} alt='Ajout de groupe' /></button>



            <Menu />
        </div>


    );
}

export default GroupsList;
