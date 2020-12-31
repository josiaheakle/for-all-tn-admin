const UserHandler = (() => {

    let _currentUser; // current user    
    let _onUserUpdate; // callback function for when the user gets updated
    
    const _updateUser = () => {
        
        console.log(`updating current user`)
        console.log(_currentUser)
        _onUserUpdate(_currentUser)
        
    }

    const setOnUserUpdate = (callback) =>  {
        // sets _onUserUpdate to parent callback function
        _onUserUpdate = callback
    }

    const loggoutUser = () => {
        _currentUser = undefined
        _updateUser()
    }

    const getCurrentUser = () => {
        return _currentUser
    }

    const setCurrentUser = (user) => {
        _currentUser = user
        _updateUser()
    }

    return {
        getCurrentUser: getCurrentUser,
        setCurrentUser: setCurrentUser,
        loggoutUser: loggoutUser,
        setOnUserUpdate: setOnUserUpdate
    }

})();

export default UserHandler