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

type userInfo = { collections: string[] };

const colorMarker: { [key: string]: string } = {
  Jugendberufshilfen: "red",
  Kindertageseinrichtungen: "blue",
  Schulen: "green",
  Schulsozialarbeit: "yellow",
};

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
  const [loading, setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState<userInfo>({
    collections: [],
  });

  useEffect(() => {
    async function getFacilities(collections: string[]) {
      setLoading(true);
      const response = await fetch("http://localhost:5050/map/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collections }),
      });
      if (!response.ok) {
        console.error("Failed to fetch facilities data");
        setLoading(false);
        return;
      }
      const geojsonData = await response.json();
      setGeojsonData(geojsonData);
      setLoading(false);
    }
    if (userInfo.collections.length > 0) {
      getFacilities(userInfo.collections);
    } else {
      setGeojsonData(null);
    }
  }, [userInfo.collections]);

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

  const handleChange = (e: { target: { value: any; checked: any } }) => {
    const { value, checked } = e.target;
    const { collections } = userInfo;

    if (checked) {
      setUserInfo({
        collections: [...collections, value],
      });
    } else {
      setUserInfo({
        collections: collections.filter((e) => e !== value),
      });
    }
  };

  return (
    <div>
      <form>
        <div className="row">
          <div className="col-md-6">
            {Object.keys(colorMarker).map((name) => (
              <div className="form-check m-3" key={name}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="collections"
                  value={name}
                  id={`checkbox-${name}`}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor={`checkbox-${name}`}
                >
                  &nbsp; {name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>

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
                    icon={{
                      url: `http://maps.google.com/mapfiles/ms/icons/${
                        colorMarker[geojson.name]
                      }-dot.png`,
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
