import { useEffect, useState } from 'react';
import { baseURL } from '../helpers/defaults';
import { fetchGet, fetchPatch } from '../helpers/fetchHelpers';

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
            let filteredListOfReturnedActivities = listOfReturnedActivities.filter((val) => val.is_archived);

            updateListOfAllActivities([...listOfAllActivities, ...filteredListOfReturnedActivities]);
        })
    }, []);

    const handleUnarchiveAll = () => {
        for(const activity of listOfAllActivities) {
            let activityId = activity.id;
            document.getElementById("inner-card-container-" + activityId).classList.add("animate-to-remove");
        }

        fetchPatch(baseURL + "/reset", {
            "method": "PATCH",
            "headers": { "Content-type": "application/json" },
        })
    }

    return(
        <>
            <section id="archive-section">
                {
                    listOfAllActivities.map((item) => {
                        const itemProps = {
                            "callType": item.call_type,
                            "direction": item.direction,
                            "duration": item.duration,
                            "from": item.from,
                            "to": item.to,
                            "createdAt": item.created_at,
                            "uniqueid": item.id
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
    )
}

export default Archive;