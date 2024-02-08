import { Map as OlMap } from "ol";
import { WebGLTile } from "ol/layer";
import Metadata from "../types/metadata.type";
import XYZ from "ol/source/XYZ";
import TileGrid from "ol/tilegrid/TileGrid";
import convertMetadata from "./convert-metadata";

interface AddDWGLayerProps {
  map: OlMap;
  metadata: Metadata;
  url: string;
  originZero?: boolean;
}
const addDWGLayer = ({ map, metadata, url, originZero }: AddDWGLayerProps) => {
  const { extent, origin, resolutions, tileSize, center } = convertMetadata({ meta: metadata });

  const tileGrid = new TileGrid({
    extent: extent,
    origin: originZero ? [0, 0] : origin,
    resolutions: resolutions,
    tileSize: tileSize,
  });

  const dataTileSource = new XYZ({
    tileGrid: tileGrid,
    url,
    crossOrigin: "anonymous",
    projection: "EPSG:2178"
  });

  const tileLayer = new WebGLTile({
    source: dataTileSource
  });

  map.addLayer(tileLayer);

  console.log({ tileLayer });

  map.getView().setCenter(center);
}

export default addDWGLayer;