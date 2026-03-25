/**
 * COMPARISON MENTALITY: MATERIAL UI (MUI)
 * - Readability: High (declarative components like <TextField />, <Button />).
 * - Code Length: Moderate (requires more nesting but less manual CSS).
 * - Styling Approach: Sx prop (CSS-in-JS). Very powerful for dynamic styles and theme integration.
 * - Logic: Identical to Bootstrap version (Standard React HOOKS).
 */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Container,
    Box,
    CardContent,
    TextField,
    Button,
    Typography,
    Alert,
    Paper
} from '@mui/material';
import { useAuth } from './authContext';
import api from '../../api/axios';

const LoginMUI: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state, dispatch } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const from = (location.state as any)?.from || '/dashboard';

    useEffect(() => {
        if (state.user && location.pathname !== from) {
            navigate(from, { replace: true });
        }
    }, [state.user, navigate, from, location.pathname]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });
        try {
            const { data: users } = await api.get(`/users?email=${email}`);
            if (users.length === 0 || users[0].password !== password) {
                dispatch({ type: 'LOGIN_FAILURE', payload: 'Email ou mot de passe incorrect' });
                return;
            }
            const { password: _, ...user } = users[0];
            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } catch {
            dispatch({ type: 'LOGIN_FAILURE', payload: 'Erreur serveur' });
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2 }}>
                    <Box sx={{ p: 4, textAlign: 'center', backgroundColor: '#1B8C3E', color: 'white' }}>
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            TaskFlow
                        </Typography>
                        <Typography variant="subtitle1">
                            Connectez-vous pour continuer
                        </Typography>
                    </Box>
                    <CardContent sx={{ p: 4 }}>
                        {state.error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {state.error}
                            </Alert>
                        )}
                        <Box component="form" onSubmit={handleSubmit} noValidate>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Mot de passe"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ mb: 3 }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={state.loading}
                                sx={{
                                    py: 1.5,
                                    backgroundColor: '#1B8C3E',
                                    '&:hover': {
                                        backgroundColor: '#146c30',
                                    },
                                }}
                            >
                                {state.loading ? 'Connexion...' : 'Se connecter'}
                            </Button>
                        </Box>
                    </CardContent>
                </Paper>
            </Container>
        </Box>
    );
};

export default LoginMUI;
