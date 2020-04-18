import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { AuthenticatonStoreContext } from '../store/AuthenticationStore';
import { GoogleLogout } from 'react-google-login';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

const UserMenu = observer(() => {
    const authStore = useContext(AuthenticatonStoreContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const avatar = authStore.profile && authStore.profile.imageUrl
        ? <Avatar alt={authStore.profile.name} src={authStore.profile.imageUrl} />
        : <AccountCircle />

    return (
        <div>
            <IconButton
                onClick={handleMenu}
                color="inherit"
            >
                {avatar}
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <GoogleLogout
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    onLogoutSuccess={authStore.clear}
                    render={renderProps => (<MenuItem onClick={renderProps.onClick} disabled={renderProps.disabled}>Signout</MenuItem>)}
                >
                </GoogleLogout>
            </Menu>
        </div>
    )
});

export default UserMenu;