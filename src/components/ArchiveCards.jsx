import { useState, useEffect } from 'react';

import '../css/cards.css';

import { IconButton } from '@material-ui/core';
import { PhoneMissed, PhoneCallback, PhoneForwarded, Unarchive } from '@material-ui/icons';
import { fetchPatch } from '../helpers/fetchHelpers';
import { baseURL } from '../helpers/defaults';

const ArchiveCards = (props) => {
    const { callType, direction, duration, from, to, createdAt, uniqueid } = props;
    const [cardIconToDisplay, updateCardIconToDisplay] = useState();
    const [dateString, updateDateString] = useState("");
    const [durationString, updateDurationString] = useState();

    useEffect(() => {
        setIconComponent();
        createDateString();
        createDurationString();
    }, [duration, direction]);

    /**
     * Creates a duration string in he format of ##:##:##
     */
    const createDurationString = async () => {
        let millisecondsToHours = Math.floor(parseInt(duration)/3600);
        let millisecondsToMinutes = Math.floor(parseInt(duration)/60);
        let millisecondsToSeconds = Math.floor(parseInt(duration)%60);

        const convertToStringAndPad = (val) => {
            return val.toString().padStart(2, '0');
        }

        updateDurationString(convertToStringAndPad(millisecondsToHours) + ":" + convertToStringAndPad(millisecondsToMinutes) + ":" + convertToStringAndPad(millisecondsToSeconds));
    }

    /**
     * Creates the date string in the format of ##/##
     */
    const createDateString = async () => {
        let d = new Date(createdAt);

        let day = d.getDay();
        let lastTwoNumbersOfYear = d.getFullYear().toString().substring(2);

        updateDateString(day + "/" + lastTwoNumbersOfYear);
    }

    /**
     * Sets the icon for the activity if it bounced, went through was was received
     */
    const setIconComponent = async () => {
        if(parseInt(duration) == 0) {
            updateCardIconToDisplay(<PhoneMissed />);
            return;
        }

        if(direction == "inbound") {
            updateCardIconToDisplay(<PhoneCallback />);
        } else { //outbound
            updateCardIconToDisplay(<PhoneForwarded />)
        }
    }

    const handleUnarchiveClick = (e) => {
        const currentTargetId = e.currentTarget.id;
        
        fetchPatch(baseURL + "/activities/" + currentTargetId, {
            "method": "PATCH",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify({ is_archived: false })
        })
    }

    return(
        <section className="inner-card-container">
            <section className="card">
                <section className="card-icon">
                    {cardIconToDisplay}
                </section>

                <section className="card-status">
                    <section className="card-to-person">
                        <strong className="fontSizeL">{direction == "inbound" ? from : to}</strong>
                    </section>
                    <section className="card-to-calltype">
                        {callType}
                    </section>
                </section>

                <section className="card-call-information">
                    <section className="card-call-date">
                        {dateString}
                    </section>
                    <section className="card-call-duration">
                        {durationString}
                    </section>
                </section>
            </section>

            <div className="line"></div>

            <section className="card">
                <section className="card-icon">
                    <IconButton onClick={handleUnarchiveClick} style={{ color: '#2AC420' }} id={uniqueid}>
                        <Unarchive />
                    </IconButton>
                </section>
            </section>
        </section>
    )
}

export default ArchiveCards;