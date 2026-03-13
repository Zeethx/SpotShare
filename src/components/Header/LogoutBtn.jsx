import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import { getAuth, signOut } from 'firebase/auth'
import { Button } from '../'

function LogoutBtn() {

    const dispatch = useDispatch()


    const handleLogout = async (e) => {
        e.preventDefault()
        const auth = getAuth()
        await signOut(auth)
        dispatch(logout())
    }
  return (
    <Button type="submit "text="Logout" className='font-bold rounded-lg text-sm px-4 py-2 text-center  dark:hover:text-primary-color' 
    onClick={handleLogout}/>
  )
}

export default LogoutBtn