import React, { useState } from "react";

type Place = {
  placePrediction: {
    placeId: string;
    text: {
      text: string;
    };
  };
};

const SearchPlace: React.FC = () => {
  const [input, setInput] = useState("");
  const [autoCompletePlaces, setAutoCompletePlaces] = useState<Place[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    getAutoCompletePlaces(input);
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
      <input type="text" value={input} onChange={handleSearch} />
      {autoCompletePlaces.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {autoCompletePlaces.map((place, index) => (
              <tr key={index}>
                <td>{place.placePrediction.text.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchPlace;
