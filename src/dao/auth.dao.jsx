import React, { useEffect } from 'react';

export async function Login(body) {
    console.log("Login()");
    console.log("Route de le login des utilisateurs");

    fetch('/api/User/login', {
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
        .then(resp => {
            console.log(resp);
            console.log('======success=======');
        })
        .catch(err => {
            console.log('======failure=======');
            console.log(err);
        });
};

export async function Register(body) {
    console.log("Register()");
    console.log("Route de register des utilisateurs");

    fetch('/api/User/register', {
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
        .then(resp => {
            console.log(resp);
            console.log('======success=======');
        })
        .catch(err => {
            console.log('======failure=======');
            console.log(err);
        });
};

