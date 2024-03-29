import { routeService } from "../service/route.service";
import IUserUpdateInformation from "../interface/auth.interface";
import IUserRegister from "../interface/auth.interface";
import ICommonUser from "../interface/common/commonUser.interface";

export async function LoginDao(body: any) {
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
        console.log({ realData });

        let loginData = {
            dataUser: realData,
            code: data.status
        }

        if (data.status === 200 && realData) {
            console.log('======success=======');
            return loginData;
        } else {
            // await routeService(data.status);
            return loginData
        }


    } catch (error) {

        console.error('======failure=======');
        console.error(error);
        routeService(500);
        throw new Error("Erreur");

    }

};

export async function RegisterDao(body: IUserRegister) {
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

        let registerData = {
            dataUser: realData,
            code: data.status
        }

        if (data.status === 200 && registerData.dataUser) {
            console.log('======success=======');
            return registerData;
        } else {
            await routeService(data.status);
            return registerData
        }

    } catch (error) {

        console.error('======failure=======');
        console.error(error);

        throw new Error("Erreur");

    }
};

export async function InformationMeDao(token: string) {
    console.log("InformationMeDao()");

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
        let userData = {
            dataUser: realData,
            code: data.status
        }

        if (userData.code === 200 && realData) {
            console.log('======success=======');
            return userData;
        } else {
            await routeService(data.status);
        }

    } catch (error) {

        console.error('======failure=======');
        console.error(JSON.stringify(error));

        throw new Error("Erreur");

    }

};

export async function UpdateInformation(token: string, body: IUserUpdateInformation) {
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
                'Authorization': 'bearer ' + token
            },
        })

        const realData = await data.json();
        let modifyData = {
            dataUser: realData,
            code: data.status
        }
        if (data.status === 200 && realData) {
            console.log('======success=======');
            return modifyData;
        } else {
            await routeService(data.status);
            return modifyData
        }

    } catch (error) {

        console.error('======failure=======');
        console.error(error);

        throw new Error("Erreur");

    }


};

