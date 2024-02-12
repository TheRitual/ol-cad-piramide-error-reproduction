import { Map as OlMap } from "ol";
import { WebGLTile } from "ol/layer";
import Metadata from "../types/metadata.type";
import XYZ from "ol/source/XYZ";
import TileGrid from "ol/tilegrid/TileGrid";
import convertMetadata from "./convert-metadata";
// import { ceil, clamp, floor } from 'ol/math.js';
// import { toSize } from 'ol/size.js';
// import { createOrUpdate as createOrUpdateTileCoord } from 'ol/tilecoord.js';
// import tileurlfunction from 'ol/tileurlfunction';

// const DECIMALS = 5;

interface AddDWGLayerProps {
  map: OlMap;
  metadata: Metadata;
  url: string;
  originZero?: boolean;
}




// const createFromTemplate_ = (template: string, tileGrid: any) => {
//   const zRegEx = /\{z\}/g;
//   const xRegEx = /\{x\}/g;
//   const yRegEx = /\{y\}/g;
//   const dashYRegEx = /\{-y\}/g;
//   return (
//     /**
//      * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
//      * @param {number} pixelRatio Pixel ratio.
//      * @param {import("./proj/Projection.js").default} projection Projection.
//      * @return {string|undefined} Tile URL.
//      */
//     function (tileCoord: any, pixelRatio: any, projection: any) {
//       if (!tileCoord) {
//         return undefined;
//       }
//       const _template = template
//         .replace(zRegEx, tileCoord[0].toString())
//         .replace(xRegEx, tileCoord[1].toString())
//         .replace(yRegEx, tileCoord[2].toString())
//         .replace(dashYRegEx, function () {
//           const z = tileCoord[0];
//           const range = tileGrid.getFullTileRange(z);
//           if (!range) {
//             throw new Error(
//               'The {-y} placeholder requires a tile grid with extent'
//             );
//           }
//           const y = range.getHeight() - tileCoord[2] - 1;
//           return y.toString();
//         })
//       console.log({ _template });

//       return _template;
//     }
//   );
// }

// const myTilingUrl = { ...tileurlfunction, createFromTemplate_ }

// export { myTilingUrl };

// function linearFindNearest(arr: any, target: any, direction: any) {
//   console.log({ arr, target, direction })
//   if (arr[0] <= target) {
//     return 0;
//   }

//   const n = arr.length;
//   if (target <= arr[n - 1]) {
//     return n - 1;
//   }

//   if (typeof direction === 'function') {
//     for (let i = 1; i < n; ++i) {
//       const candidate = arr[i];
//       if (candidate === target) {
//         return i;
//       }
//       if (candidate < target) {
//         if (direction(target, arr[i - 1], candidate) > 0) {
//           return i - 1;
//         }
//         return i;
//       }
//     }
//     return n - 1;
//   }

//   if (direction > 0) {
//     for (let i = 1; i < n; ++i) {
//       if (arr[i] < target) {
//         return i - 1;
//       }
//     }
//     return n - 1;
//   }

//   if (direction < 0) {
//     for (let i = 1; i < n; ++i) {
//       if (arr[i] <= target) {
//         return i;
//       }
//     }
//     return n - 1;
//   }

//   for (let i = 1; i < n; ++i) {
//     if (arr[i] == target) {
//       return i;
//     }
//     if (arr[i] < target) {
//       if (arr[i - 1] - target < target - arr[i]) {
//         return i - 1;
//       }
//       return i;
//     }
//   }
//   return n - 1;
// }

class CustomTileGrid extends TileGrid {
  // private resolutions: number[]

  constructor(options: any) {
    super(options);
    // this.resolutions = options.resolutions;
  }
  // getMinZoom() {
  //   return -5;
  // }
  // getMaxZoom() {
  //   return 5;
  // }
  // getZForResolution(resolution: any, opt_direction?: any) {
  //   const z = linearFindNearest(
  //     this.resolutions,
  //     resolution,
  //     opt_direction || 0
  //   );

  //   const clampeded = clamp(z, -5, this.maxZoom)
  //   console.log("getZForResolution", { "z": z, "clamp": clampeded });
  //   return clampeded;
  // }

  // getTileCoordForXYAndResolution__(
  //   x: any,
  //   y: any,
  //   resolution: any,
  //   reverseIntersectionPolicy: any,
  //   opt_tileCoord: any,
  // ) {
  //   const z = this.getZForResolution(resolution);
  //   const scale = resolution / this.getResolution(z);
  //   const origin = this.getOrigin(z);
  //   const tileSize = toSize(this.getTileSize(z), [0, 0]);

  //   let tileCoordX = (scale * (x - origin[0])) / resolution / tileSize[0];
  //   let tileCoordY = (scale * (origin[1] - y)) / resolution / tileSize[1];

  //   if (reverseIntersectionPolicy) {
  //     tileCoordX = ceil(tileCoordX, DECIMALS) - 1;
  //     tileCoordY = ceil(tileCoordY, DECIMALS) - 1;
  //   } else {
  //     tileCoordX = floor(tileCoordX, DECIMALS);
  //     tileCoordY = floor(tileCoordY, DECIMALS);
  //   }
  //   return createOrUpdateTileCoord(z, tileCoordX, tileCoordY, opt_tileCoord);
  // }

  // getTileCoordForCoordAndResolution(coordinate: any, resolution: any, opt_tileCoord: any) {
  //   const a = this.getTileCoordForXYAndResolution__(
  //     coordinate[0],
  //     coordinate[1],
  //     resolution,
  //     false,
  //     opt_tileCoord
  //   );
  //   const z = a[0] - 5;
  //   console.log("getTileCoordForCoordAndResolution", [z, a[1], a[2]]);
  //   return [z, a[1], a[2]];
  // }
}

// function getResolutionForFolder(folderName: any) {
//   // Zakładając, że nazwy folderów są w zakresie od -5 do 5
//   const folderIndex = parseInt(folderName, 10); // Konwersja nazwy folderu na liczbę
//   const index = folderIndex + 5; // Przesunięcie, aby dopasować do indeksu w tablicy rozdzielczości
//   return resolutions[index];
// }

function tileUrlFunction(zoom: any, x: any, y: any) {
  console.log({ zoom, x, y });
  return ""

  // // Tutaj przelicz odpowiedni folder na podstawie zoom
  // const folderName = zoom.toString();
  // const resolution = getResolutionForFolder(folderName); // Zakładając, że ta funkcja istnieje

  // // Konstruowanie URL na podstawie przeliczonego folderu i współrzędnych kafelka
  // // Zakładamy, że struktura URL to https://example.com/tiles/{folder}/{z}/{x}/{y}.png
  // const url = `https://example.com/tiles/${folderName}/${zoom}/${x}/${y}.png`;
  // return url;
}



const addDWGLayer = ({ map, metadata, url, originZero }: AddDWGLayerProps) => {
  const { extent, origin, resolutions, tileSize, center } = convertMetadata({ meta: metadata });
  console.log(`zoom: ${map.getView().getZoom()}`)
  console.log({ "map": map, "metadata": metadata, "url": url, "originZero": originZero });

  const tileGrid = new CustomTileGrid({
    extent: extent,
    origin: originZero ? [0, 0] : origin,
    resolutions: resolutions,
    tileSize: tileSize,
  });

  const dataTileSource = new XYZ({
    tileUrlFunction: (tileCoord: any) => {
      console.log("tileUrlFunction", { "tileCoord": tileCoord, "resolutions": resolutions });
      const grid = tileGrid;
      const mapSize = map.getSize()
      const extent = map.getView().calculateExtent(mapSize);
      const zoom = map.getView().getZoom();
      console.log("tileUrlFunction", { "grid": grid, "mapSize": mapSize, "extent": extent, "zoom": zoom });
      // const z = tileCoord[0];
      // const x = tileCoord[1];
      // const y = -tileCoord[2] - 1;
      // const url_ = `http://localhost:5173/v4/${z}/${x}/${y}.png`;
      const url_ = `http://localhost:5173/v4/1/1/1.png`;
      // grid.forEachTileCoord(extent, zoom, function (tileCoord: any) {
      grid.forEachTileCoord(extent, 0, function (tileCoord: any) {

        console.log("tileUrlFunction forEachTileCoord", { "extent": extent, "zoom": zoom, "tileCoord": tileCoord, });
      });
      return url_;
      // return tileUrlFunction(z, x, y);
    },
    tileLoadFunction: function (imageTile: any, src: any) {
      const coordinates = imageTile.getTileCoord();
      console.log("tileLoadFunction", { "imageTile": imageTile, "src": src, "coordinates": coordinates });
      imageTile.getImage().src = src;
    },
    tileGrid: tileGrid,
    // url,
    crossOrigin: "anonymous",
    projection: "EPSG:2178",
  });

  const tileLayer = new WebGLTile({
    source: dataTileSource
  });

  map.addLayer(tileLayer);

  console.log({ tileLayer, max: tileLayer.getMaxZoom(), min: tileLayer.getMinZoom() });
  console.log({ tileGrid, max: tileGrid.getMaxZoom(), min: tileGrid.getMinZoom() });
  map.getView().setCenter(center);
}

export default addDWGLayer;