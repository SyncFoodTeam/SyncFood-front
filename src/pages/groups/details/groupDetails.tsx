import { useLocation } from 'react-router-dom';
import Header from '../../../component/header/header';
import './groupDetails.css';
import React, { useEffect, useState } from 'react'
import Menu from '../../../component/menu/menu';
import IGroup from '../../../interface/groups/group.interface';
import { GetGroupService } from '../../../service/groupe.service';
import { useNavigate } from "react-router-dom";
import { InformationMe } from '../../../service/auth.service';
import IUserPublic from '../../../interface/auth.interface';
import Loader from '../../../component/loader/loader';
import { useTranslation } from 'react-i18next';
import GoBack from '../../../component/goBack/goBack';
import ContainerList from '../../container/list/containerList';

function GroupDetails() {
    const navigate = useNavigate();

    const [group, setGroup] = useState<IGroup>({});
    const [noData, setNoData] = useState(false);
    const [user, setUser] = useState<IUserPublic>({});

    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const { t } = useTranslation();

    const id = location.state?.id;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (id) {
                await getGroup(id);
                const userData = await InformationMe();
                setUser(userData.dataUser);
            } else {
                console.log("Je n'ai pas d'id");
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    async function getGroup(groupId: number) {
        console.log("getGroup(groupId)");
        let myGroups = await GetGroupService(groupId);

        if (myGroups) {
            console.log("j'ai des data:")
            setGroup(myGroups);
            console.log({ group });
            setNoData(false);
        } else {
            setNoData(true);
        }
    }

    const modifyGroups = async (id: number) => {

        navigate('/modifyGroups', { state: { id } });
    }


    const createFoodContainer = async (id: number) => {
        navigate('/createContainer', { state: { id } });
    }



    return (
        <div className="App">
            {!loading &&
                <Header />
            }
            {!loading &&
                <div className='page'>
                    <div>
                        <GoBack name={group.name}/>
                    </div>

                    <div>
                        <ContainerList group={group} user={user} />
                    </div>
                    <div>
                        {(group?.owner?.id === user?.id) &&
                            <div className='ownerDiv'>

                                <button className='modifyGroup' onClick={() => modifyGroups(group.id)}>{t('Modify Group')}</button>
                                <button className='addContainer' onClick={() => createFoodContainer(group.id)
                                }>{t('Add the container')}</button>
                            </div>
                        }
                    </div>
                    <Menu />

                </div>
            }

            {loading &&
                <Loader />
            }

        </div>


    );
}

export default GroupDetails;
