import { getProductCamDao } from "../dao/product.dao";

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
