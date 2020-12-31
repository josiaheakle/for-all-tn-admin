


const Issue = (props) => {
    // props - issue object { title, description }
    //          onEdit (issueId) parent function
    //          onDelete (issueId) assumes user already verified delete

    const editIssue = () => {
        props.onEdit(props.issue._id)
    }

    const deleteIssue = () => {

        // TODO : verify deletion using modal

        props.onDelete(props.issue._id)
    }

    return (
        <div className='Issue' id={`${props.issue.title}`} >
            <span className='issue-title'>
                {props.issue.title}
            </span>
            <span className='issue-description'>
                {props.issue.description}
            </span>
            <button className='edit-button' onClick={editIssue} >
                Edit
            </button>
            <button className='delete-button' onClick={deleteIssue}>
                Delete
            </button>
        </div>
    );

}

export default Issue;