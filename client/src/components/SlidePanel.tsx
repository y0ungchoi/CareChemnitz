import { GeojsonResponse, GeojsonFeature } from "./Maps";

function Facility({
  feature,
  name,
  handleFacilityClick,
}: {
  feature: GeojsonFeature;
  name: string;
  handleFacilityClick: () => void;
}) {
  let facilityName = feature.properties.TRAEGER;
  let address = `${feature.properties.STRASSE}, ${feature.properties.PLZ} ${feature.properties.ORT}`;

  if (name === "Schulen") {
    facilityName = feature.properties.BEZEICHNUNG;
  } else if (name === "Kindertageseinrichtungen") {
    let old = feature.properties.BEZEICHNUNG;
    facilityName = old.substring(old.indexOf('"') + 1, old.lastIndexOf('"'));
    address = `${feature.properties.STRASSE} ${feature.properties.HAUSBEZ}, ${feature.properties.PLZ} ${feature.properties.ORT}`;
  }

  return (
    <li className="flex justify-between gap-x-6 py-5 hover:bg-gray-200">
      <div className="flex min-w-0 gap-x-4">
        <a className="min-w-0 flex-auto" onClick={handleFacilityClick}>
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
  selectedFacility: { name: string; feature: GeojsonFeature } | null;
  setSelectedFacility: (
    facility: { name: string; feature: GeojsonFeature } | null
  ) => void;
};

export default function SlidePanel({
  geojsonData,
  loading,
  selectedFacility,
  setSelectedFacility,
}: SlidePanelProps) {
  const handleFacilityClick = (name: string, feature: GeojsonFeature) => {
    setSelectedFacility({ name, feature });
  };

  const handleBackClick = () => {
    setSelectedFacility(null);
  };

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
          handleFacilityClick={() => handleFacilityClick(geojson.name, feature)}
        />
      ))
    );
  };

  const facilityDetail = () => {
    if (!selectedFacility) return null;

    const {
      BEZEICHNUNG,
      TRAEGER,
      STRASSE,
      PLZ,
      ORT,
      TELEFON,
      EMAIL,
      WWW,
      URL,
      HAUSBEZ,
      Creator,
    } = selectedFacility.feature.properties;

    let facilityName = TRAEGER || "";
    let address = `${STRASSE}, ${PLZ} ${ORT}`;
    let contact = TELEFON;
    let website = WWW || URL || "";
    let creator = Creator;
    let lat = selectedFacility.feature.geometry.coordinates[1];
    let lng = selectedFacility.feature.geometry.coordinates[0];

    if (selectedFacility.name === "Schulen") {
      facilityName = BEZEICHNUNG;
      contact = `${contact}, ${EMAIL}`;
    } else if (selectedFacility.name === "Kindertageseinrichtungen") {
      let old = BEZEICHNUNG;
      facilityName = old.substring(old.indexOf('"') + 1, old.lastIndexOf('"'));
      address = `${STRASSE} ${HAUSBEZ}, ${PLZ} ${ORT}`;
      contact = `${TELEFON}, ${EMAIL}`;
    }

    return (
      <div className="p-4">
        <button onClick={handleBackClick} className="mb-4 text-blue-500">
          &larr; Back
        </button>
        <h2 className="text-xl font-bold">{facilityName}</h2>
        <p>{address}</p>
        <p>{contact}</p>
        <p>{creator}</p>
        <p>{lat}</p>
        <p>{lng}</p>

        {website && (
          <p>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Website
            </a>
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="h-dvh overflow-y-auto">
      {loading ? (
        <ul role="list" className="divide-y divide-gray-100">
          <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  Loading...
                </p>
              </div>
            </div>
          </li>
        </ul>
      ) : selectedFacility ? (
        facilityDetail()
      ) : (
        <ul role="list" className="divide-y divide-gray-100">
          {facilityList()}
        </ul>
      )}
    </div>
  );
}
