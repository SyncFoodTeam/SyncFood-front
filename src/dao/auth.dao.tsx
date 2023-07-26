import { routeService } from "../service/route.service";
import ICommonUser from "../interface/common.interface";

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

        if (loginData.data) {
            console.log('======success=======');
            return loginData;
        } else {
            console.log('======failure=======');
            return loginData;
        }


    } catch (error) {

        console.error(error);

        throw new Error("Erreur");

    }

};

export async function RegisterDao(body: any) {
    console.log("RegisterDao()");
    console.log("Route de register des utilisateurs");

    const data = await fetch('/api/user/register', {
        method: 'POST',
        body: JSON.stringify({
            userName: body.username,
            email: body.email,
            password: body.password
        }),
        headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json'
        }
    })



    if (data.ok) {
        console.log('======success=======');
        return data.json();
    } else {
        console.log('======failure=======');
        return undefined;
    }
};

export async function InformationMeDao(token: string) {
    console.log("InformationMeDao()");

    const data = await fetch('/api/user/info/me', {
        method: 'GET',
        headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    })
    if (data.ok) {
        console.log('======success=======');
        return data.json();
    } else {
        console.log('======failure=======');
        return undefined;
    }
};

export async function UpdateInformation(token: string, body: any) {
    console.log("UpdateInformation()");

    const data = await fetch('/api/user/update/me', {
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
        }
    })
    if (data.ok) {
        console.log('======success=======');
        return data.json();
    } else {
        console.log('======failure=======');
        return undefined;
    }
};

