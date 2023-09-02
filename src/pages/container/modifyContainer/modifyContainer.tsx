import { useLocation } from 'react-router-dom';
import Header from '../../../component/header/header';
import './modifyContainer.css';
import React, { useEffect, useState } from 'react'
import Menu from '../../../component/menu/menu';
import IGroup from '../../../interface/groups/group.interface';
import { GetGroupService } from '../../../service/groupe.service';
import IGroupsMembers from '../../../interface/groups/groupsMembers.interface';
import IShoppingLists from '../../../interface/shoppingList/shoppingList.interface';
import IFoodContainers from '../../../interface/container/foodContainer.interface';
import { useNavigate } from "react-router-dom";
import DeleteModal from '../../../component/deleteModal/deleteModal';
import ajout from '../../../assets/add.svg'


function modifyContainer() {
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

    
    return (
        <div className="App">

            <Header />

            <h1>Groups Page Details</h1>

            <div>{group.name}</div>
            <div>{group.description}</div>
            <div>Budget: {group.budget}</div>

            <div>{group.creationDate}</div>

            <DeleteModal index={group.id} whatIs={'groups'}></DeleteModal>

            <Menu />
        </div>


    );
}

export default modifyContainer;
