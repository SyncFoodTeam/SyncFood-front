import { InformationMeDao, LoginDao, UpdateInformation } from '../dao/auth.dao';
import { RegisterDao } from '../dao/auth.dao';
import IUserLogin from '../interface/auth.interface';
import IUserRegister from '../interface/auth.interface';
import IUserUpdateInformation from '../interface/auth.interface';

export async function LoginService(body: IUserLogin) {
    console.log("LoginService()", body);

    try {

        let resp = await LoginDao(body);
        console.log("Résultat de ce que me renvoie ma route :", resp);
        console.log("Je vérifie si j'ai bien les infos du User");

        if (resp.code === 200 && resp?.data?.token) {
            console.log("Je stocks les infos du User");
            localStorage.setItem('token', JSON.stringify(resp?.data?.token));

            return resp;
        } else {
            console.log("J'ai un code erreur");
            return resp;
        }


    } catch (e) {
        console.log("Erreur", e);
    }


}

export async function RegisterService(body: IUserRegister) {
    console.log("RegisterService()", body);

    try {

        let resp = await RegisterDao(body);
        console.log(resp);
        console.log("Je vérifie si j'ai bien les infos du User");

        if (resp.code === 200 && resp?.data?.token) {
            console.log("Je stocks les infos du User");

            return resp;
        } else {
            console.log("J'ai un code erreur");
            return resp;
        }


    } catch (e) {
        console.log("Erreur", e);
    }

}

export async function InformationMe() {
    console.log("InformationMe()");

    try {

        let token = localStorage.getItem('token');
        console.log("Mon Bearer token :", token);

        if (token) {
            const resp = await InformationMeDao(token);

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
    }


}

export async function UpdateInformationMe(body: IUserUpdateInformation) {
    console.log("UpdateInformationMe(" + body + ")");

    try {
        let token = localStorage.getItem('token');
        console.log("Mon Bearer token :", token);
        if (token) {
            const resp = await UpdateInformation(token, body);

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