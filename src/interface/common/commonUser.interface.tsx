import IUser from "../auth.interface";
import IUserPublic from "../auth.interface";
export default interface ICommonUser {
    dataUser?: IUser;
    code?: number;
}

export default interface ICommonUserPublic {
    dataUserPublic?: IUserPublic;
    code?: number;
}