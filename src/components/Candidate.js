
import {useState, useEffect, Component} from 'react'
import CandidateIssue from './CandidateIssue'

const Candidate = (props) => {

    // props - c(andidate)

    const [ imgStr, setImgStr ] = useState(undefined)

    const convertImageToBinary = () => {

        setImgStr(props.c.imgFile.data)

        // let base64String = btoa(String.fromCharCode(...new Uint8Array(props.c.imgFile.data.data)));
        // setImgStr(base64String)
    }
 
    useEffect(() => {
        convertImageToBinary()
    }, [])

    return (
        <div className='Candidate'>
            <div id={`${props.c._id}`} className="candidate-container">

                <div className='candidate-information-container'>
                    <div className="candidate-sub-container">
                        {(props.c.imgFile)?
                            <img src={`data:${props.c.imgFile.type};base64,${imgStr}`} className="candidate-image" />
                        :
                            <img src={`https://for-all-tn-api.herokuapp.com/proxy-img?url=${props.c.img}`} className="candidate-image" />
                        }

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