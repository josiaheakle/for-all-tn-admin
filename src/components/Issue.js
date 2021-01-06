const Issue = (props) => {
    // props - issue object { title, description }
    //          onEdit (issueId) parent function
    //          onDelete (issueId) assumes user already verified delete

    const editIssue = () => {
        props.onEdit(props.issue._id)
    }

    const deleteIssue = () => {
        props.onDelete(props.issue._id)
    }

    return (
        <div className='Issue' id={`${props.issue.title}`} >
            <div className='issue-title'>
                {props.issue.title}
            </div>
            <div className='issue-description'>
                {props.issue.description}
            </div>
            <div className='align-horizontal'>
                <button className='edit-button' onClick={editIssue} >
                    Edit
                </button>
                <button className='delete-button' onClick={deleteIssue}>
                    Delete
                </button>
            </div>
        </div>
    );

}

export default Issue;