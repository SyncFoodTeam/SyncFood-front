import Header from '../../component/header/header';
import Loader from '../../component/loader/loader';
import Menu from '../../component/menu/menu';
import IUser from '../../interface/auth.interface';
import { InformationMe } from '../../service/auth.service';
import GroupsMainview from '../groups/mainview/groupsMainview';
import './home.css';
import React, { useEffect, useState } from 'react'


function Home() {

    const [informationMe, setInformationMe] = useState<IUser>({});
    const [error, setError] = useState(false);
    const [isReady, setIsReady] = useState(false);


    useEffect(() => {
        setIsReady(false);
        getInfo();
        setIsReady(true);
    }, []);

    async function getInfo() {
        let user = await InformationMe();

        if (user?.code === 200 && user?.data) {
            setError(false);
            setInformationMe(user.data);
        } else {
            setError(true);
        }
    }

    return (
        <div className="App">

            {isReady &&
                <div>

                    <Header barCodeScannerIsTrue={true} />


                    <h2>Bonjour {informationMe?.userName}</h2>

                    <GroupsMainview />

                    <Menu />
                </div>
            }
            {!isReady &&
                <Loader />
            }
            {error &&
                <h4 className='errorMessage'>Erreur lors du chargement du profil</h4>
            }
        </div>


    );
}

export default Home;
