import React, { useEffect } from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { useValue } from '../../context/ContextProvider'

const ctrl = new MapboxGeocoder({
    marker: false,
    accessToken: process.env.REACT_APP_MAP_TOKEN
})

const GeocoderInput = () => {
    const {mapRef, searchRef, dispatch} =useValue();

    useEffect(()=>{
        if(searchRef?.current?.children[0]){
            searchRef.current.removeChild(searchRef.current.children[0])
        }
        searchRef.current.appendChild(ctrl.onAdd(mapRef.current.getMap())) // connects geo coder with the map

        ctrl.on('result', (e)=>{
            const coords = e.result.geometry.coordinates
            dispatch({
                type:'FILTER_ADDRESS',
                payload:{lng:coords[0], lat:coords[1]}
            })
        })

         ctrl.on('clear', ()=> dispatch({type:'CLEAR_ADDRESS'}))
    }, [])

  return (
    null
  )
}

export default GeocoderInput