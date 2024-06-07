import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';



const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

// Exemple de composant à afficher pour chaque menu
const HomeContent = () => (
    <Typography paragraph>
        **************** Bonjour utilisateur ! ******************* <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </Typography>
);

const ClientsContent = () => (
    <Typography paragraph>
        **************** Contenu pour Clients ******************* <br />
        Autre information pertinente pour les clients.
    </Typography>
);

const UsersContent = () => (
    <Typography paragraph>
        **************** Contenu pour Utilisateurs ******************* <br />
        Autre information pertinente pour les utilisateurs.
    </Typography>
);

const RolesContent = () => (
    <Typography paragraph>
        **************** Contenu pour Rôles ******************* <br />
        Autre information pertinente pour les rôles.
    </Typography>
);

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [selectedMenu, setSelectedMenu] = React.useState('Home');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMenuClick = (text: string) => {
        setSelectedMenu(text);
    };

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Ajoutez ici la logique de déconnexion
        handleMenuClose();
    };

    // Fonction pour retourner le composant associé à chaque menu
    const getMenuContent = (menu: string) => {
        switch (menu) {
            case 'Home':
                return <HomeContent />;
            case 'Clients':
                return <ClientsContent />;
            case 'Users':
                return <UsersContent />;
            case 'Roles':
                return <RolesContent />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Navbar si existe
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton color="inherit" onClick={handleAvatarClick}>
                        <Avatar />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem >
                            <ListItemIcon>
                                <VerifiedUserIcon fontSize="small" style={{ color: 'green' }} />
                            </ListItemIcon>
                            <ListItemText primary="Username" />
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" style={{ color: 'red' }}/>
                            </ListItemIcon>
                            <ListItemText primary="Déconnexion" />
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h5" sx={{color: '#1976D2',marginRight:2 }} >
                        Console Admin
                    </Typography>

                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {[
                        { text: 'Home', icon: <HomeIcon color="primary" /> },
                        { text: 'Clients', icon: <PersonIcon color="primary" /> },
                        { text: 'Users', icon: <GroupIcon color="primary" /> },
                        { text: 'Roles', icon: <SupervisorAccountIcon color="primary" /> },
                    ].map(({ text, icon }) => (
                        <ListItem
                            key={text}
                            disablePadding
                            sx={{ display: 'block' }}
                            onClick={() => handleMenuClick(text)}
                        >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    backgroundColor: selectedMenu === text ? '#e0e0e0' : 'inherit',
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>


            <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%', height: '100vh', backgroundColor: '#f0f0f0' }}>
                <DrawerHeader />
                {/* Affiche le contenu en fonction du menu sélectionné */}
                {getMenuContent(selectedMenu)}
            </Box>
        </Box>
    );
}
