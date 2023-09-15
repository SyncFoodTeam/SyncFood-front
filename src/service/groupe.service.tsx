import { CreateGroupDao, DeleteGroupDao, GetGroupDao, GetGroupsDao, searchUserAddToGroup, addUserToGroup, RemoveSomeoneDao, UpdateGroupDao, ChangeOwnerDao } from "../dao/groupe.dao";
import ICreateGroups from "../interface/groups/groupsCreate.interface";
import IGroup from "../interface/groups/group.interface";
import IGroupEdit from "../interface/groups/group.interface";

export async function CreateGroupService(body: ICreateGroups) {
    console.log("CreateGroup(" + JSON.stringify(body) + ")");

    try {
        let token = localStorage.getItem('token');
        console.log("Mon Bearer token :", token);
        if (token) {
            const resp = await CreateGroupDao(body, token);
            console.log({resp})
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

        return undefined;
    }

}

export async function UpdateGroupService(body: IGroupEdit) {
    console.log("UpdateGroupService(" + {body} + ")");

    try {
        let token = localStorage.getItem('token');
        console.log("Mon Bearer token :", token);
        if (token) {
            const resp = await UpdateGroupDao(token, body);

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

export async function GetGroupsService() {
    console.log("GetGroupService()");

    try {
        let token = localStorage.getItem('token');
        const resp = await GetGroupsDao(token);

        if (resp?.code === 200) {
            console.log({ resp })
            return resp.dataGroups;
        } else {
            console.log("J'ai un code erreur");
            return resp.dataGroups;
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

export async function DeleteGroupService(groupId: number) {
    console.log("DeleteGroupService(groupId)");
    console.log(groupId)

    try {
        let token = localStorage.getItem('token');
        const resp = await DeleteGroupDao(token, groupId);
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

export async function RemoveSomeoneService(groupId: number, userId: number) {
    console.log("RemoveSomeoneService(groupId, userId)");
    console.log(groupId);
    console.log(userId);

    try {
        let token = localStorage.getItem('token');
        const resp = await RemoveSomeoneDao(token, groupId, userId);
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

export async function searchUserForAddGroupeService(token: string, user: string) {
    console.log("searchUserForAddGroupeService()");
    const resultUserWithDiscriminator = user.split('#');

    const username = resultUserWithDiscriminator[0];
    const discriminator = resultUserWithDiscriminator[1];

    if (token) {
        try {
            const resp = await searchUserAddToGroup(token, username, discriminator);

            if (resp?.code === 200) {
                console.log({ resp })
                return resp;
            } else {
                console.log("J'ai un code erreur");
                return resp;
            }

        } catch (e) {
            console.log("Erreur", e);

            return undefined;
        }
    } else {
        console.log("Je n'ai pas de token");
    }

}

export async function addUserToGroupService(token: string, groupId: number, userId: number) {
    console.log("addUserToGroupService()");
    console.log("groupId", groupId);
    console.log("userId", userId);

    if (token) {
        try {
            const resp = await addUserToGroup(token, groupId, userId);

            if (resp?.code === 200) {
                console.log({ resp })
                return resp;
            } else {
                console.log("J'ai un code erreur");
                return resp;
            }

        } catch (e) {
            console.log("Erreur", e);

            return undefined;
        }
    } else {
        console.log("Je n'ai pas de token");
    }

}

export async function changeOwnerService(groupId: number, userId: number) {
    console.log("changeOwnerService()");
    console.log("groupId", groupId);
    console.log("userId", userId);
    let token = localStorage.getItem('token');

    if (token) {
        try {
            const resp = await ChangeOwnerDao(token, userId, groupId);

            if (resp?.code === 200) {
                console.log({ resp })
                return resp;
            } else {
                console.log("J'ai un code erreur");
                return resp;
            }

        } catch (e) {
            console.log("Erreur", e);

            return undefined;
        }
    } else {
        console.log("Je n'ai pas de token");
    }

}