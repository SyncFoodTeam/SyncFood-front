import IUser from "../auth.interface";

export default interface ICommonUser {
    dataUser?: IUser;
    code?: number;
}