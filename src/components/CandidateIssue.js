import { useEffect } from "react";
import axios from "axios"


const CandidateIssue = (props) => {

    // props - cId, issue 
    //          { issue (title, description), view (leans yes...)}


    const updateCandidateView = async (e) => {

        console.log(e.target.value)

        const options = {
            url: 'http://localhost:4000/update/opinion',
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            data: {
                candidate: props.cId,
                issue: props.issue.issue._id,
                opinion: e.target.value
            }
        }

        const res = await axios(options)
        console.log(res)

    }

/*

checked={(props.issue.view === 'No')?'true':'false'}

*/

    useEffect(() => {

        let view = props.issue.view
        view = view.split(' ')
        if(view.length > 1) {
            view = `${view[0]}${view[1]}` 
        } else {
            view = view[0]
        }

        const btn = document.getElementById(`${view}-${props.cId}-${props.issue.issue.title}`)
        // if(btn) {
            btn.checked = true;
        // }
    }, [])


    return(
        <div className='single-issue-opinion-container' >
            <span className='candidate-issue'> {(props.issue.issue)?`${props.issue.issue.title}`:''} </span>
            <div className='candidate-opinion-options'>

            {(props.issue.issue)?
                <form onChange={updateCandidateView} className='candidate-issue-form'>
                    
                    <input type='radio' value="Yes" id={`Yes-${props.cId}-${props.issue.issue.title}`} name="candidate-opinion"  ></input>
                    <label htmlFor={`Yes-${props.cId}-${props.issue.issue.title}`}>Yes</label>
                    <input type='radio' value="Leans Yes" id={`LeansYes-${props.cId}-${props.issue.issue.title}`} name="candidate-opinion" ></input>
                    <label htmlFor={`LeansYes-${props.cId}-${props.issue.issue.title}`}>Leans Yes</label>
                    <input type='radio' value="Neutral" id={`Neutral-${props.cId}-${props.issue.issue.title}`} name="candidate-opinion" ></input>
                    <label htmlFor={`Neutral-${props.cId}-${props.issue.issue.title}`}>Neutral</label>
                    <input type='radio' value="Leans No" id={`LeansNo-${props.cId}-${props.issue.issue.title}`} name="candidate-opinion"  ></input>
                    <label htmlFor={`LeansNo-${props.cId}-${props.issue.issue.title}`}>Leans No</label>
                    <input type='radio' value="No" id={`No-${props.cId}-${props.issue.issue.title}`} name="candidate-opinion"  ></input>
                    <label htmlFor={`No-${props.cId}-${props.issue.issue.title}`}>No</label>

                </form>
            :null}
                

                {/* <span className={`candidate-opinion ${(props.issue.view === 'Yes')?'selected':''}`}> Yes </span>
                <span className={`candidate-opinion ${(props.issue.view === 'Leans Yes')?'selected':''}`}> Leans Yes </span>
                <span className={`candidate-opinion ${(props.issue.view === 'Neutral')?'selected':''}`}> Neutral </span>
                <span className={`candidate-opinion ${(props.issue.view === 'Leans No')?'selected':''}`}> Leans No </span>
                <span className={`candidate-opinion ${(props.issue.view === 'No')?'selected':''}`}> No </span> */}
            </div>
        </div>

    );
}

export default CandidateIssue;