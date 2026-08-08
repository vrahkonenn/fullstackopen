import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box
} from '@mui/material'
import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogOut }) => {
  return (
    <AppBar position="static">
      <Toolbar>

        {/* Vasen */}
        <Typography variant="h6">
          Blog App
        </Typography>

        {/* Keski */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexGrow: 1,
            gap: 2
          }}
        >
          <Button
            color="inherit"
            component={Link}
            to="/"
          >
            Home
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/create"
          >
            New blog
          </Button>

        </Box>

        {/* Oikea */}
        {user && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Typography>
              Logged as: <strong>{user.username}</strong>
            </Typography>

            <Button
              color="inherit"
              onClick={handleLogOut}
            >
              Logout
            </Button>
          </Box>
        )}
        {!user && (
          <Button
            color="inherit"
            component={Link}
            to="/login"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar