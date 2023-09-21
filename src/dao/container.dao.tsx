import IFoodContainerCreate from "../interface/container/foodContainer.interface";
import IFoodContainerEdit from "../interface/container/foodContainer.interface";
import { routeService } from "../service/route.service";

export async function CreateFoodContainerDao(body: IFoodContainerCreate, token: string) {
    console.log("CreateFoodContainerDao(body, token");

    console.log(body);

    const data = await fetch('/api/foodcontainers/create', {
        method: 'POST',
        body: JSON.stringify({
            Name: body.name,
            description: body.description,
            groupId: body.groupId,
        }),
        headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + JSON.parse(token)
        }
    })

    console.log(data);

    if (data.ok) {
        console.log('======success=======');
        return data.json();
    } else {
        console.log('======failure=======');
        return undefined;
    }
};

export async function GetContainerDao(token: string, foodContainerId: number) {
    console.log("GetContainerDao(token, foodContainerId)");

    const data = await fetch(`/api/foodcontainers/get/${foodContainerId}`, {
        method: 'GET',
        headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + JSON.parse(token)
        }
    })

    const realData = await data.json();
    let containerData = {
        dataContainer: realData,
        code: data.status
    }
    if (data.status === 200 && realData) {


        console.log('======success=======');
        return containerData;
    } else {
        await routeService(data.status);
        return containerData;
    }
};

export async function DeleteContainerDao(token: string, foodContainerid: number) {
    console.log("DeleteContainerDao(token, foodContainerid)");
    console.log(foodContainerid);
    
    const data = await fetch(`/api/foodcontainers/delete/${foodContainerid}`, {
        method: 'DELETE',

        headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + JSON.parse(token)
        }
    })

    const realData = await data.json();
    let containerData = {
        dataContainer: realData,
        code: data.status
    }
    if (data.status === 200) {

        console.log('======success=======');
        return containerData;
    } else {
        await routeService(data.status);
        return containerData
    }
};

export async function UpdateContainerDao(token: string, body: IFoodContainerEdit) {
    console.log("UpdateContainerDao(", { body }, ")");

    try {
        let data = await fetch('/api/foodcontainers/edit', {

            method: 'PATCH',
            body: JSON.stringify({
                foodContainerId: body.id,
                name: body.name,
                description: body.description,
            }),
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + JSON.parse(token)
            },
        })

        const realData = await data.json();
        if (data.status === 200 && realData) {

            let updateData = {
                dataContainer: realData,
                code: data.status
            }

            console.log('======success=======');
            return updateData;
        } else {
            await routeService(data.status);
            return undefined
        }

    } catch (error) {

        console.error('======failure=======');
        console.error(error);

        throw new Error("Erreur");

    }


};