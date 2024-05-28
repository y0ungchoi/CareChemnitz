import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";

export default function Maps() {
  const mapkey = import.meta.env.VITE_MAPS_API_KEY;
  return (
    <div style={{ height: "500px", width: "500px", position: "absolute" }}>
      <APIProvider
        apiKey={mapkey}
        libraries={["marker"]}
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
        ></Map>
      </APIProvider>
    </div>
  );
}
