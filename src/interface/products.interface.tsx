import IFoodContainers from "./foodContainer.interface";

export default interface IProducts {
    id?: number,
    name?: string,
    price?: number,
    barCode?: number,
    nutriScore?: number,
    nutritionalValue?: number,
    expirationDate?: string,
    creationDate?: string,
    updatedDate?: string,
    foodContainers?: IFoodContainers[],
    shoppingLists?: string[]
}