import axios from "axios";
const DataHandler = (() => {

    let _sens = undefined;
    let _reps = undefined;
    let _issues = undefined;

    const importAllSens = async () => {
        const options = {
            url: `${process.env.REACT_APP_API_URL}/get/candidates/senators`,
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios(options)
        _sens = res.data;
    }

    const importAllReps = async () => {
        const options = {
            url: `${process.env.REACT_APP_API_URL}/get/candidates/representatives`,
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios(options)
        _reps = res.data;
    }

    const requestUpdate = async () => {
        const options = {
            url: `${process.env.REACT_APP_API_URL}/update/all`,
            mode: 'cors',
            method: 'GET'
        }
        const res = await axios(options)
        return res
    }

    const getSens = async (update) => {
        if(_sens === undefined || update === true) {
            await importAllSens()
            return _sens
        } else {
            return _sens
        }
    }

    const getReps = async (update) => { 
        if(_reps === undefined || update === true) {
            await importAllReps()
            return _reps
        } else {
            return _reps
        }
    }

    const importAllIssues = async () => {
        const options = {
            url: `${process.env.REACT_APP_API_URL}/get/issues`,
            mode: 'cors',
            method: "GET"
        }
        const res = await axios(options)
        _issues = res.data;
    }

    const getIssues = async (update) => {
        if(_issues === undefined || update) {
            await importAllIssues()
            return _issues
        } else {
            return _issues
        }
    }

    return {
        // candidates
        getSens, getReps,
        // api call
        requestUpdate,
        // issues 
        getIssues,


    }

})();

export default DataHandler;