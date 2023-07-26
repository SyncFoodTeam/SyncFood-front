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