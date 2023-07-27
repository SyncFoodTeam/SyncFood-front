import ICommonGroup from "../interface/common/commonGroup.interface";
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

export async function GetGroupsDao(token: string): Promise<ICommonGroups | undefined> {
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

export async function GetGroupDao(token: string, groupId: number): Promise<ICommonGroup | undefined> {
    console.log("GetGroupDao(token, groupId)");

    const data = await fetch(`/api/groups/get/${groupId}`, {
        method: 'GET',

        headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + JSON.parse(token)
        }
    })

    const realData = await data.json();
    if (data.status === 200) {

        let groupData: ICommonGroup = {
            dataGroup: realData,
            code: data.status
        }
        console.log('======success=======');
        return groupData;
    } else {
        await routeService(data.status);
        return undefined
    }
};


export async function DeleteGroupDao(token: string, groupId: number): Promise<ICommonGroup | undefined> {
    console.log("DeleteGroupDao(token, groupId)");

    const data = await fetch(`/api/groups/delete/${groupId}`, {
        method: 'DELETE',

        headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + JSON.parse(token)
        }
    })

    const realData = await data.json();
    if (data.status === 200) {

        let groupData: ICommonGroup = {
            dataGroup: realData,
            code: data.status
        }
        console.log('======success=======');
        return groupData;
    } else {
        await routeService(data.status);
        return undefined
    }
};

