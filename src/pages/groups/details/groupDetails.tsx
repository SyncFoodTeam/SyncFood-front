import { useLocation } from 'react-router-dom';
import Header from '../../../component/header/header';
import './groupDetails.css';
import React, { useEffect, useState } from 'react'
import Menu from '../../../component/menu/menu';
import IGroup from '../../../interface/groups/group.interface';
import { GetGroupService } from '../../../service/groupe.service';
import IGroupsMembers from '../../../interface/groups/groupsMembers.interface';
import IShoppingLists from '../../../interface/shoppingList/shoppingList.interface';
import IFoodContainers from '../../../interface/container/foodContainer.interface';


function GroupDetails() {
    const [group, setGroup] = useState<IGroup>({});
    const [noData, setNoData] = useState(false);



    const location = useLocation();
    // Vérifiez si l'objet state contient l'ID
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
            console.log({group});
            setNoData(false);
        } else {
            setNoData(true);
        }
    }


    return (
        <div className="App">

            <Header />


            <h1>Groups Page Details</h1>
            
            <div>{group.name}</div>
            <div>{group.description}</div>
            <div>{group.budget}</div>
            <div>
                {group?.members?.map((members: IGroupsMembers, index: number) => (
                    <div key={index}>

                        <div className='groupe'>
                            <div className='descriptif'>
                                <h3>{members.userName} </h3>
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

            <div>{group.creationDate}</div>


            <Menu />
        </div>


    );
}

export default GroupDetails;
