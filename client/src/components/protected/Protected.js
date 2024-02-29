import React from 'react'
import { useValue } from '../../context/ContextProvider'
import ProtectMessage from './ProtectMessage'

const Protected = ({children}) => {
    const {state: {currentUser}} = useValue()
  return (
    currentUser ? children : <ProtectMessage/>
  )
}

export default Protected