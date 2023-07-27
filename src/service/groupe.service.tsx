import { CreateGroupDao, GetGroupDao } from "../dao/groupe.dao";
import ICreateGroups from "../interface/groups.interface";
import IGroups from "../interface/groups.interface";

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

export async function GetGroupService(): Promise<IGroups> {
    console.log("GetGroupService()");

    try {
        let token = localStorage.getItem('token');
        console.log("Mon Bearer token :", token);
        if (token) {
            const resp = await GetGroupDao(token);

            if (resp?.code === 200) {
                return resp.dataGroups;
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