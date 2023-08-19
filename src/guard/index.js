import { useAuth } from "@/hooks"
import SignUpPage from "@/pages/auth/signup"

function AuthGuard({ children }) {
    const { isAuthenticated } = useAuth()
    if (!isAuthenticated) {
        return (
            <SignUpPage />
        )
    }
    return children
}
export default AuthGuard;