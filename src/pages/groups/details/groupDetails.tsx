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
            if (id) {
                setLoading(true);
                await getGroup(id);
                const userData = await InformationMe();
                setUser(userData.dataUser);
                setLoading(false);
            } else {
                console.log("Je n'ai pas d'id");
            }
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

    const goToContainer = async (id: number) => {
        navigate('/containerDetails', { state: { id } });
    }


    return (
        <div className="App">
            {!loading &&
                <Header />
            }
            {!loading &&
                <div>
                    <div>
                        <GoBack name={group.name} />
                    </div>
                    {/* <div>
                        <label>{t('Food Container')}: </label>
                        {group?.foodContainers?.map((container: IFoodContainers, index: number) => (
                            <div key={index}>

                                <div>
                                    <div> IMAGE</div>
                                    <div>
                                        <h3>{container.name} </h3>
                                        <h5>{container.description} </h5>
                                    </div>
                                </div>

                                <div onClick={() => goToContainer(container.id)}>
                                    {t('View More')}
                                </div>
                            </div>
                        ))}
                        {(group?.owner?.id === user?.id) &&
                            <div>
                                <button onClick={() => createFoodContainer(group.id)
                                }>{t('Add')}</button>
                            </div>
                        }
                    </div> */}

                    {/* {(group?.owner?.id === user?.id) &&
                        <button onClick={() => modifyGroups(group.id)}>{t('Modify')}</button>
                    } */}
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
