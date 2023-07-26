import { GetGroupService } from '../../../service/groupe.service';
import './groupsMainview.css';
import React, { useState, useEffect } from 'react'
import moment from 'moment';
import IGroups from '../../../interface/groups.interface';

function GroupsMainview() {

    const [groups, setGroups] = useState<IGroups[]>([]);
    const [noData, setNoData] = useState(false);


    useEffect(() => {
        getGroup();
    }, []);

    async function getGroup() {
        console.log("getGroup()");
        let myGroups = await GetGroupService();

        console.log(myGroups);

        if (myGroups.length > 0) {
            console.log("j'ai des data:")
            setNoData(false);
            setGroups(myGroups);

            console.log({ groups });
        } else {
            setNoData(true);
        }
    }



    return (
        <div>

            <h3>Mes groupes :</h3>

            {!noData &&
                <div>
                    {groups.map((group: IGroups, index: number) => (
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
            }
            {noData &&
                <h4 className='errorMessage'>
                    Erreur
                </h4>
            }
        </div>


    );
}

export default GroupsMainview;
