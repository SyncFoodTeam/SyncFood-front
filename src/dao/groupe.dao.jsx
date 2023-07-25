export async function CreateGroupDao(body, token) {
    console.log("CreateGroupDao(body, token");

    console.log(body);

    const data = await fetch('/api/groups/create', {
        method: 'POST',
        body: JSON.stringify({
            Name: body.Name,
            description: body.description,
            // budget: body.budget
        }),
        headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
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

export async function GetGroupDao(token) {
    console.log("GetGroupDao(token");

    const data = await fetch('/api/groups/mine', {
        method: 'GET',
        headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
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

