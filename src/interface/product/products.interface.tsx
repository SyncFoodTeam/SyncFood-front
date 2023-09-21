import IFoodContainers from "../container/foodContainer.interface";

export default interface IProducts {
    id?: number,
    name?: string,
    price?: number,
    barCode?: string,
    nutriScore?: number,
    nutritionalValue?: number,
    expirationDate?: string,
    creationDate?: string,
    updatedDate?: string,
    foodContainers?: IFoodContainers[],
    shoppingLists?: string[]
}

export default interface IProductEdit {
    productId?: number,
    quantity?: number,
}

