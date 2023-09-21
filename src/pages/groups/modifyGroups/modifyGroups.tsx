import { useLocation } from 'react-router-dom';
import Header from '../../../component/header/header';
import './modifyGroups.css';
import React, { useEffect, useState } from 'react'
import Menu from '../../../component/menu/menu';
import IGroup from '../../../interface/groups/group.interface';
import { GetGroupService, UpdateGroupService, changeOwnerService } from '../../../service/groupe.service';
import IGroupsMembers from '../../../interface/groups/groupsMembers.interface';
import IShoppingLists from '../../../interface/shoppingList/shoppingList.interface';
import IFoodContainers from '../../../interface/container/foodContainer.interface';
import { useNavigate } from "react-router-dom";
import DeleteModal from '../../../component/deleteModal/deleteModal';
import AddUser from '../addUser/addUser';
import DateFormater from '../../../pipe/dateFormater';
import Loader from '../../../component/loader/loader';
import { useTranslation } from 'react-i18next';
import GoBack from '../../../component/goBack/goBack';

function ModifyGroups() {
    const navigate = useNavigate();

    const [group, setGroup] = useState<IGroup>({});
    const [noData, setNoData] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [groupBudget, setGroupBudget] = useState('');
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    const location = useLocation();

    const id = location.state?.id;

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                setLoading(false);
                await getGroup(id);
                setLoading(true);
            } else {
                console.log("je n'ai pas d'id")
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

    const modifyGroup = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        let body = {
            id: group?.id,
            name: groupName || group?.name,
            description: groupDescription,
            budget: parseInt(groupBudget) || 0
        };

        console.log("J'envoie mes données à la route adéquat");
        let updateSuccess = await UpdateGroupService(body);
        console.log(updateSuccess);
        if (updateSuccess) {
            navigate(-1);
        } else {
            console.log("Erreur lors de la connexion");
        }
    }

    const changeOwner = async (userId: number) => {

        await changeOwnerService(group.id, userId);

        navigate('/');
    }




    return (
        <div className="App">

            {loading &&
                <Header />
            }
            {loading &&
                <div>
                    <GoBack />
                </div>

            }
            {loading &&
                <div className='modifyCard'>

                    <div className="modifyDiv">
                        <label>{t('Name of the group')} :</label>
                        <br />
                        <input type="text" name="text"
                            defaultValue={group.name}
                            onChange={(e) => setGroupName(e.target.value)}
                            className='modifyInput'
                        ></input>
                    </div>
                    <div className="modifyDiv">
                        <label>{t('Description')} :</label>
                        <br />
                        <input type="text" name="decription"
                            defaultValue={group.description}
                            onChange={(e) => setGroupDescription(e.target.value)}
                            className='modifyInput'
                        ></input>
                    </div>

                    <div className="modifyDiv">
                        <label>{t('Budget')} :</label>
                        <br />
                        <input type="number" name="budget"
                            defaultValue={group.budget}
                            onChange={(e) => setGroupBudget(e.target.value)}
                            className='modifyInput'
                        ></input>
                    </div>

                    <div>
                        <AddUser idGroup={id} />
                    </div>

                    <div>
                        <label>{t('Lists of group members')}: </label>
                        {group?.members?.map((members: IGroupsMembers, index: number) => (
                            <div key={index}>

                                <div className='groupeMembers'>
                                    <div className='descriptif'>
                                        {group?.owner?.id === members?.id &&
                                            <div>
                                                {t('Owner')}: {members.userName}#{members.discriminator}
                                            </div>
                                        }
                                        {(group?.owner?.id !== members?.id) &&
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className='userInGroups'>
                                                    {members.userName}#{members.discriminator}
                                                </div>
                                                <div className='userInGroups'>
                                                    <button onClick={() => changeOwner(members.id)} className='changeOwner'>
                                                        <i className="fa-solid fa-people-arrows"></i>
                                                    </button>
                                                </div>
                                                <div style={{ margin: '-20px' }}>
                                                    <DeleteModal groupId={group.id} userId={members.id} whatIs={'removeSomeone'}></DeleteModal>
                                                </div>

                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>



                    <div>
                        {group?.shoppingList?.map((shoppingList: IShoppingLists, index: number) => (
                            <div key={index}>

                                <div className='groupe'>
                                    <div className='descriptif'>
                                        <h3>{shoppingList.nom} </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        {group?.foodContainers?.map((foodContainers: IFoodContainers, index: number) => (
                            <div key={index}>

                                <div className='groupe'>
                                    <div className='descriptif'>
                                        <h3>{foodContainers.name} </h3>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>

                    <div className='creationDate'>
                        {t('Group creation date')}: <DateFormater date={group.creationDate} />
                    </div>

                    <div className='divButton'>
                        <div className='divButtonModify'>
                            <button onClick={modifyGroup} className='modifyButton'>{t('Modify')}</button>
                        </div>

                        <div className='divButtonDelete'>
                            <DeleteModal index={group.id} whatIs={'groups'}></DeleteModal>
                        </div>

                    </div>
                </div>
            }

            {!loading &&
                <Loader />
            }

            {loading &&
                <Menu />
            }
        </div>


    );
}

export default ModifyGroups;
