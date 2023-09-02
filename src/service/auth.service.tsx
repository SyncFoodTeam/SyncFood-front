import { InformationMeDao, LoginDao, UpdateInformation } from '../dao/auth.dao';
import { RegisterDao } from '../dao/auth.dao';
import IUserLogin from '../interface/auth.interface';
import IUserRegister from '../interface/auth.interface';
import IUserUpdateInformation from '../interface/auth.interface';
import ICommonUser from '../interface/common/commonUser.interface';

export async function LoginService(body: IUserLogin) {
    console.log("LoginService()", body);

    try {

        let resp = await LoginDao(body);
        console.log("Résultat de ce que me renvoie ma route :", resp);

        if (resp?.code === 200 && resp?.dataUser?.token) {
            localStorage.setItem('token', JSON.stringify(resp?.dataUser?.token));

            return resp;
        } else {
            console.log("J'ai un code erreur");
            return resp;
        }


    } catch (e) {
        console.log("Erreur", e);
        return undefined
    }


}

export async function RegisterService(body: IUserRegister) {
    console.log("RegisterService()", body);

    try {

        let resp = await RegisterDao(body);
        console.log(resp);
        console.log("Je vérifie si j'ai bien les infos du User");

        if (resp?.code === 200 && resp?.dataUser?.token) {
            console.log("Je stocks les infos du User");

            return resp;
        } else {
            console.log("J'ai un code erreur");
            return resp;
        }


    } catch (e) {
        console.log("Erreur", e);
        return undefined
    }

}

export async function InformationMe(): Promise<ICommonUser | undefined> {
    console.log("InformationMe()");

    try {

        let token = localStorage.getItem('token');
        // console.log("Mon Bearer token :", token);

        if (token) {
            const resp = await InformationMeDao(token);
            if (resp?.code === 200) {
                return resp;
            } else {
                console.log("J'ai un code erreur");
                return undefined;
            }
        } else {
            console.log("Je n'ai pas de token");
            return undefined;
        }


    } catch (e) {
        console.log("Erreur", e);
        return undefined
    }


}

export async function UpdateInformationMe(body: IUserUpdateInformation) {
    console.log("UpdateInformationMe(" + body + ")");

    try {
        let token = localStorage.getItem('token');
        console.log("Mon Bearer token :", token);
        if (token) {
            const resp = await UpdateInformation(token, body);

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