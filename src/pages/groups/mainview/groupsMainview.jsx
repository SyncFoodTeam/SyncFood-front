import { GetGroupService } from '../../../service/groupe.service';
import './groupsMainview.css';
import React, { useState, useEffect } from 'react'
import moment from 'moment';

function GroupsMainview() {

    const [groups, setGroups] = useState([]);


    useEffect(() => {
        getGroup();
    }, []);

    async function getGroup() {
        console.log("getGroup()");
        let myGroups = await GetGroupService();
        setGroups(myGroups);
    }



    return (
        <div>

            <h3>Mes groupes :</h3>

            <div>
                {groups.map((group, index) => (
                    <div key={index}>
                        <div>
                            <div>
                                <h5>Nom : {group.name} </h5>
                                <h5>Description : {group.description} </h5>
                                <h5>Date de Création : {moment(group.creationDate).format("YYYY/MM/DD kk:mm:ss")} </h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    );
}

export default GroupsMainview;
