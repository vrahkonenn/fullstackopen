import { Alert } from '@mui/material'

const Notification = ({ notification, errorNotification }) => {
  if (!notification && !errorNotification) {
    return null
  }

  return (
    <Alert
      severity={notification ? 'success' : 'error'}
      sx={{ mb: 3 }}
    >
      {notification || errorNotification}
    </Alert>
  )
}

export default Notification