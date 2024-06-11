import { useState, forwardRef } from "react";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

type Place = {
  placePrediction: {
    placeId: string;
    text: {
      text: string;
    };
  };
};

interface SearchPlaceProps {
  onPlaceSelect: (placeName: string) => void;
  item: string;
  id: string;
}

function SearchPlace({ onPlaceSelect, item, id }: SearchPlaceProps) {
  const [selected, setSelected] = useState("");
  const [autoCompletePlaces, setAutoCompletePlaces] = useState<Place[]>([]);

  async function getAutoCompletePlaces(input: string) {
    const mapkey = import.meta.env.VITE_MAPS_API_KEY;
    const response = await fetch(
      `https://places.googleapis.com/v1/places:autocomplete?input=${input}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": mapkey,
        },
        body: JSON.stringify({ input }),
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch autocomplete data");
      return;
    }
    const data = await response.json();
    setAutoCompletePlaces(data.suggestions);
  }

  function handlePlaceSelect(placeName: string) {
    setSelected(placeName);
    onPlaceSelect(placeName);
  }

  return (
    <div>
      <Combobox
        value={selected ? selected : item}
        onChange={(selected) => handlePlaceSelect(selected || "")}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              onChange={(event) => getAutoCompletePlaces(event.target.value)}
              id={id}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>

          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {autoCompletePlaces.length === 0 ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              autoCompletePlaces.map((place) => (
                <Combobox.Option
                  key={place.placePrediction.placeId}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-teal-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={place.placePrediction.text.text}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {place.placePrediction.text.text}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
}
export default SearchPlace;
