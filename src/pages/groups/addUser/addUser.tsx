import ErrorComponent from '../../../component/error/errorComponent';
import IError from '../../../interface/error.interface';
import { searchUserForAddGroupeService } from '../../../service/groupe.service';
import './addUser.css';
import React, { useEffect, useState } from 'react'



function AddUser() {

    const [user, setUser] = useState('');
    const [error, setError] = useState<IError>({});
    const regex = /#\w{4}/;
    const [addError, setaddError] = useState(false);

    useEffect(() => {
        if (regex.test(user)) {
            let token = JSON.parse(localStorage.getItem('token'));
            searchUserForAddGroupeService(token, user)
                .then((users) => {
                    if (users) {
                        console.warn(users);

                        if (users?.code === 200) {
                            console.log("Toute les donnéees sont OK donc je redirige l'utilisateur");
                            setaddError(false);
                        } else {
                            console.log("Erreur lors de la connexion");
                            setaddError(true);
                            setError(users.dataUser);
                        }
                    } else {
                        console.log("nom invalide");
                    }

                }).catch((error) => {
                    console.error("Erreur lors de la recherche de l'utilisateur :", error);
                });
        } else {
            console.warn("Il n'y a pas de discriminant");
            console.log(user);
        }
    }, [user])

    const handleChange = async (event) => {
        // 👇 Get input value from "event"
        setUser(event.target.value);
    };


    return (
        <div>
            <label>Ajout d'un utilisateur</label>
            <input type="text" name="addUser" onChange={handleChange} className='inputs'></input>

            {error && 
                <ErrorComponent name={error.name} value={error.value} resourceNotFound={error.resourceNotFound} searchedLocation={error.searchedLocation} />
            }

        </div>


    );
}

export default AddUser;
