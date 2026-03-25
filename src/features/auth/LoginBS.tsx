/**
 * COMPARISON MENTALITY: BOOTSTRAP (react-bootstrap)
 * - Readability: Good (utility classes like d-flex, justify-content-center).
 * - Code Length: Slightly shorter JSX (utility classes are concise).
 * - Styling Approach: Utility Classes (Utility-first). Fast to prototype, but can get messy with many classes.
 * - Logic: Identical to MUI version (Standard React HOOKS).
 */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from './authContext';
import api from '../../api/axios';

const LoginBS: React.FC = () => {
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
        <div
            className="d-flex justify-content-center align-items-center vh-100 bg-light"
            style={{ minHeight: '100vh' }}
        >
            <Container style={{ maxWidth: '450px' }}>
                <Card className="shadow border-0 overflow-hidden">
                    <Card.Header
                        className="text-white text-center py-4 border-0"
                        style={{ backgroundColor: '#1B8C3E' }}
                    >
                        <h2 className="mb-1 fw-bold">TaskFlow</h2>
                        <p className="mb-0 opacity-75">Connectez-vous pour continuer</p>
                    </Card.Header>
                    <Card.Body className="p-4">
                        {state.error && (
                            <Alert variant="danger" className="mb-4">
                                {state.error}
                            </Alert>
                        )}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="py-2"
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="formBasicPassword">
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Votre mot de passe"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="py-2"
                                />
                            </Form.Group>

                            <Button
                                variant="success"
                                type="submit"
                                className="w-100 py-2 fw-bold"
                                disabled={state.loading}
                                style={{ backgroundColor: '#1B8C3E', borderColor: '#1B8C3E' }}
                            >
                                {state.loading ? 'Connexion...' : 'Se connecter'}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default LoginBS;
