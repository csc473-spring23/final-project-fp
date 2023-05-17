import {createContext} from "react";

type AuthContextType = {
    authState: boolean | null,
    setAuthState: React.Dispatch<React.SetStateAction<boolean | null>>
}
const iUserContextState = {
    authState: null,
    setAuthState: () => {}
}
export const AuthContext = createContext<AuthContextType>(iUserContextState)
