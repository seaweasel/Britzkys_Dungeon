import React from 'react';
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ClassesModal } from '../components/ClassesModal';




export const Classes = () => {
  
  const { authUser } = useAuth();
  const navigate = useNavigate();

  if (!authUser) {
    navigate('signin')
  }
  
  return (
  <>
  <ClassesModal />
  </>  
  )
}
