import { routeService } from "../service/route.service";
import ICommonUser from "../interface/common.interface";
import IUserUpdateInformation from "../interface/auth.interface";
import IUserRegister from "../interface/auth.interface";

export async function LoginDao(body: any): Promise<ICommonUser> {
    console.log("LoginDao()");

    try {
        let data = await fetch('/api/user/login', {

            method: 'POST',
            body: JSON.stringify({
                email: body.email,
                password: body.password
            }),

            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json'
            },
        })

        const responseCode = await routeService(data.status);
        const realData = await data.json();

        let loginData = {
            data: realData,
            code: responseCode
        }

        console.log('======success=======');
        return loginData;

    } catch (error) {

        console.error('======failure=======');
        console.error(error);

        throw new Error("Erreur");

    }

};

export async function RegisterDao(body: IUserRegister): Promise<ICommonUser> {
    console.log("RegisterDao()");

    try {
        let data = await fetch('/api/user/register', {

            method: 'POST',
            body: JSON.stringify({
                userName: body.userName,
                email: body.email,
                password: body.password
            }),

            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json'
            },
        })

        const responseCode = await routeService(data.status);
        const realData = await data.json();

        let loginData = {
            data: realData,
            code: responseCode
        }

        console.log('======success=======');
        return loginData;

    } catch (error) {

        console.error('======failure=======');
        console.error(error);

        throw new Error("Erreur");

    }
};

export async function InformationMeDao(token: string): Promise<ICommonUser> {
    console.log("InformationMeDao()");
    console.log(token);

    try {
        let data = await fetch('/api/user/info/me', {
            method: 'GET',
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + JSON.parse(token)
            },
        })

        const responseCode = await routeService(data.status);
        const realData = await data.json();

        let informationData = {
            data: realData,
            code: responseCode
        }

        console.log('======success=======');
        return informationData;

    } catch (error) {

        console.error('======failure=======');
        console.error(JSON.stringify(error));

        throw new Error("Erreur");

    }

};

export async function UpdateInformation(token: string, body: IUserUpdateInformation): Promise<ICommonUser> {
    console.log("UpdateInformation()");

    try {
        let data = await fetch('/api/user/update/me', {

            method: 'PATCH',
            body: JSON.stringify({
                userName: body.userName,
                email: body.email,
                password: body.password
            }),
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + JSON.parse(token)
            },
        })

        const responseCode = await routeService(data.status);
        const realData = await data.json();

        let informationData = {
            data: realData,
            code: responseCode
        }

        console.log('======success=======');
        return informationData;

    } catch (error) {

        console.error('======failure=======');
        console.error(error);

        throw new Error("Erreur");

    }

    
};

