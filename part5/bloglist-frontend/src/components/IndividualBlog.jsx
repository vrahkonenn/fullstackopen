import {
  Box,
  Paper,
  Typography,
  Button,
  Link,
  Stack
} from '@mui/material'

const IndividualBlog = ({
  blog,
  handleLike,
  user,
  handleDeleteBlog
}) => {

  if (!blog) {
    return null
  }

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
        <Stack spacing={2}>

          <Typography variant="h4">
            {blog.title}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary">
            by {blog.author}
          </Typography>

          <Link
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            {blog.url}
          </Link>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Typography>
              Likes: {blog.likes}
            </Typography>

            {user && (
              <Button
                variant="contained"
                size="small"
                onClick={() => handleLike(blog.id)}
              >
                Like
              </Button>
            )}
          </Box>

          <Typography color="text.secondary">
            Added by <strong>{blog.user[0].username}</strong>
          </Typography>

          {user && user.id === blog.user[0].id && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDeleteBlog(blog.id)}
            >
              Delete blog
            </Button>
          )}

        </Stack>
      </Paper>
    </Box>
  )
}

export default IndividualBlog