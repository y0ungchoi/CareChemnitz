import { useState } from "react";
import { GeojsonResponse, GeojsonFeature } from "./Maps";
import { XMarkIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";

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
  handleFacilityClick: (
    facilityFeature: { name: string; feature: GeojsonFeature } | null
  ) => void;
};

export default function SlidePanel({
  geojsonData,
  loading,
  selectedFacility,
  handleFacilityClick,
}: SlidePanelProps) {
  const handleBackClick = () => {
    handleFacilityClick(null);
  };
  const id = sessionStorage.getItem("userId") || undefined;
  const [isOpen, setIsOpen] = useState(false);

  function toggleMobSlidePanel() {
    setIsOpen(!isOpen);
  }

  const facilityList = () => {
    if (!geojsonData) {
      return (
        <li className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm leading-6 text-gray-900">
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
          handleFacilityClick={() =>
            handleFacilityClick({ name: geojson.name, feature })
          }
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
        {id ? (
          <button onClick={() => handleFavClick({ facilityName, lat, lng })}>
            Favorite
          </button>
        ) : null}
      </div>
    );
  };

  async function handleFavClick({
    facilityName,
    lat,
    lng,
  }: {
    facilityName: string;
    lat: number;
    lng: number;
  }) {
    try {
      const response = await fetch(
        `http://localhost:5050/record/profile/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            favPlace: facilityName,
            location: {
              lat: lat,
              lng: lng,
            },
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      sessionStorage.setItem("favLocation", JSON.stringify({ lat, lng }));
    } catch (error) {
      console.error("A problem occurred adding or updating a record: ", error);
    }
  }

  return (
    <>
      {/* Web slide panel */}
      <div className="hidden sm:block">
        <div className="h-[calc(1024px*0.4)] overflow-y-scroll">
          {loading ? (
            <ul role="list" className="divide-y divide-gray-100">
              <li className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm leading-6 text-gray-900">
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
      </div>
      {/* Mobile slide panel */}
      <div className="sm:hidden">
        {!isOpen ? (
          <div className="fixed bottom-24 left-1/2">
            <button
              className="flex transform -translate-x-1/2 rounded-md border ring-1 ring-inset ring-gray-300 px-3 py-2 text-sm font-semibold bg-main text-input shadow-sm"
              onClick={toggleMobSlidePanel}
            >
              <ListBulletIcon className="text-input mr-1 h-6 w-6" />
              Open list
            </button>
          </div>
        ) : null}
        <Transition
          show={isOpen}
          enter="transform transition ease-in-out duration-500 sm:duration-700"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transform transition ease-in-out duration-500 sm:duration-700"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          <Dialog
            open={isOpen}
            onClose={() => toggleMobSlidePanel()}
            className="fixed inset-0 flex items-end justify-center"
          >
            <DialogPanel className="w-full h-3/4 bg-white shadow-lg overflow-y-auto p-4">
              <DialogTitle className="flex font-bold text-lg">
                Facility List
                <XMarkIcon
                  onClick={() => setIsOpen(false)}
                  className="absolute right-2 h-6 w-6"
                />
              </DialogTitle>

              <ul
                role="list"
                className="divide-y divide-gray-100 overflow-y-auto"
              >
                {facilityList()}
              </ul>
            </DialogPanel>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}
