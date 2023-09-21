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
import { useTranslation } from 'react-i18next';
import Loader from '../../../component/loader/loader';
import DateFormater from '../../../pipe/dateFormater';
import GoBack from '../../../component/goBack/goBack';


function ModifyContainer() {
    const navigate = useNavigate();
    const [noData, setNoData] = useState(false);
    const [user, setUser] = useState<IUserPublic>({});
    const [container, setContainer] = useState<IFoodContainers>({});
    const location = useLocation();
    const [containerName, setContainerName] = useState('');
    const [containerDescription, setContainerDescription] = useState('');
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);

    const id = location.state?.id;

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                setLoading(true)
                await getContainer(id);
                const userData = await InformationMe();
                setUser(userData.dataUser);
                setLoading(false);
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

            {!loading &&
                <Header />
            }
            {!loading &&
                <div>
                    <GoBack name={t('Modify Container Page')}/>
                </div>

            }

            {!loading &&
                <div className='modifyCard'>
                    <div className="modifyDiv">
                        <label>{t('Name of Food Container')} :</label>
                        <br />
                        <input type="text" name="text"
                            defaultValue={container.name}
                            onChange={(e) => setContainerName(e.target.value)}
                            className='modifyInput'
                        ></input>
                    </div>
                    <div className="modifyDiv">
                        <label>{t('Description')} :</label>
                        <br />
                        <input type="text" name="text"
                            defaultValue={container.description}
                            onChange={(e) => setContainerDescription(e.target.value)}
                            className='modifyInput'
                        ></input>
                    </div>

                    <div className='creationDate'>
                        {t('Creation date')}: <DateFormater date={container.creationDate} />
                    </div>
                </div>
            }
            {loading &&
                <Loader />
            }

            <div className='divButton'>
                <div className='divButtonModifyGroups'>
                    <button onClick={modifyContainer} className='modifyButton'>{t('Modify')}</button>
                </div>

                <div className='divButtonDelete'>
                    <DeleteModal containerId={container.id} whatIs={'container'}></DeleteModal>
                </div>

            </div>



            <Menu />
        </div>


    );
}

export default ModifyContainer;
