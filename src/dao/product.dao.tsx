import { IProduct, IProductOpenFood } from "../interface/product/productOpenFood.interface";
import { routeService } from "../service/route.service";

export async function getProductCamDao(codeBarre: string) {
    console.log("getProductCamDao(", { codeBarre }, ")");

    const data = await fetch(`https://fr.openfoodfacts.org/api/2/product/${codeBarre}`, {
        method: 'GET',

        headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
        }
    })

    const realData = await data.json();

    let productData = {
        code: realData.code,
        status: realData.status,
        status_verbose: realData.status_verbose,
        product: realData.product
    };

    if (data.status === 200) {
        console.log('======success=======');
        return productData;
    } else {
        await routeService(data.status);
        return undefined
    }
};

export async function addProductToContainerServiceWithCamDao(token: string, product: IProductOpenFood, containerId: number, expirationDate?: string, price?: number, quantity?: number) {
    console.log("addProductToContainerServiceWithCamDao(token, product, containerId)");
    console.log({product});
    const data = await fetch(`/api/products/add`, {
        method: 'POST',
        body: JSON.stringify({
            price: 12,
            barcode: product.code,
            expirationdate: '19/12/2025',
            foodcontainerid: containerId,
            quantity: 2,
        }),
        headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    })

    const realData = await data.json();
    let groupData = {
        groupData: realData,
        code: data.status
    }
    if (data.status === 200 && realData) {
        console.log('======success=======');
        return groupData;
    } else {
        return groupData;
    }
};