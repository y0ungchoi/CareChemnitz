import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  Marker,
} from "@vis.gl/react-google-maps";

type GeojsonFeature = {
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    TRAEGER: string;
    STRASSE: string;
    X: string;
    Y: string;
  };
};

type GeojsonData = {
  type: string;
  name: string;
  features: GeojsonFeature[];
};

type GeojsonResponse = GeojsonData[];

function Facility({ feature }: { feature: GeojsonFeature }) {
  return (
    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <td className="p-4 align-middle">{feature.properties.TRAEGER}</td>
      <td className="p-4 align-middle">{feature.properties.STRASSE}</td>
      <td className="p-4 align-middle">{feature.geometry.coordinates[0]}</td>
      <td className="p-4 align-middle">{feature.geometry.coordinates[1]}</td>
    </tr>
  );
}

export default function Maps() {
  const mapkey = import.meta.env.VITE_MAPS_API_KEY;

  const [geojsonData, setGeojsonData] = useState<GeojsonResponse | null>(null);
  const [featureCollection, setFeatureCollection] =
    useState("Schulsozialarbeit");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFacilities(featureCollection: string) {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5050/map/${featureCollection}`
      );
      if (!response.ok) {
        console.error("Failed to fetch facilities data");
        setLoading(false);
        return;
      }
      const geojsonData = await response.json();
      setGeojsonData(geojsonData);
      setLoading(false);
    }
    getFacilities(featureCollection);
  }, [featureCollection]);

  const facilityList = () => {
    if (!geojsonData) {
      return (
        <tr>
          <td colSpan={4}>No data available</td>
        </tr>
      );
    }

    return geojsonData.flatMap((geojson, index) =>
      geojson.features.map((feature, featureIndex) => (
        <Facility feature={feature} key={`${index}-${featureIndex}`} />
      ))
    );
  };

  return (
    <div>
      <select
        onChange={(e) => setFeatureCollection(e.target.value)}
        value={featureCollection}
      >
        <option value="Jugendberufshilfen">Jugendberufshilfen</option>
        <option value="Kindertageseinrichtungen">
          Kindertageseinrichtungen
        </option>
        <option value="Schulen">Schulen</option>
        <option value="Schulsozialarbeit">Schulsozialarbeit</option>
      </select>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  TRAEGER
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  STRASSE
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  x
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  y
                </th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
              {loading ? (
                <tr>
                  <td colSpan={4}>Loading...</td>
                </tr>
              ) : (
                facilityList()
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ height: "500px", width: "500px", position: "relative" }}>
        <APIProvider
          apiKey={mapkey}
          onLoad={() => console.log("Maps API has loaded.")}
        >
          <Map
            defaultZoom={13}
            defaultCenter={{ lat: 50.82765448060148, lng: 12.921883532093682 }}
            onCameraChanged={(ev: MapCameraChangedEvent) =>
              console.log(
                "camera changed:",
                ev.detail.center,
                "zoom:",
                ev.detail.zoom
              )
            }
          >
            {!loading &&
              geojsonData?.flatMap((geojson) =>
                geojson.features.map((feature, index) => (
                  <Marker
                    key={index}
                    position={{
                      lat: feature.geometry.coordinates[1],
                      lng: feature.geometry.coordinates[0],
                    }}
                  />
                ))
              )}
          </Map>
        </APIProvider>
      </div>
    </div>
  );
}
