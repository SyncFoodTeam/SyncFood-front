import IUser from "./auth.interface";

export default interface ICommonUser {
    data?: IUser;
    code?: number;
}