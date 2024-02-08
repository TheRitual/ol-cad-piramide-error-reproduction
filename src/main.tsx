import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@fontsource/roboto';
import './index.css'
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';
import { get as getProjection } from "ol/proj";

proj4.defs("EPSG:2178", "+proj=tmerc +lat_0=0 +lon_0=21 +k=0.999923 +x_0=7500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs +axis=neu");

register(proj4);

console.log({ EPSG_2178: getProjection("EPSG:2178") })
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
