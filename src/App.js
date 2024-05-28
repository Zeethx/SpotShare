import './App.css';
import React, {useEffect, useCallback} from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import { useDispatch } from 'react-redux';
import { login } from './store/authSlice';
import { Loader } from './components';
import { useUser } from './hooks/useUser';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const { user } = useUser();

  const checkUser = useCallback(async () => {
    if (user) {
      const idToken = await user.getIdToken();
      localStorage.setItem('token', idToken);
      dispatch(login({ email: user.email, uid: user.uid }));
    }
  }, [user, dispatch]);
  
  useEffect(() => {
    checkUser();
    console.log(user);
    setLoading(false);
  }, [user, checkUser]); 

  if (loading) {
    return <Loader />;
  }


  return (
    <>
        <Header />
        <main>
        <Outlet />
        </main>

    </>


  );
}

export default App;
