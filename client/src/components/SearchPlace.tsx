import React, { useState } from "react";

type Place = {
  placePrediction: {
    placeId: string;
    text: {
      text: string;
    };
  };
};

interface SearchPlaceProps {
  onPlaceSelect: (place: string) => void;
}

const SearchPlace: React.FC<SearchPlaceProps> = ({ onPlaceSelect }) => {
  const [input, setInput] = useState("");
  const [autoCompletePlaces, setAutoCompletePlaces] = useState<Place[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    getAutoCompletePlaces(event.target.value);
    setInput(event.target.value);
  };

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
    console.log(data.suggestions);
  }

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleSearch}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      {autoCompletePlaces.length > 0 && (
        <div className="dropdown">
          {autoCompletePlaces.map((place, index) => (
            <ul key={index}>
              <li>
                <button
                  onClick={() => {
                    onPlaceSelect(place.placePrediction.text.text);
                  }}
                >
                  {place.placePrediction.text.text}
                </button>
              </li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPlace;
