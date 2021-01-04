import {useState, useEffect} from "react"

const OpinionOption = (props) => {

    // props - 
    //      opinion (yes, leans-yes, neutral, leans-no, no)
    //      cId (candidate id)
    //      initSelected (true/ false) - set true if it is candidate opinion
    //      issue
    //      onUpdate(opinionStr)

    const [ selectedStr, setSelectedStr ] = useState('') // Only 'selected' or ''
    const [ opinionStr, setOpinionStr ] = useState('') // Yes, Leans Yes, Neutral, Leans No, No
    const [ selected, setSelected ] = useState(false) // true or false

    const updateView = (e) => {
        setSelectedStr(e.target.checked)
        props.updateView(opinionStr)
    }

    useEffect(() => {
        let str = props.opinion.split('-')
        if(str.length > 1) {
            let first = str[0].charAt(0).toUpperCase() + str[0].slice(1)
            let second = str[1].charAt(0).toUpperCase() + str[1].slice(1)
            setOpinionStr(`${first} ${second}`)
        } else {
            let first = str[0].charAt(0).toUpperCase() + str[0].slice(1)
            setOpinionStr(first)
        }
        // setSelected(props.initSelected)
    }, [])

    useEffect(() => {
        setSelected(props.initSelected)
    }, [props.initSelected])

    useEffect(() => {
        if(selected) {
            setSelectedStr('selected')
        } else {
            setSelectedStr('')
        }
    }, [selected])

    return (

        <label className={`vertical-words opinion ${props.opinion} ${selectedStr}`} htmlFor={`${props.opinion}-${props.cId}-${props.issue.issue.title}`}>
            {opinionStr}
            <input onChange={updateView} type='radio' value={opinionStr} id={`${props.opinion}-${props.cId}-${props.issue.issue.title}`} name='Candidate Opinion' checked={selected} ></input>
        </label>


        // <label className={`vertical-words opinion ${props.opinion} `} id={`${props.opinion}-${props.cId}-${props.issue.issue.title}-label`} htmlFor={`${props.opinion}-${props.cId}-${props.issue.issue.title}`}>Yes
        //     <input type='radio' value="Yes" id={`${props.opinion}-${props.cId}-${props.issue.issue.title}`} name="candidate-opinion"  ></input>
        // </label>
    );
}

export default OpinionOption