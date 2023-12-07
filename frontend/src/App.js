
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Sidebar from './Components/Sidebar';
import Feeds from './Components/Feeds';
import Profile from './Components/Profile';
import ProtectedRoute from './Components/ProtectedRoute';
import { useAuthContext } from './context/authContext';
import Loading from './Components/Loading';
import SingleUserProfile from './Components/SingleUserProfile';

function App() {

  // ! import the isLoading state variable from authContext
  //  isloading state variable authContext wali file se aa rha hai 
  const { isLoading } = useAuthContext()


  // ! when the isLoading is true, then return the Loading component
  // job isLoading true hoga to ye return krega Loading Component ko 
  if (isLoading) {

    return <Loading />
  }
  return (

    <>

      {/* // ! toast container that shows the messages */}
      <ToastContainer />
      <div className='App'>
        <Routes>



          {/* // ! nested routes */}
          <Route path='/' element={<Home />}>
            {/* // ! these routes will be shown in the <Outlet /> component */}
            {/* ye routes show honge <Outlet> component mai  */}
            <Route index element={<Feeds />} />


            {/* // ! profile route that shows the logged in user's details */}
            {/* Profile show krega Logged in user ki details ko  */}
            <Route path='profile' element={<Profile />} />



            {/* // ! unique id for every profile coming from mongodb _id field */}
            {/* unique Id saari profile jo Database se aa rhi hai mongodb_id */}
            <Route path='/profile/:id' element={<SingleUserProfile />} />

          </Route>

          {/* // ! register component is wrapped with ProtectedRoute */}

          <Route path='/register' element={<ProtectedRoute>
            <Register />
          </ProtectedRoute>
          } />
          {/* // ! login component is wrapped with ProtectedRoute */}
          <Route path='/login' element={<ProtectedRoute>
            <Login />
          </ProtectedRoute>} />

        </Routes>

      </div>
    </>
  );
}

export default App;
