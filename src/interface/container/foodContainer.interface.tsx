import IGroups from "./groups.interface"
import IProducts from "./products.interface"

export default interface IFoodContainers {
    id?: number,
    name?: string,
    description?: string,
    products?: IProducts[],
    creationDate?: string,
    updatedDate?: string,
    group?: IGroups
}