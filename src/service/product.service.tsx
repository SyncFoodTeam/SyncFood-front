import { DeleteProductDao, UpdateProductDao, addProductToContainerServiceWithCamDao, getProductFromOpenFood } from "../dao/product.dao";
import IProductAdd from "../interface/product/productAdd.interface";
import { IProduct, IProductOpenFood } from "../interface/product/productOpenFood.interface";

export async function getProductCamService(codeBarre: string) {
    console.log("getProductCamService(" + codeBarre + ")");

    try {
        const resp = await getProductFromOpenFood(codeBarre);
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

export async function UpdateProductService(body: IProductAdd) {
    console.log(`UpdateProductService(body)`);
    console.log(body);
    let token = JSON.parse(localStorage.getItem('token'));
    try {
        const resp = await UpdateProductDao(token, body);
        return resp;
    } catch (e) {
        console.log("Erreur", e);
        return undefined
    }


}

export async function DeleteProductService(productId: number) {
    console.log("DeleteProductService(productId)");
    console.log(productId)

    try {
        let token = localStorage.getItem('token');
        const resp = await DeleteProductDao(token, productId);
        if (resp?.code === 200) {
            return resp;
        } else {
            console.log("J'ai un code erreur");
            return resp;
        }

    } catch (e) {
        console.log("Erreur", e);

        return undefined;
    }

}