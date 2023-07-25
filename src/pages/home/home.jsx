import Header from '../../component/header/header';
import Menu from '../../component/menu/menu';
import { InformationMe } from '../../service/auth.service';
import GroupsMainview from '../groups/mainview/groupsMainview';
import './home.css';
import React, { useEffect, useState } from 'react'


function Home() {
    const [informationMe, setInformationMe] = useState({});


    useEffect(() => {
        getInfo();
    }, []);

    async function getInfo() {
        let user = await InformationMe();
        setInformationMe(user);
    }

    return (
        <div className="App">

            <Header barCodeScannerIsTrue={true} />

            <h2>Bonjour {informationMe?.userName}</h2>

            <GroupsMainview />

            <Menu />
        </div>


    );
}

export default Home;
