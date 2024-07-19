import { useEffect, useState } from 'react';
import { baseURL } from '../helpers/defaults';
import { fetchGet } from '../helpers/fetchHelpers';
import { changeStatusOfArchiveWithTimeout } from '../helpers/cardHelpers.js';

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
            updateListOfAllActivities([...listOfAllActivities, ...listOfReturnedActivities]);
        });
    }, []);

    const handleArchiveAll = () => {
        for(const activity of listOfAllActivities) {
            let activityId = activity.id;

            changeStatusOfArchiveWithTimeout(updateListOfAllActivities, activityId, true, 0); //waits for a certain amount of time before setting the new variables to allow for the animation to play
        }
    }

    return(
        <>
            {
                listOfAllActivities.filter((val) => !val.is_archived).length > 0 ? (
                    <>
                        <section id="activity-section">
                            {
                                listOfAllActivities.filter((val) => !val.is_archived).map((item) => {
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

export default Activity;