import { useState } from 'react'
import {
  TextField,
  Button,
  Stack,
  Typography,
  Box,
  Paper
} from '@mui/material'

const CreateBlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleCreateBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

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
        <form onSubmit={addBlog}>
          <Stack spacing={2}>
            <Typography variant="h5" align="center">
              Create new blog
            </Typography>

            <TextField
              label="Title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />

            <TextField
              label="Author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />

            <TextField
              label="Url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />

            <Button type="submit" variant="contained">
              Save
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  )
}

export default CreateBlogForm