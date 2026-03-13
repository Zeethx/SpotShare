import './App.css';
import React, {useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import { useDispatch } from 'react-redux';
import { login } from './store/authSlice';
import { Loader } from './components';
import { useUser } from './hooks/useUser';
import { Toaster } from 'react-hot-toast'; // Import react-hot-toast


function App() {
  const dispatch = useDispatch();
  const { user, loading } = useUser();
  // authReady gates the Outlet — only true after dispatch(login) has run,
  // so ProtectedRoute never reads Redux before the auth status is set.
  const [authReady, setAuthReady] = React.useState(false);

  useEffect(() => {
    if (!loading) {
      if (user) dispatch(login({ email: user.email, uid: user.uid }));
      setAuthReady(true);
    }
  }, [loading, user, dispatch]);

  if (loading || !authReady) {
    return <Loader />;
  }


  return (
    <>
        <Header />
        <main>
        <Outlet />
        </main>
        <Toaster
        position="top-center"
        reverseOrder={false}
      />

    </>


  );
}

export default App;
