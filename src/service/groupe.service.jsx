import { CreateGroupDao } from "../dao/groupe.dao";


export async function CreateGroupService(body) {
    console.log("CreateGroup(" + JSON.stringify(body) + ")");

    try {
        const items = JSON.parse(localStorage.getItem('bearer'));
        console.log("Mon Bearer token :", items);
        const resp = await CreateGroupDao(body, items);

        return resp;
    } catch (e) {
        console.log("Erreur", e);

        return false;
    }


}