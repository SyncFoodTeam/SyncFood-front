import IGroups from "../groups/groups.interface";
import IProducts from "../product/products.interface";

export default interface IFoodContainers {
    id?: number,
    name?: string,
    description?: string,
    products?: IProducts[],
    creationDate?: string,
    updatedDate?: string,
    group?: IGroups
}

export default interface IFoodContainerCreate {
    name?: string,
    description?: string,
    groupId?: number
}

export default interface IFoodContainerEdit {
    name?: string,
    description?: string,
    containerId?: number
}

