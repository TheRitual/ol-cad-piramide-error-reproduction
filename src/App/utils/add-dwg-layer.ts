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
  console.log(`zoom: ${map.getView().getZoom()}`)
  console.log({ "map": map, "metadata": metadata, "url": url, "originZero": originZero });

  const tileGrid = new TileGrid({
    extent: extent,
    origin: originZero ? [0, 0] : origin,
    resolutions: resolutions,
    tileSize: tileSize,
  });

  const dataTileSource = new XYZ({
    tileUrlFunction: function (coordinate) {
      const resolution = resolutions[coordinate[0]];
      const z = Math.log(resolution) / Math.log(2) * -1;
      console.log({
        url: url,
        resolution: resolution,
        coordinates: coordinate,
        z: z
      });
      const base_url = url.split("/").slice(0, 4).join("/")
      let new_url = [base_url, coordinate[0], coordinate[1], coordinate[2]].join("/") + '.png';
      if (base_url.endsWith("v3")) {
        new_url = [base_url, z, coordinate[1], coordinate[2]].join("/") + '.png';
      }
      // new_url = [base_url, "frame"].join("/") + '.png';
      console.log({ "tileUrlFunction": new_url });
      return new_url;
    },
    // tileLoadFunction: async function (imageTile: any, src: any) {
    //   imageTile.getImage().src = src;
    //   const coordinates = imageTile.getTileCoord();
    //   console.log("tileLoadFunction", { imageTile: imageTile, getImage: imageTile.getImage(), src: src, coordinates: coordinates });
    // },
    tileGrid: tileGrid,
    crossOrigin: "anonymous",
    projection: "EPSG:2178",
  });
  const tileLayer = new WebGLTile({
    source: dataTileSource,
  });
  map.addLayer(tileLayer);
  map.getView().setCenter(center);
}

export default addDWGLayer;