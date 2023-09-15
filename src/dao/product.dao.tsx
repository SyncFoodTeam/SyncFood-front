import { routeService } from "../service/route.service";

export async function getProductCamDao(codeBarre: string) {
    console.log("getProductCamDao(",{codeBarre},")");

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