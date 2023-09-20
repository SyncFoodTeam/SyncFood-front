import IProductAdd from "../interface/product/productAdd.interface";
import { IProductOpenFood } from "../interface/product/productOpenFood.interface";
import RedirectService from "../service/redirect.service";
import { routeService } from "../service/route.service";

export async function getProductCamDao(codeBarre: string): Promise<IProductOpenFood> {
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
        routeService(data.status);
    }
};

export async function addProductToContainerServiceWithCamDao(token: string, body: IProductAdd) {
    console.log("addProductToContainerServiceWithCamDao(token, body)");
    console.log({ body });
    const data = await fetch(`/api/products/add`, {
        method: 'POST',
        body: JSON.stringify({
            price: body.price,
            barcode: body.barcode,
            expirationdate: body.expirationdate,
            foodcontainerid: body.foodcontainerid,
            quantity: body.quantity,
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
        routeService(data.status);
    }
};
