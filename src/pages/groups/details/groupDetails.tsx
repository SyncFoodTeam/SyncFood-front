import { useLocation } from 'react-router-dom';
import Header from '../../../component/header/header';
import './groupDetails.css';
import React, { useEffect, useState } from 'react'
import Menu from '../../../component/menu/menu';
import IGroup from '../../../interface/groups/group.interface';
import { DeleteGroupService, GetGroupService } from '../../../service/groupe.service';
import IGroupsMembers from '../../../interface/groups/groupsMembers.interface';
import IShoppingLists from '../../../interface/shoppingList/shoppingList.interface';
import IFoodContainers from '../../../interface/container/foodContainer.interface';
import { useNavigate } from "react-router-dom";
import DeleteModal from '../../../component/deleteModal/deleteModal';
import ajout from '../../../assets/add.svg'
import AddUser from '../addUser/addUser';
import BounceLoader from 'react-spinners/BounceLoader';


function GroupDetails() {
    const navigate = useNavigate();

    const [group, setGroup] = useState<IGroup>({});
    const [noData, setNoData] = useState(false);



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

    const removeSomeone = async (idUser: number) => {
        console.log("idUser", idUser);

    }

    
    return (
        <div className="App">

            <Header />

            <h1>Groups Page Details</h1>

            <div>{group.name}</div>
            <div>{group.description}</div>
            <div>{group.budget}</div>
            
            <div>
                <label>Listes des membres du groupes: </label>
                {group?.members?.map((members: IGroupsMembers, index: number) => (
                    <div key={index}>

                        <div className='groupe'>
                            <div className='descriptif'>
                                <div>
                                    <h3>{members.userName}#{members.discriminator}</h3>
                                    <DeleteModal groupId={group.id} userId={members.id} whatIs={'removeSomeone'}></DeleteModal>
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

            <AddUser idGroup={group.id}/>  

            <DeleteModal index={group.id} whatIs={'groups'}></DeleteModal>

            <Menu />
        </div>


    );
}

export default GroupDetails;
