import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import { setLocale, setTheme } from '@containers/App/actions';
import { selectLocale, selectTheme } from '@containers/App/selectors';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Menu, MenuItem } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import EditNoteIcon from '@mui/icons-material/EditNote';

// import { setData, setLogin } from '@pages/Login/actions';
// import logo from '../../assets/logo.png';
import classes from './style.module.scss';
import { setLogin, setToken } from '@containers/Client/actions';

const drawerWidth = 260;

const SecondLayout = ({ locale, theme, children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [menuPosition, setMenuPosition] = useState(null);
    const open = Boolean(menuPosition);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleClick = (event) => {
        setMenuPosition(event.currentTarget);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const handleClose = () => {
        setMenuPosition(null);
    };

    const onSelectLang = (lang) => {
        if (lang !== locale) {
            dispatch(setLocale(lang));
        }
        handleClose();
    };

    const handleTheme = () => {
        dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
    };

    const toDashboard = () => {
        navigate('/dashboard');
    };

    const toStudentInfo = () => {
        navigate('/student-info');
    };

    const toMyCourse = () => {
        navigate('/my-course');
    };

    const toRegistratioin = () => {
        navigate('/registration');
    };

    const handleLogout = () => {
        dispatch(setLogin(false));
        dispatch(setToken(null));
        navigate('/login');
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <Link to="/dashboard">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <FormattedMessage id="nav_dashboard" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Link>
            <Link to="/student-info">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <FormattedMessage id="nav_student_info" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Link>
            <Link to="/my-course">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <FormatListBulletedIcon />
                            </ListItemIcon>
                            <FormattedMessage id="nav_my_course" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Link>

            <Link to="/registration">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <EditNoteIcon />
                            </ListItemIcon>
                            <FormattedMessage id="nav_registration" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Link>
            <Divider />
            <List onClick={handleLogout}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <FormattedMessage id="nav_logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                className={classes.appBar}
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box className={classes.headerWrapper}>
                        <Box className={classes.header}>
                            {/* <img src={logo} alt="" width={40} /> */}
                            <Typography variant="h6" noWrap component="div">
                                Student Name
                            </Typography>
                        </Box>
                        <div className={classes.contentWrapper}>
                            <div className={classes.toolbar}>
                                <div className={classes.theme} onClick={handleTheme} data-testid="toggleTheme">
                                    {theme === 'light' ? <NightsStayIcon /> : <LightModeIcon />}
                                </div>
                                <div className={classes.toggle} onClick={handleClick}>
                                    <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
                                    <div className={classes.lang}>{locale}</div>
                                    <ExpandMoreIcon />
                                </div>
                            </div>
                            <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
                                <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
                                    <div className={classes.menu}>
                                        <Avatar className={classes.menuAvatar} src="/id.png" />
                                        <div className={classes.menuLang}>
                                            <FormattedMessage id="app_lang_id" />
                                        </div>
                                    </div>
                                </MenuItem>
                                <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
                                    <div className={classes.menu}>
                                        <Avatar className={classes.menuAvatar} src="/en.png" />
                                        <div className={classes.menuLang}>
                                            <FormattedMessage id="app_lang_en" />
                                        </div>
                                    </div>
                                </MenuItem>
                            </Menu>
                        </div>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

const mapStateToProps = createStructuredSelector({
    locale: selectLocale,
    theme: selectTheme,
});

SecondLayout.propTypes = {
    locale: PropTypes.string,
    theme: PropTypes.string,
    children: PropTypes.element.isRequired,
};

export default injectIntl(connect(mapStateToProps)(SecondLayout));