import './App.css';
import React, {useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import { useDispatch } from 'react-redux';
import { login } from './store/authSlice';
import { Loader } from './components';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      dispatch(login({ email: user.email, uid: user.uid }));
    }
    setLoading(false);
  }, [dispatch]);

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
