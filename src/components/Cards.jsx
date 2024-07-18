import { useState, useEffect } from 'react';

import '../css/cards.css';

import { PhoneMissed, PhoneCallback, PhoneForwarded } from '@material-ui/icons';

const Cards = (props) => {
    const { callType, direction, duration, from, to, createdAt } = props;
    const [cardIconToDisplay, updateCardIconToDisplay] = useState();

    useEffect(() => {
        if(parseInt(duration) == 0) {
            updateCardIconToDisplay(<PhoneMissed />);
            return;
        }

        if(direction == "inbound") {
            updateCardIconToDisplay(<PhoneCallback />);
        } else { //outbound
            updateCardIconToDisplay(<PhoneForwarded />)
        }
    }, [duration, direction]);

    return(
        <section className="card">
            <section className="card-icon">
                {cardIconToDisplay}
            </section>

            <section className="card-status">
                <section className="card-to-persson">
                    {direction == "inbound" ? from : to}
                </section>
                <section className="card-to-calltype">
                    {callType}
                </section>
            </section>

            <section className="card-call-information">
                <section className="card-call-duration">
                    {duration}
                </section>
                <section className="card-call-date">
                    {createdAt}
                </section>
            </section>
        </section>
    )
}

export default Cards;