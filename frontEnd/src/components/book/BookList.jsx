import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, addBook } from '../../utils/bookSlice';
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
import { useEffect } from 'react';


const BookList = () => {
    const dispatch = useDispatch();
    const { items: books, status, error } = useSelector((state) => state.books);
  
    useEffect(() => {
        // Fetch books when component mounts
        dispatch(fetchBooks());
      }, [dispatch]);
    
      if (status === 'loading') {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" padding={2}>
            <Typography>Loading books...</Typography>
          </Box>
        );
      }

    //   if (status === 'failed') {
    //     return (
    //       <Alert severity="error">
    //         Error: {error}
    //       </Alert>
    //     );
    //   }
  
    return (
      <Card sx={{ maxWidth: 500, margin: 'auto' }}>
        <CardHeader title="Book Collection" />
        <CardContent>
          {books.length === 0 ? (
            <Typography align="center" color="textSecondary">
              No books in the collection.
            </Typography>
          ) : (
            <List>
              {books.map((book) => (
                <ListItem key={book.id} divider>
                  <ListItemText
                    primary={book.title}
                    secondary={`by ${book.author}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    );
  };

export default BookList