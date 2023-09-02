import IFoodContainerCreate from "../interface/container/foodContainer.interface";
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
    console.log("GetContainerpDao(token, foodContainerId)");

    const data = await fetch(`/api/foodcontainer/get/${foodContainerId}`, {
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