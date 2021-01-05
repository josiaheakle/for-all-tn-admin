import Candidate from "./Candidate.js"
import {useState, useEffect} from "react"
import axios from "axios"

require('dotenv').config();

const CandidateHub = (props) => {

    const [ senators, setSenators ] = useState(undefined)
    const [ senatorsImported, setSenatorsImported ] = useState(false)
    const [ representatives, setRepresentatives ] = useState(undefined)
    const [ representativesImported, setRepresentativesImported ] = useState(false)

    const importSenators = async () => {

        const options = {
            url: `${process.env.REACT_APP_API_URL}/get/candidates/senators`,
            // url: `http://localhost:4000/get/candidates/senators`,
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios(options)
        setSenators(res.data)
        setSenatorsImported(true)

    }

    const importRepresentatives = async () => {

        const options = {
            url: `${process.env.REACT_APP_API_URL}/get/candidates/representatives`,
            // url: `http://localhost:4000/get/candidates/representatives`,
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios(options)
        setRepresentatives(res.data)
        setRepresentativesImported(true)

    }

    const importAllCandidates = async () => {
        await importSenators()
        await importRepresentatives()
    }

    const requestUpdate = async () => {

        const options = {
            url: `${process.env.REACT_APP_API_URL}/update/all`,
            // url: "http://localhost:4000/update/all",
            method: 'GET'
        }

        const res = await axios(options)
        console.log(`requesting candidates update, responce:`)
        console.log(res)

        setTimeout(() => {
            importAllCandidates()
        }, 200);

    }

    const toggleContainerOpen = (e) => {
        
        // console.log(e.target)
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
        importAllCandidates()
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