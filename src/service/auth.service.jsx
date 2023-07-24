import { InformationMeDao, LoginDao } from '../dao/auth.dao';
import { RegisterDao } from '../dao/auth.dao';

export async function LoginService(body) {
    console.log("LoginService()", body);

    try {

        const resp = await LoginDao(body);
        console.log(resp);
        console.log("Je vérifie si j'ai bien les infos du User");

        if (resp) {
            console.log("Je stocks les infos du User");
            localStorage.setItem('token', JSON.stringify(resp?.token));

            return true;
        } else {
            console.log("Je n'ai aucune infos du User");
            return false;
        }


    } catch (e) {
        console.log("Erreur", e);

        return false;
    }


}

export async function RegisterService(body) {
    console.log("RegisterService()", body);

    try {

        const resp = await RegisterDao(body);
        console.log(resp);
        console.log("Je vérifie si j'ai bien les infos du User");

        if (resp) {
            return true;
        } else {
            return false;
        }


    } catch (e) {
        console.log("Erreur", e);

        return false;
    }


}

export async function InformationMe() {
    console.log("InformationMe()");
    
    try {
        const items = JSON.parse(localStorage.getItem('token'));
        console.log("Mon Bearer token :",items);
        const resp = await InformationMeDao(items);

        return resp;
    } catch (e) {
        console.log("Erreur", e);

        return false;
    }


}