import Candidate from "./Candidate.js"
import {useState, useEffect, useContext} from "react"

import DataHandler from "../modules/DataHandler.js"
import { LoaderContext } from "./Loader.js"

const CandidateHub = (props) => {

    const [ senators, setSenators ] = useState(undefined)
    const [ senatorsImported, setSenatorsImported ] = useState(false)
    const [ representatives, setRepresentatives ] = useState(undefined)
    const [ representativesImported, setRepresentativesImported ] = useState(false)

    const { isLoading, updateIsLoading } = useContext(LoaderContext);
 
    const importAllCandidates = async (update) => {
        updateIsLoading(true);
        let sens = await DataHandler.getSens(update)
        setSenators(sens)
        setSenatorsImported(true)
        let reps = await DataHandler.getReps(update)
        setRepresentatives(reps)
        setRepresentativesImported(true)
        updateIsLoading(false);
    }

    const requestUpdate = async () => {
        await DataHandler.requestUpdate()
        setTimeout(() => {
            importAllCandidates(true)
        }, 200);
    }

    const toggleContainerOpen = (e) => {
        if(e.target.textContent === 'Hide') e.target.textContent = 'Open' 
        else e.target.textContent = 'Hide'
        switch(e.target.id) {
            case('close-senators-button'):
                let sContainer = document.getElementById('senators-container')
                sContainer.classList.toggle('open')
                sContainer.classList.toggle('close')
                break;
            case('close-representatives-button'):
                let rContainer = document.getElementById('representatives-container')
                rContainer.classList.toggle('open')
                rContainer.classList.toggle('close')
                break;
        }
    }

    useEffect(() => {
        importAllCandidates(true)
    }, [])

    return(
        <div className='CandidateHub'>  
            <button onClick={requestUpdate} id='update-candidates-button'>Update All Candidates</button>
            <div className='candidate-header'>
                Senators
                <button onClick={toggleContainerOpen} id='close-senators-button' className='close-header-button'>
                    Hide
                </button>
            </div>
            <div id='senators-container' className='candidates-container open'>
                {(senatorsImported) ? senators.map((c, i) => {
                    return <Candidate c={c} key={i} />
                }) : null}
            </div>
            <div className='candidate-header'>
                Representatives
                <button onClick={toggleContainerOpen} id='close-representatives-button' className='close-header-button'>
                    Hide
                </button>
            </div>
            <div id='representatives-container' className='candidates-container open'>
                {(representativesImported) ? representatives.map((c, i) => {
                    return <Candidate c={c} key={i} />
                }) : null}
            </div>
        </div>
    );
}

export default CandidateHub