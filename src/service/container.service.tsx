import { CreateFoodContainerDao, DeleteContainerDao, GetContainerDao, UpdateContainerDao } from "../dao/container.dao";
import IFoodContainers from "../interface/container/foodContainer.interface";
import IFoodContainerCreate from "../interface/container/foodContainer.interface";
import IFoodContainerEdit from "../interface/container/foodContainer.interface";

export async function CreateFoodContainerService(body: IFoodContainerCreate) {
    console.log("CreateFoodContainerService(" + JSON.stringify(body) + ")");

    try {
        let token = localStorage.getItem('token');
        console.log("Mon Bearer token :", token);
        if (token) {
            const resp = await CreateFoodContainerDao(body, token);

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

export async function GetContainerService(containerId: number): Promise<IFoodContainers> {
    console.log("GetContainerService(containerId)");
    console.log(containerId);

    try {
        let token = localStorage.getItem('token');
        if (token) {
            const resp = await GetContainerDao(token, containerId);
            if (resp?.code === 200) {
                return resp.dataContainer;
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

export async function DeleteContainerService(containerId: number) {
    console.log("DeleteContainerService(containerId)");
    console.log(containerId)

    try {
        let token = localStorage.getItem('token');
        const resp = await DeleteContainerDao(token, containerId);
        if (resp?.code === 200) {
            return resp;
        } else {
            console.log("J'ai un code erreur");
            return resp;
        }

    } catch (e) {
        console.log("Erreur", e);

        return undefined;
    }

}

export async function UpdateContainerService(body: IFoodContainerEdit) {
    console.log("UpdateContainerService(" + {body} + ")");

    try {
        let token = localStorage.getItem('token');
        console.log("Mon Bearer token :", token);
        if (token) {
            const resp = await UpdateContainerDao(token, body);

            if (resp?.code === 200) {
                return resp;
            } else {
                console.log("J'ai un code erreur");
                return resp;
            }
        } else {
            console.log("Je n'ai pas de token");
            return undefined
        }

    } catch (e) {
        console.log("Erreur", e);
        return undefined
    }


}