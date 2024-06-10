import { useState } from "react";
import { GeojsonResponse, GeojsonFeature } from "./Maps";

function Facility({
  feature,
  name,
  isOpenDetail,
}: {
  feature: GeojsonFeature;
  name: string;
  isOpenDetail: () => void;
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
    <li className="flex justify-between gap-x-6 py-5 hover:bg-gray-200">
      <div className="flex min-w-0 gap-x-4">
        <a className="min-w-0 flex-auto" onClick={isOpenDetail}>
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
  const [isSelectedFacility, setIsSelectedFacility] = useState(false);
  const [selectedFacility, setSelectedFacility] =
    useState<GeojsonFeature | null>(null);

  function handleFacilityClick(feature: GeojsonFeature) {
    setSelectedFacility(feature);
    setIsSelectedFacility(true);
  }

  function handleBackClick() {
    setSelectedFacility(null);
    setIsSelectedFacility(false);
  }

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
          isOpenDetail={() => handleFacilityClick(feature)}
        />
      ))
    );
  };

  const facilityDetail = () => {
    if (!selectedFacility) return null;

    const {
      BEZEICHNUNG,
      STRASSE,
      PLZ,
      ORT,
      TELEFON,
      EMAIL,
      WWW,
      URL,
      HAUSBEZ,
    } = selectedFacility.properties;

    let facilityName = BEZEICHNUNG || "";
    let address = `${STRASSE}, ${PLZ} ${ORT}`;
    let contact = TELEFON;
    let website = WWW || URL || "";

    if (selectedFacility.properties.BEZEICHNUNG) {
      facilityName = selectedFacility.properties.BEZEICHNUNG;
      contact = `${contact}, ${EMAIL}`;
      website = WWW;
    }

    if (selectedFacility.properties.HAUSBEZ) {
      let old = selectedFacility.properties.BEZEICHNUNG;
      facilityName = old.substring(old.indexOf('"') + 1, old.lastIndexOf('"'));
      address = `${STRASSE} ${HAUSBEZ}, ${PLZ} ${ORT}`;
      contact = `${TELEFON}, ${EMAIL}`;
      website = URL;
    }

    return (
      <div className="p-4">
        <button onClick={handleBackClick} className="mb-4 text-blue-500">
          &larr; Back
        </button>
        <h2 className="text-xl font-bold">{facilityName}</h2>
        <p>{address}</p>
        <p>{contact}</p>
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
      ) : isSelectedFacility ? (
        facilityDetail()
      ) : (
        <ul role="list" className="divide-y divide-gray-100">
          {facilityList()}
        </ul>
      )}
    </div>
  );
}
