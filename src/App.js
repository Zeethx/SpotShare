import './App.css';
import React, {useEffect, useCallback} from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import { useDispatch } from 'react-redux';
import { login } from './store/authSlice';
import { Loader } from './components';
import { useUser } from './hooks/useUser';
import { Toaster } from 'react-hot-toast'; // Import react-hot-toast


function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const { user } = useUser();

  const checkUser = useCallback(async () => {
    if (user) {
      // Token is managed by Firebase SDK and fetched per-request in axiosConfig.js
      // Do NOT store it in localStorage — keep it in memory only
      dispatch(login({ email: user.email, uid: user.uid }));
    }
    setLoading(false);
  }, [user, dispatch]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  if (loading) {
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
