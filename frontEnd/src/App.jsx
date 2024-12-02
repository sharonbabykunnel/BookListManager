import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Modal from 'react-modal';

Modal.setAppElement('#root');



function App() {
  return (
    <div className="relative max-h-screen">
      <ToastContainer />
      <div >
        <Outlet />
      </div>
    </div>
  );
}

export default App;