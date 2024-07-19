/**
 * A generic method to help get data from an api
 * 
 * @param {*} url the string representation of a url
 * @param {*} opt optional option argument
 * 
 */
const fetchGet = async (url, opt = {}) => {
    try {
        let response = await fetch(url, opt);

        if(!response.ok) throw new Error("There was an issue retrieving the activities");

        const json = await response.json();

        console.log(json);

        return json;
    }
    catch (err) {
        console.log(err);
        return [];
    }
}

const fetchPatch = async(url, opt = {}) => {
    try {
        let response = await fetch(url, opt);

        if(!response.ok) throw new Error("There was an error updating the activities");

        const text = await response.text();

        console.log(text);

        return;
    }
    catch(err) {
        console.log(err);
    }
}

export { fetchGet, fetchPatch }