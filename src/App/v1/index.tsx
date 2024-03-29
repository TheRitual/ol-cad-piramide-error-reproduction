import { FC, useEffect, useRef } from "react";
import { mapContainerCSS } from "../style";
import { Map as OlMap } from "ol";
import configureMap from "../utils/configure-map";
import useGetData from "../utils/useGetData";
import addDWGLayer from "../utils/add-dwg-layer";

const myMap = new OlMap();

const SourceV1: FC = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef<OlMap>(myMap);
  const { data, status } = useGetData({ url: "/v1/metadata.json" });

  useEffect(() => {
    if (mapContainerRef.current) {
      configureMap({
        map: mapRef.current,
        target: mapContainerRef.current,
      })
    }
  }, [mapContainerRef.current]);

  useEffect(() => {
    if (status === "SUCCESS") {
      data && addDWGLayer({ map: mapRef.current, metadata: data, url: "http://localhost:5173/v1/{z}/{x}/{y}.png" })
    }
  }, [status])

  return <div style={mapContainerCSS} ref={mapContainerRef} />
}

export default SourceV1;