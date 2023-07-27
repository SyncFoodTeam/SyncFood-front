import { CreateGroupDao, DeleteGroupDao, GetGroupDao, GetGroupsDao } from "../dao/groupe.dao";
import ICreateGroups from "../interface/groups/groupsCreate.interface";
import IGroups from "../interface/groups/groups.interface";
import IGroup from "../interface/groups/group.interface";
import ICommonGroup from "../interface/common/commonGroup.interface";

export async function CreateGroupService(body: ICreateGroups) {
    console.log("CreateGroup(" + JSON.stringify(body) + ")");

    try {
        let token = localStorage.getItem('token');
        console.log("Mon Bearer token :", token);
        if (token) {
            const resp = await CreateGroupDao(body, token);

            if (resp.code === 200) {
                return resp;
            } else {
                console.log("J'ai un code erreur");
                return resp;
            }
        } else {
            console.log("Je n'ai pas de token");
        }

    } catch (e) {
        console.log("Erreur", e);

        return false;
    }

}

export async function GetGroupsService(): Promise<IGroups[]> {
    console.log("GetGroupService()");

    try {
        let token = localStorage.getItem('token');
        if (token) {
            const resp = await GetGroupsDao(token);

            if (resp?.code === 200) {
                console.log({resp})
                return resp.dataGroups;
            } else {
                console.log("J'ai un code erreur");
            }
        } else {
            console.log("Je n'ai pas de token");
        }

    } catch (e) {
        console.log("Erreur", e);

        return undefined;
    }

}

export async function GetGroupService(groupId: number): Promise<IGroup> {
    console.log("GetGroupService(groupId)");
    console.log(groupId)

    try {
        let token = localStorage.getItem('token');
        if (token) {
            const resp = await GetGroupDao(token, groupId);
            if (resp?.code === 200) {
                return resp.dataGroup;
            } else {
                console.log("J'ai un code erreur");
            }
        } else {
            console.log("Je n'ai pas de token");
        }

    } catch (e) {
        console.log("Erreur", e);

        return undefined;
    }

}

export async function DeleteGroupService(groupId: number): Promise<ICommonGroup> {
    console.log("DeleteGroupService(groupId)");
    console.log(groupId)

    try {
        let token = localStorage.getItem('token');
        if (token) {
            const resp = await DeleteGroupDao(token, groupId);
            if (resp?.code === 200) {
                return resp;
            } else {
                console.log("J'ai un code erreur");
            }
        } else {
            console.log("Je n'ai pas de token");
        }

    } catch (e) {
        console.log("Erreur", e);

        return undefined;
    }

}