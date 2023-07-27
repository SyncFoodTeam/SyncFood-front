import ICommonGroups from "../interface/common/commonGroups.interface";
import ICreateGroups from "../interface/groups/groupsCreate.interface";

import { routeService } from "../service/route.service";


export async function CreateGroupDao(body: ICreateGroups, token: string) {
    console.log("CreateGroupDao(body, token");

    console.log(body);

    const data = await fetch('/api/groups/create', {
        method: 'POST',
        body: JSON.stringify({
            Name: body.Name,
            description: body.Description,
            // budget: body.budget
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

export async function GetGroupDao(token: string): Promise<ICommonGroups | undefined> {
    console.log("GetGroupDao(token");

    const data = await fetch('/api/groups/mine', {
        method: 'GET',
        headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + JSON.parse(token)
        }
    })

    const realData = await data.json();
    if (data.status === 200 && realData) {

        let groupData: ICommonGroups = {
            dataGroups: realData,
            code: data.status
        }

        console.log('======success=======');
        return groupData;
    } else {
        await routeService(data.status);
        return undefined
    }
};

