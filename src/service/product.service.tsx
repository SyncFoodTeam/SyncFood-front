import { addProductToContainerServiceWithCamDao, getProductCamDao } from "../dao/product.dao";
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

export async function addProductToContainerServiceWithCam(product: IProductOpenFood, containerId: number) {
    console.log(`addProductToContainerServiceWithCam(product)`);
    console.log(product);
    let token = JSON.parse(localStorage.getItem('token'));
    try {
        const resp = await addProductToContainerServiceWithCamDao(token, product, containerId);
        return resp;
    } catch (e) {
        console.log("Erreur", e);
        return undefined
    }


}


