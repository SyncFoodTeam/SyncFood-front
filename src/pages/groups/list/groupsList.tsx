import { GetGroupsService } from '../../../service/groupe.service';
import Header from '../../../component/header/header';
import Menu from '../../../component/menu/menu';
import './groupsList.css';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import ajout from '../../../assets/add.svg'
import NoDataComponent from '../../../component/noData/noData';
import IGroups from '../../../interface/groups/groups.interface';
import { BounceLoader } from 'react-spinners';
import Loader from '../../../component/loader/loader';


function GroupsList() {
    const navigate = useNavigate();
    const [groups, setGroups] = useState<IGroups[]>([]);
    const [noData, setNoData] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            getGroups();
            setLoading(false);
        };

        fetchData();
    }, []);

    const createGroup = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        navigate('/createGroups');
    }

    async function getGroups() {
        console.log("getGroups()");
        let myGroups = await GetGroupsService();
        if (myGroups && myGroups.length > 0) {
            console.log("j'ai des data:")
            setGroups(myGroups);
            setNoData(false);
        } else {
            setNoData(true);
        }
    }

    const goToGroup = async (id: number) => {

        console.log(id);
        navigate('/groupDetails/', { state: { id } });
    }


    return (
        <div className="App">
            {!loading &&
                <Header />
            }
            <div className='groupList'>
                {!loading &&
                    <div>
                        <h1>Groupes</h1>
                        {!noData &&
                            <div>
                                {groups.map((group: IGroups, index: number) => (
                                    <div key={index}>

                                        <div className='groupe'>
                                            <div className='image'> IMAGE</div>
                                            <div className='descriptif'>
                                                <h3 className='title'>{group.name} </h3>
                                                <h5 className='description'>{group.description} </h5>
                                            </div>
                                        </div>

                                        <div className="seeMore" onClick={() => goToGroup(group.id)}>
                                            Voir plus
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                        {noData &&
                            <NoDataComponent />
                        }

                        <button onClick={createGroup} className="ajout"><img src={ajout} alt='Ajout de groupe' /></button></div>

                }

                {loading &&
                    <div>
                        <Loader />

                    </div>
                }
            </div>
            {!loading &&
                <Menu />
            }
        </div>


    );
}

export default GroupsList;
