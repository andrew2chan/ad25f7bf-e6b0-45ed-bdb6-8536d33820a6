import { useEffect, useState } from 'react';
import { baseURL } from '../helpers/defaults';
import { fetchGet } from '../helpers/fetchHelpers';
import { changeStatusOfArchiveAll } from '../helpers/cardHelpers.js';
import { Unarchive } from '@material-ui/icons';

import ArchiveCards from './ArchiveCards.jsx';
import '../css/archive.css';

const Archive = () => {
    const [listOfAllActivities, updateListOfAllActivities] = useState([]);

    useEffect(() => {
        const allActivitiesURL = baseURL + '/activities';
        const opts = {
            'Content-Type': 'application/json'
        }

        let promisedListOfReturnedActivities = fetchGet(allActivitiesURL, opts);

        promisedListOfReturnedActivities.then((listOfReturnedActivities) => { //once the promise is resolved then we set the local state to the returned activities
            updateListOfAllActivities([...listOfAllActivities, ...listOfReturnedActivities]);
        })
    }, []);

    const handleUnarchiveAll = () => {
        changeStatusOfArchiveAll(updateListOfAllActivities);
    }

    return(
        <>
            {
                listOfAllActivities.filter((val) => val.is_archived).length > 0 ? (
                    <>
                        <section id="archive-section">
                            {
                                listOfAllActivities.filter((val) => val.is_archived).map((item) => {
                                    const itemProps = {
                                        "callType": item.call_type,
                                        "direction": item.direction,
                                        "duration": item.duration,
                                        "from": item.from,
                                        "to": item.to,
                                        "createdAt": item.created_at,
                                        "uniqueid": item.id,
                                        updateListOfAllActivities
                                    }

                                    return(
                                        <section className="card-container" key={item.id}>
                                            <ArchiveCards {...itemProps} />
                                        </section>
                                    )
                                })
                            }
                        </section>
                        <button className="unarchive-all-button" onClick={handleUnarchiveAll}>
                            <Unarchive />
                            <span className="text-center">Unarchive all</span>
                        </button>
                    </>
                ) :
                (
                    <>
                        <section className="no-content">
                            There is nothing here!
                        </section>
                    </>
                )
            }

        </>
    )
}

export default Archive;