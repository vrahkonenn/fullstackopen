import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider
} from '@mui/material'

import { Link } from 'react-router-dom'
import Notification from './Notification'

const Home = ({
  blogs,
  notification,
  errorNotification
}) => {

  const sortedBlogs = [...blogs].sort(
    (a, b) => b.likes - a.likes
  )

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 6
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: 700,
          p: 4,
          borderRadius: 3
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
        >
          Blogs
        </Typography>

        <Notification
          notification={notification}
          errorNotification={errorNotification}
        />

      <List>
        {sortedBlogs.map((blog, index) => (
          <div key={blog.id}>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={`/blogs/${blog.id}`}
              >
                <ListItemText
                  primary={blog.title}
                  secondary={`by ${blog.author}`}
                />
              </ListItemButton>
            </ListItem>

            {index < sortedBlogs.length - 1 && <Divider />}
          </div>
        ))}
      </List>

      </Paper>
    </Box>
  )
}

export default Home