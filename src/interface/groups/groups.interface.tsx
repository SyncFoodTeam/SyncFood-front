import IGroupsMembers from "./groupsMembers.interface";

export default interface IGroups {
    id?: number;
    name?: string;
    description?: string;
    budget?: number;
    creationDate?: string;
    owner?: IGroupsMembers;
}



