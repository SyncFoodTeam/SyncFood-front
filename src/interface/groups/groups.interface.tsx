import IFoodContainers from "../container/foodContainer.interface";
import IShoppingLists from "../shoppingList/shoppingList.interface";
import IGroupsMembers from "./groupsMembers.interface";


export default interface IGroups {
    id?: number;
    name?: string;
    description?: string;
    budget?: number;
    members?: IGroupsMembers[];
    foodContainers?: IFoodContainers[];
    shoppingList?: IShoppingLists[];
    creationDate?: string;
    owner?: IGroupsMembers;
}


export default interface ICreateGroups {
    token?: string;
    Name?: string;
    Description?: string;
    budget?: number;

}

