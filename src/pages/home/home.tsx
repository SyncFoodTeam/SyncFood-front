import { useNavigate } from 'react-router-dom';
import Header from '../../component/header/header';
import Menu from '../../component/menu/menu';
import IUser from '../../interface/auth.interface';
import { InformationMe } from '../../service/auth.service';
import GroupsMainview from '../groups/mainview/groupsMainview';
import './home.css';
import React, { useEffect, useState } from 'react'
import Loader from '../../component/loader/loader';


function Home() {
    const navigate = useNavigate()
    const [informationMe, setInformationMe] = useState<IUser>({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Init();        
            setLoading(false);
        };

        fetchData();
    }, []);


    async function Init() {
    
        let token = localStorage.getItem('token');

        if(token){
            await getInfo();
        }else{
            console.log("Il n'y a pas de token donc je redirige vers la lunchPage");
            navigate('/lunchPage');
        }
    }

    async function getInfo() {
        let user = await InformationMe();
        console.log({user});
        if (user?.code === 200 && user?.dataUser) {
            setError(false);
            setInformationMe(user.dataUser);
        } else {
            setError(true);
        }
    }

    return (
        <div className="App">

            {!loading &&
                <div>

                    <Header barCodeScannerIsTrue={true} />


                    <h2>Bonjour {informationMe?.userName}</h2>

                    <GroupsMainview />

                    <Menu />
                </div>
            }
            {loading &&
                <Loader />
            }
            {error &&
                <h4 className='errorMessage'>Erreur lors du chargement du profil</h4>
            }
        </div>


    );
}

export default Home;
