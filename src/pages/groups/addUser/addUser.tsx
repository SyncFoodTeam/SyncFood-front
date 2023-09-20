import { useTranslation } from 'react-i18next';
import ErrorComponent from '../../../component/error/errorComponent';
import IUserPublic from '../../../interface/auth.interface';
import IError from '../../../interface/error.interface';
import { searchUserForAddGroupeService, addUserToGroupService } from '../../../service/groupe.service';
import './addUser.css';
import React, { useEffect, useState } from 'react'

interface Props {
    idGroup: number;
}

function AddUser({ idGroup }: Props) {

    const [user, setUser] = useState('');
    const [error, setError] = useState<IError>({});
    const regex = /#\w{4}/;
    const [addError, setaddError] = useState(false);
    const [unlockAddUserButton, setUnlockAddUserButton] = useState(false);
    // let UserToAdd;
    const [userToAdd, setUserToAdd] = useState<IUserPublic>({});
    const [usersTab, setUsersTab] = useState([]);
    const { t } = useTranslation();


    useEffect(() => {
        // Test avec la regex pour savoir s'il y a tout le code qui est rentré
        if (regex.test(user)) {
            let token = JSON.parse(localStorage.getItem('token'));
            // Va chercher dans la BDD une correspondance
            searchUserForAddGroupeService(token, user)
                .then((users) => {
                    if (users) {
                        console.warn(users);

                        if (users?.code === 200) {
                            setUserToAdd(users.dataUser);
                            setaddError(false);
                            setUnlockAddUserButton(true);
                        } else {
                            console.log("Erreur lors de la connexion");
                            setaddError(true);
                            setError(users.dataUser);
                            setUnlockAddUserButton(false);
                        }
                    } else {
                        console.log("nom invalide");
                        setUnlockAddUserButton(false);
                    }

                }).catch((error) => {
                    console.error("Erreur lors de la recherche de l'utilisateur :", error);
                });
        } else {
            console.warn("Il n'y a pas de discriminant");
            console.log(user);
        }
    }, [user])

    const AddUserToGroup = async (event: React.MouseEvent<HTMLElement>) => {

        let token = JSON.parse(localStorage.getItem('token'));
        addUserToGroupService(token, idGroup, userToAdd?.id)
            .then((usersInGroup) => {
                if (usersInGroup) {

                    if (usersInGroup?.code === 200) {
                        console.log("Ajout réussi");
                    } else {
                        console.error("Erreur lors de l'ajout de l'utilisateur au groupe");
                        setaddError(true);
                        setError(usersInGroup.groupData);
                    }
                }

            }).catch((error) => {
                console.error("Erreur lors de la recherche de l'utilisateur :", error);
            });


    };

    const handleChange = async (event) => {
        // 👇 Get input value from "event"
        setUser(event.target.value);
    }


    return (
        <div>
            <label>{t('Add User')}</label>
            <input type="text" name="addUser" placeholder='Rechercher' onChange={handleChange} className='addUserInput'></input>
            {unlockAddUserButton &&
                <button onClick={AddUserToGroup} className='addUser'><i className="fa-solid fa-user-plus"></i></button>
            }

            <ul>
                {usersTab.map((user, index) => (
                    <li key={index}>{user.userName}#{user.discriminator} <button>{t('Remove')}</button></li>
                ))}
            </ul>

            {error &&
                <ErrorComponent name={error.name} value={error.value} resourceNotFound={error.resourceNotFound} searchedLocation={error.searchedLocation} />
            }

        </div>


    );
}

export default AddUser;
