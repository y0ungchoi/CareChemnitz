import { GeojsonResponse, GeojsonFeature } from "./Maps";

function Facility({
  feature,
  name,
}: {
  feature: GeojsonFeature;
  name: string;
}) {
  let facilityName = feature.properties.TRAEGER;
  let address = `${feature.properties.STRASSE}, ${feature.properties.PLZ} ${feature.properties.ORT}`;
  let contact = feature.properties.TELEFON;
  let website = "";
  let creator = "GISAdminChemnitz";

  if (name === "Schulen") {
    facilityName = feature.properties.BEZEICHNUNG;
    contact = `${contact}, ${feature.properties.EMAIL}`;
    website = feature.properties.WWW;
  } else if (name === "Kindertageseinrichtungen") {
    let old = feature.properties.BEZEICHNUNG;
    facilityName = old.substring(old.indexOf('"') + 1, old.lastIndexOf('"'));
    address = `${feature.properties.STRASSE} ${feature.properties.HAUSBEZ}, ${feature.properties.PLZ} ${feature.properties.ORT}`;
    contact = `${feature.properties.TELEFON}, ${feature.properties.EMAIL}`;
    website = feature.properties.URL;
  }

  return (
    // <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    //   <td className="p-4 align-middle">{name}</td>
    //   <td className="p-4 align-middle">{facilityName}</td>
    //   <td className="p-4 align-middle">{address}</td>
    //   <td className="p-4 align-middle">{contact}</td>
    //   <td className="p-4 align-middle">{feature.geometry.coordinates[0]}</td>
    //   <td className="p-4 align-middle">{feature.geometry.coordinates[1]}</td>
    // </tr>

    <li className="flex justify-between gap-x-6 py-5 hover:bg-gray-200">
      <div className="flex min-w-0 gap-x-4">
        <a className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {facilityName}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {name}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {address}
          </p>
        </a>
      </div>
    </li>
  );
}

type SlidePanelProps = {
  geojsonData: GeojsonResponse | null;
  loading: boolean;
};

export default function SlidePanel({ geojsonData, loading }: SlidePanelProps) {
  const facilityList = () => {
    if (!geojsonData) {
      return (
        <li className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                No data available
              </p>
            </div>
          </div>
        </li>
      );
    }
    return geojsonData.flatMap((geojson, index) =>
      geojson.features.map((feature, featureIndex) => (
        <Facility
          feature={feature}
          name={geojson.name}
          key={`${index}-${featureIndex}`}
        />
      ))
    );
  };

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {facilityList()}
    </ul>
  );
}
