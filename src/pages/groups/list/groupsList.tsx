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
import { useTranslation } from 'react-i18next';
import GoBack from '../../../component/goBack/goBack';


function GroupsList() {
    const navigate = useNavigate();
    const [groups, setGroups] = useState<IGroups[]>([]);
    const [noData, setNoData] = useState(false);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const imageUrl = localStorage.getItem('imageURL');
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await getGroups();
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
        <div >
            {!loading &&
                <Header />
            }
            <div className='groupList'>
                {!loading &&
                    <div>
                        <GoBack name={t('Groups')} />
                        {!noData &&
                            <div>
                                {groups.map((group: IGroups, index: number) => (
                                    <div key={index}>

                                        <div className='groupe'>
                                            <div className='descriptif'>
                                                <h3 className='title'>{group.name} </h3>
                                                <h5 className='description'>{group.description} </h5>
                                            </div>
                                        </div>

                                        <div className="seeMore" onClick={() => goToGroup(group.id)}>
                                            {t('View More')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                        <div>
                            <button className='addGroup' onClick={createGroup}>{t('Add a group')}</button>
                        </div>
                        {noData &&
                            <NoDataComponent />
                        }

                    </div>

                }

            </div>
            {loading &&
                <div>
                    <Loader />

                </div>
            }
            {!loading &&
                <Menu />
            }
        </div>


    );
}

export default GroupsList;
