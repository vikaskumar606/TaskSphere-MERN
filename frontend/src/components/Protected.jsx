import { Navigate } from "react-router-dom"

export default function Protected({ children }) {
    if (!localStorage.getItem('token')) {
        return <Navigate to="/login" replace />
    }
    return children
}