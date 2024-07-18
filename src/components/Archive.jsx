import { useEffect, useState } from 'react';
import { baseURL } from '../helpers/defaults';
import { fetchGet } from '../helpers/fetchHelpers';

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

    return(
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
    )
}

export default Archive;