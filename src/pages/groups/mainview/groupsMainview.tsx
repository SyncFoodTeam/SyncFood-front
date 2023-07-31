import { GetGroupsService } from '../../../service/groupe.service';
import './groupsMainview.css';
import React, { useState, useEffect } from 'react'
import moment from 'moment';
import NoDataComponent from '../../../component/noData/noData';
import IGroups from '../../../interface/groups/groups.interface';
import IError from '../../../interface/error.interface';
import ErrorComponent from '../../../component/error/errorComponent';

function GroupsMainview() {

    const [groups, setGroups] = useState<IGroups[]>([]);
    const [noData, setNoData] = useState(false);
    const [groupsError, setGroupsError] = useState(false);
    const [error, setError] = useState<IError>({});

    useEffect(() => {
        getGroups();
    }, []);

    async function getGroups() {
        console.log("getGroups()");
        let myGroups = await GetGroupsService();

        if (myGroups && myGroups.length > 0) {
            console.log("j'ai des data:")
            setGroups(myGroups);
            setNoData(false);
            setGroupsError(false);
        } if (myGroups.length === 0) {
            setNoData(true);
            setGroupsError(false);
        } else {
            setGroupsError(true);
            setError(myGroups)
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
                <NoDataComponent />
            }

            {error &&
                <ErrorComponent name={error.name} value={error.value} resourceNotFound={error.resourceNotFound} searchedLocation={error.searchedLocation} />

            }
        </div>


    );
}

export default GroupsMainview;
