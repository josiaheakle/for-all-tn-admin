
import {useEffect, useState} from "react"
import axios from "axios"
import Issue from "./Issue.js"

const IssueHub = (props) => {

    const [issues, setIssues] = useState([])
    const [editing, setEditing] = useState(false)
    const [editingIssueId, setEditingIssueId] = useState(false)
    const [issueTitle, setIssueTitle] = useState()
    const [issueDescr, setIssueDescr] = useState()

    const editIssue = (issueId) => {

        setEditing(true)
        setEditingIssueId(issueId)

        const issueTitleInput = document.getElementById('issue-title-input')
        const issueDescrInput = document.getElementById('issue-descr-input')

        let title
        let descr

        issues.forEach(i => {
            if(`${i._id}` === `${issueId}`) {
                title = i.title
                descr = i.description
            }
        })

        setIssueDescr(descr)
        setIssueTitle(title)

        issueTitleInput.value = title
        issueDescrInput.value = descr
        
    }

    const deleteIssue = async (issueId) => {
        

        const options = {
            url: 'http://localhost:4000/delete/issue',
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            data: {
                issue: issueId
            }
        }

        const res = await axios(options)

        console.log(`delete responce`)
        console.log(res)
        setTimeout(() => {
            importAllIssues()
        }, 100)

    }

    const importAllIssues = async () => {
        const options = {
            url: 'http://localhost:4000/get/issues',
            method: "GET"
        }

        const res = await axios(options)

        console.log(`getting issues`)
        console.log(res)

        setIssues(res.data)

    }

    const createNewIssue = async (e) => {

        e.preventDefault()

        document.getElementById('new-issue-form').reset();


        const options = {
            url: 'http://localhost:4000/update/issue',
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            data: {
                title: issueTitle,
                description: issueDescr,
                issueID: editingIssueId
            }
        }

        const res = await axios(options)
        importAllIssues()
        console.log(res)
    
    }

    const updateValue = (e) => {
        switch(e.target.id) {
            case('issue-title-input'):  
                setIssueTitle(e.target.value)
                break;
            case('issue-descr-input'):
                setIssueDescr(e.target.value)
                break;
        }
    }

    useEffect(() => {
        importAllIssues()
    }, [])

    return (
        <div className='IssueHub'>
            <form id='new-issue-form' onSubmit={createNewIssue} >
                <label htmlFor='issue-title-input'>Title</label>
                <input id='issue-title-input' onChange={updateValue}></input>
                <label htmlFor='issue-descr-input'>Description</label>
                <input id='issue-descr-input' onChange={updateValue}></input>
                <button type='submit' id='issue-submit-button' >Submit</button>
            </form>

            {issues.map((issue, i) => {
                return (
                    <Issue issue={issue} key={i} onEdit={editIssue} onDelete={deleteIssue} />
                );
            })}

        </div>
    );

}

export default IssueHub