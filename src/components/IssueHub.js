
import {useEffect, useState} from "react"
import axios from "axios"
import Issue from "./Issue.js"
import UserHandler from "../modules/UserHandler.js"
import { toast } from "react-toastify"
import DataHandler from "../modules/DataHandler.js"

const IssueHub = (props) => {

    const [issues, setIssues] = useState([])
    const [editing, setEditing] = useState(false)
    const [editingIssueId, setEditingIssueId] = useState(false)
    const [issueTitle, setIssueTitle] = useState()
    const [issueDescr, setIssueDescr] = useState()

    const editIssue = (issueId) => {
        setEditing(true)
        setEditingIssueId(issueId)
    }

    const openNewIssue = () => {
        setEditing(true)
        setEditingIssueId(false)
    }

    const onEditing = () => {
        const issueTitleInput = document.getElementById('issue-title-input')
        const issueDescrInput = document.getElementById('issue-descr-input')
        let title
        let descr
        issues.forEach(i => {
            if(`${i._id}` === `${editingIssueId}`) {
                title = i.title
                descr = i.description
            }
        })
        setIssueDescr(descr)
        setIssueTitle(title)
        issueTitleInput.value = title || ''
        issueDescrInput.value = descr || ''
    }

    const cancelEdit = () => {
        setEditing(false)
        setEditingIssueId(false)
    }
 
    const deleteIssue = async (issueId) => {
        const options = {
            url: `${process.env.REACT_APP_API_URL}/delete/issue`,
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            data: {
                issue: issueId,
                user: UserHandler.getCurrentUser()._id
            }
        }
        const res = await axios(options)
        if(res.data.type === 'SUCCESS') {
            toast(res.data.message)

        }
        else toast(res.data.message)
        setTimeout(() => {
            importAllIssues()
        }, 200)
    }

    const importAllIssues = async (update) => {
        let res = await DataHandler.getIssues(update)
        setIssues(res)
    }

    const createNewIssue = async (e) => {
        e.preventDefault()
        document.getElementById('new-issue-form').reset();
        const options = {
            url: `${process.env.REACT_APP_API_URL}/update/issue`,
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            data: {
                title: issueTitle,
                description: issueDescr,
                issueID: editingIssueId,
                user: UserHandler.getCurrentUser()._id
            }
        }
        setEditing(false)
        setEditingIssueId(false)
        const res = await axios(options)
        toast(res.data.message)
        importAllIssues(true)
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
        if(editing === true) {
            onEditing()
        }
    }, [editing])

    useEffect(() => {
        importAllIssues(false)
    }, [])

    return (
        <div className='IssueHub card'>
            {(editing===true)?
                <form id='new-issue-form' onSubmit={createNewIssue} >
                    <h2> {(editing === false)? 'New' : 'Editing'} Issue</h2>
                    <label htmlFor='issue-title-input'>Title</label>
                    <input id='issue-title-input' onChange={updateValue}></input>
                    <label htmlFor='issue-descr-input'>Description</label>
                    <input id='issue-descr-input' onChange={updateValue}></input>
                    <button type='button' onClick={cancelEdit} id='cancel-issue-button'> Cancel </button>
                    <button type='submit' id='issue-submit-button' >Submit</button>
                </form>
            :
                <div id='all-issues'> 
                    <h2>All Issues</h2>
                    <button onClick={openNewIssue} id='new-issue-button'> New Issue </button>
                    {issues.map((issue, i) => {
                        return (
                            <Issue issue={issue} key={i} onEdit={editIssue} onDelete={deleteIssue} />
                        );
                    })}
                </div>
            }
        </div>
    );

}

export default IssueHub