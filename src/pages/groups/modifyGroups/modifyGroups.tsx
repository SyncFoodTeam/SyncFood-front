import { useLocation } from 'react-router-dom';
import Header from '../../../component/header/header';
import './modifyGroups.css';
import React, { useEffect, useState } from 'react'
import Menu from '../../../component/menu/menu';
import IGroup from '../../../interface/groups/group.interface';
import { GetGroupService, UpdateGroupService } from '../../../service/groupe.service';
import IGroupsMembers from '../../../interface/groups/groupsMembers.interface';
import IShoppingLists from '../../../interface/shoppingList/shoppingList.interface';
import IFoodContainers from '../../../interface/container/foodContainer.interface';
import { useNavigate } from "react-router-dom";
import DeleteModal from '../../../component/deleteModal/deleteModal';
import ajout from '../../../assets/add.svg'
import AddUser from '../addUser/addUser';


function ModifyGroups() {
    const navigate = useNavigate();

    const [group, setGroup] = useState<IGroup>({});
    const [noData, setNoData] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [groupBudget, setGroupBudget] = useState('');

    const location = useLocation();

    const id = location.state?.id;

    useEffect(() => {
        if (id) {
            getGroup(id);
        } else {
            console.log("je n'ai pas d'id")
        }
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

    const addFoodContainer = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        navigate('/addFoodContainer');
    }

    const modifyGroup = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        let body = {
            id: group?.id,
            name: groupName || group?.name,
            description: groupDescription || group?.description,
            budget: parseInt(groupBudget) || group?.budget
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

    return (
        <div className="App">

            <Header />

            <h1>Groups Page Details</h1>
            <div>
                <label className="label">Nom du groupe :</label>
                <br />
                <input type="text" name="text"
                    defaultValue={group.name}
                    onChange={(e) => setGroupName(e.target.value)}
                ></input>
            </div>
            <div>
                <label className="label">Description :</label>
                <br />
                <input type="text" name="text"
                    defaultValue={group.description}
                    onChange={(e) => setGroupDescription(e.target.value)}
                ></input>
            </div>

            <div>
                <label className="label">Budget :</label>
                <br />
                <input type="number" name="text"
                    defaultValue={group.budget}
                    onChange={(e) => setGroupBudget(e.target.value)}
                ></input>
            </div>

            <button onClick={modifyGroup}>Modifier</button>

            <div>
                <label>Listes des membres du groupes: </label>
                {group?.members?.map((members: IGroupsMembers, index: number) => (
                    <div key={index}>

                        <div className='groupe'>
                            <div className='descriptif'>
                                <div>
                                    <h3>{members.userName}#{members.discriminator}</h3>
                                    {members.id !== group.owner.id &&
                                        <DeleteModal groupId={group.id} userId={members.id} whatIs={'removeSomeone'}></DeleteModal>
                                    }
                                    {/* <button onClick={() => removeSomeone(members.id)}>Enlever</button> */}
                                </div>
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

            <button onClick={addFoodContainer} className="ajout"><img src={ajout} alt='Ajout de groupe' /></button>

            <div>{group.creationDate}</div>

            <AddUser idGroup={group.id} />

            <DeleteModal index={group.id} whatIs={'groups'}></DeleteModal>

            <Menu />
        </div>


    );
}

export default ModifyGroups;
