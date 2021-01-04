import { useEffect, useState } from "react";
import UserHandler from "../modules/UserHandler.js"

const UserHub = (props) => {

    const [ admin, setAdmin ] = useState(false)

    useEffect(() => {
        setAdmin(UserHandler.isUserAdmin())
    }, [])

    return (
        <div className='UserHub'>
            {(admin)? 
            <div>
                Hello
            </div>
            :
            <div>
                You do not have permision to view this page.
            </div>
            }
        </div>
    );
}

export default UserHub;