import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

interface HeaderBSProps {
    title: string;
    onMenuClick: () => void;
    userName?: string;
    onLogout?: () => void;
}

const HeaderBS: React.FC<HeaderBSProps> = ({ title, onMenuClick, userName, onLogout }) => {
    return (
        <Navbar className="bg-success text-white py-2" expand="lg" variant="dark" style={{ backgroundColor: '#1B8C3E !important' }}>
            <Container fluid>
                <Button
                    variant="link"
                    className="text-white p-0 me-3 shadow-none"
                    onClick={onMenuClick}
                    aria-label="Toggle menu"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </Button>

                <Navbar.Brand className="d-flex align-items-center gap-2 m-0 p-0 fw-bold">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    <span>{title}</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="align-items-center gap-3">
                        <div className="d-flex align-items-center gap-2">
                            <span className="d-none d-sm-inline">{userName || 'Utilisateur'}</span>
                            <div
                                className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    fontSize: '0.875rem'
                                }}
                            >
                                {(userName || 'U').charAt(0).toUpperCase()}
                            </div>
                        </div>
                        {onLogout && (
                            <Button
                                variant="outline-light"
                                size="sm"
                                onClick={onLogout}
                                className="border-0 bg-transparent"
                                style={{ textTransform: 'none' }}
                            >
                                Déconnexion
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default HeaderBS;
