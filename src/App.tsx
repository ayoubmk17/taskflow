import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/Login';
import LoginMUI from './features/auth/LoginMUI';
import LoginBS from './features/auth/LoginBS';
import Dashboard from './pages/Dashboard';
import ProjectDetail from './pages/ProjectDetail';
import ProtectedRoute from './components/ProtectedRoute';
import { useUI } from './features/uiContext';

export default function App() {
    const { uiType } = useUI();

    const renderLogin = () => {
        switch (uiType) {
            case 'MUI':
                return <LoginMUI />;
            case 'Bootstrap':
                return <LoginBS />;
            default:
                return <Login />;
        }
    };

    return (
        <Routes>
            <Route path="/login" element={renderLogin()} />
            <Route path="/dashboard" element={
                <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/projects/:id" element={
                <ProtectedRoute><ProjectDetail /></ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}