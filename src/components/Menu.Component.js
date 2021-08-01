import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { ExitToApp } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import { MainListItems, SecondaryListItems } from './ListItem.Component';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeView } from '../slices/view';
import { logout } from '../slices/user'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  marginLeftRigth: {
    margin: theme.spacing(1)
  },
  logout: {
    margin: theme.spacing(2.3,1),
    cursor: 'pointer'
  },
  link: {
    textDecoration: 'none',
    color: '#fff'
  }
}));
const Menu = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const userDataInStore = useSelector(state => state.user.data)
    const avt = userDataInStore.avt
    const role = userDataInStore.role
    const [isGuest, setIsGuest] = useState(avt === "#");
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => setOpen(true);

    const handleDrawerClose = () => setOpen(false);

    const handleLogout = () => {
      localStorage.removeItem('token')
      dispatch(logout())
      dispatch(changeView('home'))
      setIsGuest(true);
      history.push('/')
    }
    const toHome = () => history.push('/')

    useEffect(() => {
      setIsGuest(avt === "#");
    }, [avt])
    
    return(
        <div>
        <CssBaseline />
        <AppBar
            id="appbar" 
            position="absolute" 
            className={!isGuest && clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
                <MenuIcon />
            </IconButton>
            <Typography 
            component="h1" 
            variant="h6" 
            color="inherit"
            onClick={toHome} 
            noWrap className={classes.title}>
                BDS Project
            </Typography>
            {!isGuest &&
            <span className={classes.root}>
              <IconButton color="inherit">
                  <Badge className={classes.marginLeftRigth} badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
              </IconButton>
              <Avatar className={classes.marginLeftRigth} alt="user-avt" src={avt} />
              <ExitToApp onClick={handleLogout} className={classes.logout} />
            </span>}
            {isGuest &&
            <span className={classes.root}>
              <a href="/signin" className={classes.link}>
                <Button color="inherit">
                  SignIn
                </Button>
              </a>
              <a href="/signup" className={classes.link}>
                <Button color="inherit">
                  SignUp
                </Button>
              </a>
            </span>}
            </Toolbar>
        </AppBar>
        {!isGuest &&
        <Drawer
            variant="permanent"
            classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
            </div>
            <Divider />
            <List><MainListItems /></List>
            <Divider />
            {role === 'ROLE_ADMIN' && <List><SecondaryListItems /></List>}
        </Drawer>}
        </div>
    )
}

export default Menu