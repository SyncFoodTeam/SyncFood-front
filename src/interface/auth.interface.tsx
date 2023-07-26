export default interface IUser {
    id?: number,
    userName?: string,
    discriminator?: string,
    email?: string,
    password?: string,
    role?: number,
    token?: string,
    creationDate?: string,
    updatedDate?: string,
}

export default interface IUserRegister {
    userName?: string,
    email?: string,
    password?: string,
}

export default interface IUserLogin {
    email?: string,
    password?: string,
}

export default interface IUserUpdateInformation {
    userName?: string,
    email?: string,
    password?: string,
}