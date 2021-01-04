
// import repIcon from "https://foralltn.org/wp-content/uploads/2020/12/rep-icon.png"
// import demIcon from "https://foralltn.org/wp-content/uploads/2020/12/dem-icon.png"

import {useState, useEffect} from 'react'
import CandidateIssue from './CandidateIssue'

const Candidate = (props) => {

    // props - c(andidate)

    const [ editing, setEditing ] = useState(false)

    const editCandidate = (e) => {
        setEditing(true)
    }

/*
    if(c.party === "Republican")
        cParty.src = 'https://foralltn.org/wp-content/uploads/2020/12/rep-icon.png'
    else if(c.party === "Democratic") 
        cParty.src = 'https://foralltn.org/wp-content/uploads/2020/12/dem-icon.png'

*/

    return (
        <div className='Candidate'>
            <div id={`${props.c._id}`} className="candidate-container">

                <div className='candidate-information-container'>
                    <div className="candidate-sub-container">
                        <img src={`https://for-all-tn-api.herokuapp.com/proxy-img?url=${props.c.img}`} className="candidate-image" />
                    </div>
                    <div className="candidate-info">
                        <span className='candidate-name candidate-span'>{`${props.c.first_name} ${props.c.last_name}`}</span>
                        <span className="candidate-district candidate-span">District: {`${props.c.district}`} </span>
                    </div>
                    <div className="candidate-sub-container">
                        {(props.c.party === "Republican")?
                            <img src="https://foralltn.org/wp-content/uploads/2020/12/rep-icon.png" alt={props.c.party} className="candidate-party-image" />
                        :
                            <img src="https://foralltn.org/wp-content/uploads/2020/12/dem-icon.png" alt={props.c.party} className="candidate-party-image" />
                        }
                    </div>
                </div>


                <div className="candidate-issue-container">
                    {props.c.issues.map((c,i) => {
                        return (
                            <CandidateIssue cId={props.c._id} key={i} issue={c} />
                        );
                    })}
                </div>
            </div>

        </div>
    );
}

export default Candidate