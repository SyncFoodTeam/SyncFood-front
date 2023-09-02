import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../../component/header/header';
import './containerDetails.css';
import React, { useState, useEffect } from 'react'
import Menu from '../../../component/menu/menu';
import IUserPublic from '../../../interface/auth.interface';
import { InformationMe } from '../../../service/auth.service';
import IFoodContainers from '../../../interface/container/foodContainer.interface';
import { GetContainerService } from '../../../service/container.service';


function ContainerDetails() {
    const [user, setUser] = useState<IUserPublic>({});
    const [container, setContainer] = useState<IFoodContainers>({});
    const [noData, setNoData] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

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
            console.log({ container });
            setNoData(false);
        } else {
            setNoData(true);
        }
    }

    const modifyContainers = async (id: number) => {

        navigate('/modifyContainers', { state: { id } });
    }


    return (
        <div className="App">

            <Header />


            <h1>Container Page Details</h1>

            <button>Ajouter un produit</button>

            {/* {(container.=== user?.id) &&
                <button onClick={() => modifyContainers(container.id)}>Modifier</button>
            } */}
            <Menu />
        </div>


    );
}

export default ContainerDetails;
