import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import { HeartIcon, HomeIcon } from "@heroicons/react/24/outline";

interface Route {
  summary: string;
  legs: google.maps.DirectionsLeg[];
}

function RoutesDirections({
  onRoutesFetched,
  routeIndex,
}: {
  onRoutesFetched: (routes: Route[]) => void;
  routeIndex: number;
}) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [alertShown, setAlertShown] = useState(false);
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);
  const navigate = useNavigate();

  const homeLocation = JSON.parse(
    sessionStorage.getItem("homeLocation") || "null"
  );
  const favLocation = JSON.parse(
    sessionStorage.getItem("favLocation") || "null"
  );

  useEffect(() => {
    if (!homeLocation || !favLocation) {
      if (!alertShown) {
        alert("Please set your home and favorite locations");
        setAlertShown(true);
      }
      navigate("/profile");
      return;
    }

    if (!routesLibrary || !map) return;
    const service = new routesLibrary.DirectionsService();
    const renderer = new routesLibrary.DirectionsRenderer({ map });
    setDirectionsService(service);
    setDirectionsRenderer(renderer);
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService.route(
      {
        origin: { lat: homeLocation.lat, lng: homeLocation.lng },
        destination: { lat: favLocation.lat, lng: favLocation.lng },
        travelMode: google.maps.TravelMode.WALKING,
        provideRouteAlternatives: true,
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
          onRoutesFetched(response?.routes as Route[]);
        }
      }
    );

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  return null;
}

export default function Directions() {
  const mapkey = import.meta.env.VITE_MAPS_API_KEY as string;
  const [routes, setRoutes] = useState<Route[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  const handleRoutesFetched = (routes: Route[]) => {
    setRoutes(routes);
  };

  return (
    <main className="h-[calc(100vh-theme('spacing.27'))]">
      <div className="mx-auto max-w-7xl py-6 px-6 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 py-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Directions
          </h1>
        </div>
        <section aria-labelledby="products-heading" className="pb-6 pt-6">
          <div className="grid grid-cols-1 gap-x-8 md:grid-cols-3">
            <div className="md:col-span-2 relative w-full pb-[75%]">
              <div className="absolute inset-0">
                <APIProvider apiKey={mapkey}>
                  <Map
                    defaultZoom={13}
                    defaultCenter={{
                      lat: 50.82765448060148,
                      lng: 12.921883532093682,
                    }}
                  >
                    <RoutesDirections
                      onRoutesFetched={handleRoutesFetched}
                      routeIndex={routeIndex}
                    />
                  </Map>
                </APIProvider>
              </div>
            </div>
            <div className="md:col-span-1 p-4 mb-7 bg-white shadow rounded-lg">
              {selected && leg ? (
                <div className="directions space-y-4">
                  <h2 className="text-xl font-semibold">{selected.summary}</h2>
                  <p className="flex">
                    <HomeIcon className="flex-shrink-0 text-main mr-1 w-5" />
                    {leg.start_address.split(",")[0]} to{" "}
                    <HeartIcon className="flex-shrink-0 text-main mx-1 w-5" />
                    {leg.end_address.split(",")[0]}
                  </p>
                  <p>Distance: {leg.distance?.text}</p>
                  <p>Duration: {leg.duration?.text} by walk</p>

                  <h2 className="text-lg font-semibold">Other Routes</h2>
                  <ul className="space-y-2">
                    {routes.map((route, index) => (
                      <li key={route.summary}>
                        <button
                          onClick={() => setRouteIndex(index)}
                          className="text-main underline"
                        >
                          {route.summary}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>Loading routes...</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
