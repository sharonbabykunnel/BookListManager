import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  TextField, 
  Button, 
  Alert
} from '@mui/material';
import { addBook } from '../../utils/bookSlice';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const status = useSelector((state) => state.books.status);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Book title is required');
      return;
    }
    if (!author.trim()) {
      setError('Author name is required');
      return;
    }

    const newBook = {
      title: title.trim(),
      author: author.trim()
    };

    dispatch(addBook(newBook));

    setTitle('');
    setAuthor('');
    setError('');
  };

  return (
    <Card variant="outlined">
      <CardHeader 
        title="Add New Book" 
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {error && (
              <div className="mb-4">
                <Alert severity="error">{error}</Alert>
              </div>
            )}
            <div>
              <TextField
                label="Book Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError('');
                }}
                disabled={status === 'loading'}
                fullWidth
                variant="outlined"
                required
              />
            </div>
            <div>
              <TextField
                label="Author Name"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                  setError('');
                }}
                disabled={status === 'loading'}
                fullWidth
                variant="outlined"
                required
              />
            </div>
            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<AddIcon />}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Adding Book...' : 'Add Book'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookForm;
