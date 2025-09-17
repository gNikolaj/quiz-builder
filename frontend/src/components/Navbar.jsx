import React from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ mb: 4, bgcolor: 'primary.main' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Quiz Builder
                </Typography>
                <div>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/create">
                        Create Quiz
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
