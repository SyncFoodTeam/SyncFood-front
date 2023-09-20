import { addProductToContainerServiceWithCamDao, getProductCamDao } from "../dao/product.dao";
import IProductAdd from "../interface/product/productAdd.interface";
import { IProduct, IProductOpenFood } from "../interface/product/productOpenFood.interface";

export async function getProductCamService(codeBarre: string) {
    console.log("getProductCamService(" + codeBarre + ")");

    try {
        const resp = await getProductCamDao(codeBarre);
        return resp;
    } catch (e) {
        console.log("Erreur", e);
        return undefined
    }


}

export async function addProductToContainerServiceWithCam(body: IProductAdd) {
    console.log(`addProductToContainerServiceWithCam(body)`);
    console.log(body);
    let token = JSON.parse(localStorage.getItem('token'));
    try {
        const resp = await addProductToContainerServiceWithCamDao(token, body);
        return resp;
    } catch (e) {
        console.log("Erreur", e);
        return undefined
    }


}


