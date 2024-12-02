import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, setCurrentPage } from "../../utils/bookSlice";
import { 
  Typography, 
  Card, 
  CardContent, 
  CardHeader,
  List, 
  ListItem, 
  ListItemText, 
  Box, 
  Alert,
  Pagination, 
} from '@mui/material';

const BookList = () => {
  const dispatch = useDispatch();
  const { items: books, status, pagination } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks({
      page: pagination.currentPage,
      limit: pagination.limit
    }));
  }, [dispatch, pagination.currentPage]);

  const handlePageChange = (event, value) => {
    dispatch(setCurrentPage(value));
  };

  return (
    <Card variant="outlined">
      <CardHeader 
        title="Book Collection" 
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        {status === 'loading' ? (
          <Typography variant="body1" color="textSecondary" align="center">
            Loading books...
          </Typography>
        ) : books.length === 0 ? (
          <Alert severity="info">
            No books in the collection. Start adding some!
          </Alert>
        ) : (
          <>
            <List className=" overflow-scroll h-[30vh] md:h-[66vh] scrollbar-hide">
              {books.map((book) => (
                <ListItem key={book._id || book.title} divider>
                  <ListItemText
                    primary={book.title}
                    secondary={`by ${book.author}`}
                  />
                </ListItem>
              ))}
            </List>
            {pagination.totalBooks > pagination.limit && (
              <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                  count={pagination.totalPages}
                  page={pagination.currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  variant="outlined"
                  shape="rounded"
                />
              </Box>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BookList