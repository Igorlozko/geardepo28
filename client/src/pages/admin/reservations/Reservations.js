import React, { useEffect } from 'react'

const Reservations = ({setSelectedLink, link}) => {

    useEffect(()=>{
        setSelectedLink(link);
    },[]);

  return (
    <div>Reservations</div>
  )
}

export default Reservations