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
    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <td className="p-4 align-middle">{name}</td>
      <td className="p-4 align-middle">{facilityName}</td>
      <td className="p-4 align-middle">{address}</td>
      <td className="p-4 align-middle">{contact}</td>
      <td className="p-4 align-middle">{feature.geometry.coordinates[0]}</td>
      <td className="p-4 align-middle">{feature.geometry.coordinates[1]}</td>
    </tr>
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
        <tr>
          <td colSpan={6}>No data available</td>
        </tr>
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
    <div className="border-solid border-2 border-indigo-600">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&amp;_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
              Filter
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
              Name
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
              Address
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
              Contact
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
              <td colSpan={6}>Loading...</td>
            </tr>
          ) : (
            facilityList()
          )}
        </tbody>
      </table>
    </div>
  );
}
