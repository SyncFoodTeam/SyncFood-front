import { routeService } from "../service/route.service";
import IUserUpdateInformation from "../interface/auth.interface";
import IUserRegister from "../interface/auth.interface";
import ICommonUser from "../interface/common/commonUser.interface";

export async function LoginDao(body: any): Promise<ICommonUser | undefined> {
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

        const realData = await data.json();
        if (data.status === 200 && realData) {

            let loginData = {
                data: realData,
                code: data.status
            }

            console.log('======success=======');
            return loginData;
        } else {
            await routeService(data.status);
            return undefined
        }


    } catch (error) {

        console.error('======failure=======');
        console.error(error);

        throw new Error("Erreur");

    }

};

export async function RegisterDao(body: IUserRegister): Promise<ICommonUser | undefined> {
    console.log("RegisterDao()");
    console.log({ body });

    try {
        let data = await fetch('/api/user/register', {

            method: 'POST',
            body: JSON.stringify({
                userName: body.username,
                email: body.email,
                password: body.password,
            }),

            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json'
            },
        })

        const realData = await data.json();
        if (data.status === 200 && realData) {

            let loginData = {
                data: realData,
                code: data.status
            }

            console.log('======success=======');
            return loginData;
        } else {
            await routeService(data.status);
            return undefined
        }

    } catch (error) {

        console.error('======failure=======');
        console.error(error);

        throw new Error("Erreur");

    }
};

export async function InformationMeDao(token: string): Promise<ICommonUser | undefined> {
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

        const realData = await data.json();
        if (data.status === 200 && realData) {

            let loginData = {
                dataUser: realData,
                code: data.status
            }

            console.log('======success=======');
            return loginData;
        } else {
            await routeService(data.status);
            return undefined
        }

    } catch (error) {

        console.error('======failure=======');
        console.error(JSON.stringify(error));

        throw new Error("Erreur");

    }

};

export async function UpdateInformation(token: string, body: IUserUpdateInformation): Promise<ICommonUser | undefined> {
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

        const realData = await data.json();
        if (data.status === 200 && realData) {

            let loginData = {
                data: realData,
                code: data.status
            }

            console.log('======success=======');
            return loginData;
        } else {
            await routeService(data.status);
            return undefined
        }

    } catch (error) {

        console.error('======failure=======');
        console.error(error);

        throw new Error("Erreur");

    }


};

