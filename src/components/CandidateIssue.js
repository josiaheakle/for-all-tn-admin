
// react/ visual methods
import {toast} from 'react-toastify';
import { useContext, useEffect, useState } from "react";

// fetch
import axios from "axios"

// components
import OpinionOption from "./OpinionOption.js"

// modules
import UserHandler from "../modules/UserHandler.js"
import { LoaderContext } from './Loader.js';

const CandidateIssue = (props) => {

    // props - cId, issue 
    //          { issue (title, description), view (leans yes...)}

    const [ candView, setCandView ] = useState(undefined)

    const { isLoading, updateIsLoading } = useContext(LoaderContext); 

    const updateCandidateView = async (opinionStr) => {
        updateIsLoading(true)
        const options = {
            url: `${process.env.REACT_APP_API_URL}/update/opinion`,
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            data: {
                candidate: props.cId,
                issue: props.issue.issue._id,
                opinion: opinionStr,
                user: UserHandler.getCurrentUser()._id
            }
        }
        const res = await axios(options)
        toast(res.data.message)
        if(res.data.type === 'SUCCESS') {
            setCandView(opinionStr)
        }
        updateIsLoading(false)
    }

    useEffect(() => {
        setCandView(props.issue.view)
    }, [])

    return(
        <div className='single-issue-opinion-container' >
            <span className='candidate-issue'> {(props.issue.issue)?`${props.issue.issue.title}`:''} </span>
            <div className='candidate-opinion-options'>
                {(props.issue.issue)?
                    <form className='candidate-issue-form'>

                        <OpinionOption updateView={updateCandidateView} opinion='yes' cId={props.cId} initSelected={(candView==='Yes')?true:false} issue={props.issue} ></OpinionOption>
                        <OpinionOption updateView={updateCandidateView} opinion='leans-yes' cId={props.cId} initSelected={(candView==='Leans Yes')?true:false} issue={props.issue} ></OpinionOption>
                        <OpinionOption updateView={updateCandidateView} opinion='neutral' cId={props.cId} initSelected={(candView==='Neutral')?true:false} issue={props.issue} ></OpinionOption>
                        <OpinionOption updateView={updateCandidateView} opinion='leans-no' cId={props.cId} initSelected={(candView==='Leans No')?true:false} issue={props.issue} ></OpinionOption>
                        <OpinionOption updateView={updateCandidateView} opinion='no' cId={props.cId} initSelected={(candView==='No')?true:false} issue={props.issue} ></OpinionOption>
                        <OpinionOption updateView={updateCandidateView} opinion='sponsor' cId={props.cId} initSelected={(candView==='Sponsor')?true:false} issue={props.issue} ></OpinionOption>
                        <OpinionOption updateView={updateCandidateView} opinion='unknown' cId={props.cId} initSelected={(candView==='Unknown')?true:false} issue={props.issue} ></OpinionOption>

                    </form>
                :null}
            </div>
        </div>

    );
}

export default CandidateIssue;