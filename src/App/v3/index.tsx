import { FC, useEffect, useRef } from "react";
import { mapContainerCSS } from "../style";
import { Map as OlMap } from "ol";
import configureMap from "../utils/configure-map";
import useGetData from "../utils/useGetData";
import addDWGLayer from "../utils/add-dwg-layer";

const myMap = new OlMap();

const SourceV3: FC = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef<OlMap>(myMap);
  const { data, status } = useGetData({ url: "/v3/metadata.json" });

  useEffect(() => {
    if (mapContainerRef.current) {
      configureMap({
        map: mapRef.current,
        target: mapContainerRef.current,
      })
    }
  }, [mapContainerRef.current]);

  useEffect(() => {
    // var resolutions = [
    //   1.0,
    //   0.5,
    //   0.25,
    //   0.125,
    //   0.0625,
    //   0.03125
    // ]
    // console.log("v3 resolutions before", resolutions)
    // var maxResolution = 1
    // var resolutions2 = []
    // for (var i = -5; i <= 5; i++) {
    //   resolutions2.push(maxResolution / Math.pow(2, i));
    // }
    // console.log("v3 resolutions after", resolutions2, data)
    if (status === "SUCCESS") {
      data && addDWGLayer({ map: mapRef.current, metadata: data, url: "http://localhost:5173/v3/{z}/{x}/{y}.png", originZero: true })
    }
  }, [status])

  return <div style={mapContainerCSS} ref={mapContainerRef} />
}

export default SourceV3;