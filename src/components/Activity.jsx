import { useEffect, useState } from 'react';
import { baseURL } from '../helpers/defaults';
import { fetchGet } from '../helpers/fetchHelpers';

import Cards from './Cards.jsx';
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
        })
    }, []);

    return(
        <section id="activity-section">
            {
                listOfAllActivities.map((item) => {
                    const itemProps = {
                        "callType": item.call_type,
                        "direction": item.direction,
                        "duration": item.duration,
                        "from": item.from,
                        "to": item.to,
                        "createdAt": item.created_at
                    }

                    return(
                        <section className="card-container" key={item.id}>
                            <Cards {...itemProps} />
                        </section>
                    )
                })
            }
        </section>
    )
}

export default Activity;