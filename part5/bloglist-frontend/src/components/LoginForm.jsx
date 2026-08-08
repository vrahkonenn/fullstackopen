import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button
} from '@mui/material'

import Notification from './Notification'

const LoginForm = ({
  notification,
  errorNotification,
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#f3f4f6'
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 420,
          borderRadius: 3
        }}
      >
        <form onSubmit={handleLogin}>
          <Stack spacing={2}>
            <Typography variant="h5" align="center">
              Log in to application
            </Typography>

            <Notification
              notification={notification}
              errorNotification={errorNotification}
            />

            <TextField
              label="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />

            <Button
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  )
}

export default LoginForm