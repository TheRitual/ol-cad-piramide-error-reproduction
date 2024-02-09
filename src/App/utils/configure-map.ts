import { Map as OlMap, View } from "ol";
import { fromLonLat } from "ol/proj";
import OSM from 'ol/source/OSM';
import TileLayer from "ol/layer/WebGLTile";

interface ConfigureMapProps {
  map: OlMap;
  target: HTMLDivElement;
}
const configureMap = ({ map, target }: ConfigureMapProps) => {
  map.setTarget(target);

  const osmSource = new OSM();

  const tileLayer = new TileLayer({
    source: osmSource,
  });

  map.addLayer(tileLayer);

  const view = new View({
    center: fromLonLat([19.68, 53.661]),
    zoom: 18,
    projection: "EPSG:2178"
  });
  map.setView(view);
  map.getView().on("change:resolution", () => { console.log(`zoom: ${map.getView().getZoom()}`) })
}

export default configureMap;