import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Stroke, Style } from "ol/style";
import { WKT } from "ol/format";
import "./map.css";

const MapComponent = ({ wktData }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  const createMap = (wktLine) => {
    if (!mapRef.current || !wktLine) {
      return;
    }

    if (mapInstance.current) {
      mapInstance.current.setTarget(null);
      mapInstance.current.dispose();
    }

    const raster = new TileLayer({
      source: new OSM(),
    });

    const format = new WKT();

    const lineFeature = format.readFeature(wktLine, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857",
    });


    const lineStyle = new Style({
      stroke: new Stroke({
        color: "red", 
        width: 2, 
      }),
    });

    lineFeature.setStyle(lineStyle); 

    const lineCoordinates = lineFeature.getGeometry().getCoordinates();
    const lineMidpoint = [
      (lineCoordinates[0][0] + lineCoordinates[1][0]) / 2,
      (lineCoordinates[0][1] + lineCoordinates[1][1]) / 2,
    ];

    const map = new Map({
      layers: [
        raster,
        new VectorLayer({
          source: new VectorSource({ features: [lineFeature] }),
        }),
      ],
      target: mapRef.current,
      view: new View({
        center: lineMidpoint,
        zoom: 17,
      }),
    });

    mapInstance.current = map;
  };

  useEffect(() => {
    createMap(wktData);
  }, [wktData]);

  return <div ref={mapRef} className={`${wktData ? "map-container": ""} `} ></div>;
};

export default MapComponent;
