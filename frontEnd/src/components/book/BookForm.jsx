import { 
    Container, 
    Typography, 
    Card, 
    CardContent, 
    CardHeader, 
    TextField, 
    Button, 
    List, 
    ListItem, 
    ListItemText, 
    Box, 
    Alert 
  } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '../../utils/bookSlice';

const BookForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const dispatch = useDispatch();
    const status = useSelector((state) => state.books.status);
  console.log(status)
    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Basic validation
      if (!title.trim() || !author.trim()) {
        alert('Please enter both title and author');
        return;
      }
  
      const newBook = {
        title: title.trim(),
        author: author.trim()
      };
  
      dispatch(addBook(newBook));
      
      // Reset form
      setTitle('');
      setAuthor('');
    };
  
    return (
      <Card sx={{ maxWidth: 500, margin: 'auto', mt: 2 }}>
        <CardHeader title="Add New Book" />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter book title"
              disabled={status === 'loading'}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              disabled={status === 'loading'}
              fullWidth
              variant="outlined"
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Adding Book...' : 'Add Book'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  };
export default BookForm