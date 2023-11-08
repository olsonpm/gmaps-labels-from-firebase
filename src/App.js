/* eslint-disable no-unused-vars */

import './App.css'
import { Wrapper } from '@googlemaps/react-wrapper'
import Map from './Map'

function App() {
  return (
    <div className="App">
      <h1>GMaps Labels From Firebase</h1>
      <Wrapper apiKey="AIzaSyCpr0fU362aesbdhM4ZgqCNnJ7piWnrN7E">
        <Map />
      </Wrapper>
    </div>
  )
}

export default App
