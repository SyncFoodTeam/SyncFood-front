export async function LoginDao(body) {
    console.log("LoginDao()");
    console.log("Route de login des utilisateurs");

    const data = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
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

export async function RegisterDao(body) {
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

    console.log(data);

    if (data.ok) {
        console.log('======success=======');
        return data.json();
    } else {
        console.log('======failure=======');
        return undefined;
    }
};

export async function InformationMeDao(token) {
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

