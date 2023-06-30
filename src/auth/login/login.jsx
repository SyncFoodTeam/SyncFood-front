import './login.css';
import React, { useState, useEffect } from 'react'
import Header from '../../header/header';

function Login() {

    // Test api
    useEffect(() => {
        fetch('/api/User/register',{
            method: 'POST',
            body: JSON.stringify({
                userName: "Jeanbon",
                email: "Jeanbon@mail.com",
                password: "ThomasEstGros"
            }),
            headers:{
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
      }, [])

    const [mailAddress, setMailAddress] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // console.log(mailAddress);
        // console.log(password);

        console.log(event);

        // try catch pour tester la route de connexion
    };

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={false} />

            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Adresse Mail :</label>
                        <br/>
                        <input type="text" name="mailAddress" required onChange={(e) => setMailAddress(e.target.value)}></input>
                    </div>
                    <br/>
                    <div>
                        <label>Mot de passe :</label>
                        <br/>
                        <input type="password" name="password" required onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <div>
                        <button type="submit">Connexion</button>
                    </div>
                </form>
                <div>
                    <p>Pas de compte ? </p><strong>Créez en un ici</strong>
                </div>
            </div>

        </div>


    );
}

export default Login;
