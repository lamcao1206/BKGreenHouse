import { createContext, useContext} from "react";
import useLocalStorage from "../Hooks/useLocalStorage";

export const AuthContext = createContext({});

export function AuthProvider({children}){
    const [user, setUser] = useLocalStorage({token : ""}, 'user');

    return <AuthContext.Provider value={{user,setUser}}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

