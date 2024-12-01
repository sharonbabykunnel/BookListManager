import BookForm from './BookForm';
import BookList from './BookList';
const BookManagement = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-xl">
          <h1 className="text-3xl font-bold text-center mb-6">Book Management App</h1>
          <BookForm />
          <div className="mt-6">
            <BookList />
          </div>
        </div>
    );
  };
  
  export default BookManagement;