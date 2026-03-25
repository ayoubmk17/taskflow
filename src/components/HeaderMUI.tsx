import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface HeaderMUIProps {
    title: string;
    onMenuClick: () => void;
    userName?: string;
    onLogout?: () => void;
}

const HeaderMUI: React.FC<HeaderMUIProps> = ({ title, onMenuClick, userName, onLogout }) => {
    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#1B8C3E',
                boxShadow: 'none',
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
            }}
        >
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={onMenuClick}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>

                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: 1 }}>
                    <CheckCircleOutlineIcon sx={{ display: { xs: 'none', md: 'flex' } }} />
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1" sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {userName || 'Utilisateur'}
                        </Typography>
                        <Box
                            sx={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                fontSize: '0.875rem'
                            }}
                        >
                            {(userName || 'U').charAt(0).toUpperCase()}
                        </Box>
                    </Box>

                    {onLogout && (
                        <Button
                            color="inherit"
                            onClick={onLogout}
                            sx={{
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }
                            }}
                        >
                            Déconnexion
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderMUI;
