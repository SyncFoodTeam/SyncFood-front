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
import { InformationMe } from '../../../service/auth.service';
import IUserPublic from '../../../interface/auth.interface';


function GroupDetails() {
    const navigate = useNavigate();

    const [group, setGroup] = useState<IGroup>({});
    const [noData, setNoData] = useState(false);
    const [user, setUser] = useState<IUserPublic>({});


    const location = useLocation();

    const id = location.state?.id;

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                await getGroup(id);
                const userData = await InformationMe();
                setUser(userData.dataUser);
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


    return (
        <div className="App">

            <Header />

            <h1>Groups Page Details</h1>

            <div>Nom: {group.name}</div>
            <div>Description: {group.description}</div>
            <div>Budget: {group.budget}</div>

            {(group?.owner?.id === user?.id) &&
                <button onClick={() => modifyGroups(group.id)}>Modifier</button>
            }
            <Menu />
        </div>


    );
}

export default GroupDetails;
