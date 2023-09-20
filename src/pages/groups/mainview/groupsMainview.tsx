import { GetGroupsService } from '../../../service/groupe.service';
import './groupsMainview.css';
import React, { useState, useEffect } from 'react'
import moment from 'moment';
import NoDataComponent from '../../../component/noData/noData';
import IGroups from '../../../interface/groups/groups.interface';
import IError from '../../../interface/error.interface';
import ErrorComponent from '../../../component/error/errorComponent';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function GroupsMainview() {

    const [groups, setGroups] = useState<IGroups[]>([]);
    const [noData, setNoData] = useState(false);
    const [groupsError, setGroupsError] = useState(false);
    const [error, setError] = useState<IError>({});

    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 3;
    const navigate = useNavigate();
    const { t } = useTranslation();

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

    const handleNextPage = () => {
        if (startIndex + itemsPerPage < groups.length) {
            setStartIndex(startIndex + itemsPerPage);
        }
    };

    const handlePreviousPage = () => {
        if (startIndex - itemsPerPage >= 0) {
            setStartIndex(startIndex - itemsPerPage);
        }
    };

    const goToGroup = async (id: number) => {

        console.log(id);
        navigate('/groupDetails/', { state: { id } });
    }


    return (
        <div>

            <h3>{t('My Groups')}</h3>

            {!noData &&
                <div className="groupsCards">
                    {groups.slice(startIndex, startIndex + itemsPerPage).map((group, index) => (
                        <div key={index}>
                            <div className='groupCard' onClick={() => goToGroup(group.id)}>
                                <div className='groupName'>
                                    <div>{group.name}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="paginationButtons">
                        {startIndex > 0 && (
                            <button onClick={handlePreviousPage} className="paginationButtonsPrevious">
                                <i className="fa-solid fa-chevron-left"></i>
                            </button>
                        )}
                        {startIndex + itemsPerPage < groups.length && (
                            <button onClick={handleNextPage} className="paginationButtonsNext">
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        )}
                    </div>
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
