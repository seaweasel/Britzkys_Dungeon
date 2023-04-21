import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../utils/firebase'
import { onAuthStateChanged, getAuth } from 'firebase/auth';

//create the context
const AuthContext = createContext();

//create a custom hook for using AuthContext
//used in components that need access to the authentication statte
export const useAuth = () => {
   return useContext(AuthContext);
}

//create a component that will wrap the whole app and provide authentication state
export const AuthProvider = ({children}) => {
    // initialize the state for the authenticated user
    // if the user is authenticated it will store the user instead of null
    const [authUser, setAuthUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // create a listener that looks for changes in the authentication state
    // takes a callback function that will be called when the component mounts
    useEffect(() => {
        const auth = getAuth()
        //clean up function that will be called when the component unmounts 
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            //if the user exists
            if (user) {
                // update the state
                setAuthUser(user);
            } else {
                //clear the state
                setAuthUser(null);
            }
            setLoading(false)
        });

        return () => {
            unsubscribe();
        };
    }, []);
    
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
        {children}
        </AuthContext.Provider>
    )
}