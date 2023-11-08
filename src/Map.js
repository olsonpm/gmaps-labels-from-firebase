import './Map.css'
import { useEffect, useRef } from 'react'
import { initializeApp } from 'firebase/app'
import {
  addDoc,
  collection,
  getFirestore,
  updateDoc,
  GeoPoint,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDGJ5fN76QzaCjT6nlx4Mp7CyqXwZ-yE88',
  authDomain: 'gmaps-labels-from-firebase.firebaseapp.com',
  projectId: 'gmaps-labels-from-firebase',
  storageBucket: 'gmaps-labels-from-firebase.appspot.com',
  messagingSenderId: '31823480958',
  appId: '1:31823480958:web:49851335a985555c8bb02f',
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const mapLabelsCol = collection(db, 'map-labels')
let prevDocRef
const labels = '123456789'
let labelIndex = 0

const Map = () => {
  const ref = useRef()

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center: {
        lat: 40.7128,
        lng: -73.935242,
      },
      zoom: 11,
    })

    const updateFirestore = async position => {
      try {
        const docRef = await addDoc(mapLabelsCol, {
          time: new Date(),
          location: new GeoPoint(position.lat(), position.lng()),
        })
        console.log('doc added', docRef.id)
        if (prevDocRef) {
          await updateDoc(prevDocRef, { next: docRef })
          console.log('prev doc updated', prevDocRef.id)
        }
        prevDocRef = docRef
      } catch (err) {
        console.error('updating firestore', err)
      }
    }

    const addMarker = position => {
      updateFirestore(position)
      new window.google.maps.Marker({
        position,
        label: labels[labelIndex++ % labels.length],
        map,
      })
    }

    window.google.maps.event.addListener(map, 'click', event => {
      addMarker(event.latLng)
    })
  }, [])

  return <div ref={ref} id="map" />
}

export default Map
