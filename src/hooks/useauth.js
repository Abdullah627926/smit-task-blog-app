
import { AuthContextProvider } from "@/context"
import { useContext } from "react"

const useAuth = () => {
    const value = useContext(AuthContextProvider)
    if (!value) {
        throw new Error("useAuth can only be used in AuthProvider!")
    }
    return value
}

export default useAuth;