import { useLocation } from 'react-router-dom';
import Header from '../../../component/header/header';
import './modifyContainer.css';
import React, { useEffect, useState } from 'react'
import Menu from '../../../component/menu/menu';
import IFoodContainers from '../../../interface/container/foodContainer.interface';
import { useNavigate } from "react-router-dom";
import DeleteModal from '../../../component/deleteModal/deleteModal';
import { GetContainerService, UpdateContainerService } from '../../../service/container.service';
import IUserPublic from '../../../interface/auth.interface';
import { InformationMe } from '../../../service/auth.service';


function ModifyContainer() {
    const navigate = useNavigate();
    const [noData, setNoData] = useState(false);
    const [user, setUser] = useState<IUserPublic>({});
    const [container, setContainer] = useState<IFoodContainers>({});
    const location = useLocation();
    const [containerName, setContainerName] = useState('');
    const [containerDescription, setContainerDescription] = useState('');

    const id = location.state?.id;

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                await getContainer(id);
                const userData = await InformationMe();
                setUser(userData.dataUser);
            } else {
                console.log("Je n'ai pas d'id");
            }
        };

        fetchData();
    }, []);

    async function getContainer(containerId: number) {
        console.log("getContainer(containerId)");
        let myContainers = await GetContainerService(containerId);

        if (myContainers) {
            console.log("j'ai des data:")
            setContainer(myContainers);
            setNoData(false);
        } else {
            setNoData(true);
        }
    }

    const modifyContainer = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        let body = {
            id: container?.id,
            name: containerName || container?.name,
            description: containerDescription,
        };

        console.log("J'envoie mes données à la route adéquat");
        let updateSuccess = await UpdateContainerService(body);
        console.log(updateSuccess);
        if (updateSuccess) {
            navigate(-1);
        } else {
            console.log("Erreur lors de la connexion");
        }
    }

    return (
        <div className="App">

            <Header />

            <h1>Modify Container Page</h1>

            <div>
                <label className="label">Nom du container :</label>
                <br />
                <input type="text" name="text"
                    defaultValue={container.name}
                    onChange={(e) => setContainerName(e.target.value)}
                ></input>
            </div>
            <div>
                <label className="label">Description :</label>
                <br />
                <input type="text" name="text"
                    defaultValue={container.description}
                    onChange={(e) => setContainerDescription(e.target.value)}
                ></input>
            </div>
            <button onClick={modifyContainer}>Modifier</button>

            <DeleteModal containerId={container.id} whatIs={'container'}></DeleteModal>

            <Menu />
        </div>


    );
}

export default ModifyContainer;
