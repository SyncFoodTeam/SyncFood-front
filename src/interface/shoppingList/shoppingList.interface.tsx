import IGroups from "../groups/groups.interface";
import IProducts from "../product/products.interface";


export default interface IShoppingLists {
    id?: number,
    nom?: string,
    products?: IProducts[],
    creationDate?: string,
    updatedDate?: string,
    groupId?: number,
    group?: IGroups,
}