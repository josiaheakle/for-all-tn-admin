

import {createContext, useContext, useEffect} from "react"

const LoaderContext = createContext(false);

const Loader = () => {

    const {isLoading, updateIsLoading} = useContext(LoaderContext);

    return (
        <div className='loader-container'>
            {(isLoading === true ) ? 
                <div className='loader'></div>
            :null}
        </div>
    );
}  

export default Loader;
export { LoaderContext };