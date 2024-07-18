import { useEffect, useState } from 'react';
import { baseURL } from '../helpers/defaults';
import { fetchGet, fetchPatch } from '../helpers/fetchHelpers';

import ActivityCards from './ActivityCards.jsx';
import { Archive } from '@material-ui/icons';
import '../css/activity.css';

const Activity = () => {
    const [listOfAllActivities, updateListOfAllActivities] = useState([]);

    useEffect(() => {
        const allActivitiesURL = baseURL + '/activities';
        const opts = {
            'Content-Type': 'application/json'
        }

        let promisedListOfReturnedActivities = fetchGet(allActivitiesURL, opts);

        promisedListOfReturnedActivities.then((listOfReturnedActivities) => { //once the promise is resolved then we set the local state to the returned activities
            let filteredListOfReturnedActivities = listOfReturnedActivities.filter((val) => !val.is_archived);

            updateListOfAllActivities([...listOfAllActivities, ...filteredListOfReturnedActivities]);
        })
    }, []);

    const handleArchiveAll = () => {
        for(const activity of listOfAllActivities) {
            let activityId = activity.id;

            fetchPatch(baseURL + "/activities/" + activityId, {
                "method": "PATCH",
                "headers": { "Content-type": "application/json" },
                "body": JSON.stringify({ "is_archived": true })
            })
        }
    }

    return(
        <>
            <section id="activity-section">
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
                                <ActivityCards {...itemProps} />
                            </section>
                        )
                    })
                }
            </section>
            <button className="archive-all-button" onClick={handleArchiveAll}>
                <Archive />
                <span className="text-center">Archive all</span>
            </button>
        </>
    )
}

export default Activity;