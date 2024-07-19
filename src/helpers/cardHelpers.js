import { baseURL } from "./defaults.js";
import { fetchPatch } from "./fetchHelpers.js";

const ANIMATION_TIME = 500;

/**
 * Updates the archive status of the original list of activities and patches the server side as well
 * @param {*} updateCardsCallback callback that is used to update the original list of activities
 * @param {*} id the id that we want to update
 */
export const changeStatusOfArchiveWithTimeout = (updateCardsCallback, id, archiveStatus, duration = ANIMATION_TIME) => {
    setTimeout(async () => {
        updateCardsCallback((prevState) => {
            return prevState.map((activity) => {
                return activity.id == id ? {...activity, is_archived: archiveStatus} : activity
            })
        })

        await fetchPatch(baseURL + "/activities/" + id, {
            "method": "PATCH",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify({ is_archived: archiveStatus })
        })
    }, duration);
}

/**
 * Resets the unarchives back into their original state
 * @param {*} updateCardsCallback callback that is used to update the original list of activities
 */
export const changeStatusOfArchiveAll = (updateCardsCallback) => {
    updateCardsCallback((prevState) => {
        return prevState.map((activity) => {
            return { ...activity, is_archived: false }
        })
    })

    fetchPatch(baseURL + "/reset", {
        "method": "PATCH",
        "headers": { "Content-type": "application/json" },
    })
}