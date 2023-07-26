import IFoodContainers from "./foodContainer.interface"
import IShoppingLists from "./shoppingList.interface"

export default interface IGroupsMembers {
    id?: number;
    userName?: string;
    discriminator?: string;
    role?: number;
    creationDate?: string;
}

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

