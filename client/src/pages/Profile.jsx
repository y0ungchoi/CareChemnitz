import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchPlace from "../components/SearchPlace";

export default function Profile() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    homePlace: "",
    favPlace: "",
  });
  const id = sessionStorage.getItem("userId") || undefined;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!id) return navigate("/signin");
      const response = await fetch(
        `http://localhost:5050/record/profile/${id}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/signin");
        return;
      }
      setForm(record);
    }
    fetchData();
    return;
  }, [id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    try {
      const response = await fetch(
        `http://localhost:5050/record/profile/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refetch the updated profile information
      const updatedResponse = await fetch(
        `http://localhost:5050/record/profile/${id}`
      );
      if (!updatedResponse.ok) {
        throw new Error(`HTTP error! status: ${updatedResponse.status}`);
      }
      const updatedRecord = await updatedResponse.json();
      setForm(updatedRecord);
      setIsEditMode(false); // Exit edit mode after saving
    } catch (error) {
      console.error("A problem occurred adding or updating a record: ", error);
    }
  }

  function toggleEditMode() {
    setIsEditMode((prev) => !prev);
  }

  async function deleteRecord(id) {
    if (window.confirm("Are you sure you want to delete this record?")) {
      await fetch(`http://localhost:5050/record/profile/${id}`, {
        method: "DELETE",
      });
      sessionStorage.removeItem("userId");
      navigate("/");
    }
  }

  return (
    <div>
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={(e) => updateForm({ firstName: e.target.value })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                    readOnly={!isEditMode}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={(e) => updateForm({ lastName: e.target.value })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    readOnly={!isEditMode}
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    readOnly
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="homePlace"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Home
                </label>
                <div className="mt-2">
                  {isEditMode ? (
                    <SearchPlace
                      onPlaceSelect={(place) =>
                        updateForm({ homePlace: place })
                      }
                      item={form.homePlace}
                      id="homePlace"
                    />
                  ) : (
                    <input
                      type="text"
                      name="homePlace"
                      id="homePlace"
                      value={form.homePlace ? form.homePlace : ""}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      readOnly
                    />
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="favPlace"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Favorite place
                </label>
                <div className="mt-2">
                  {isEditMode ? (
                    <SearchPlace
                      onPlaceSelect={(place) => updateForm({ favPlace: place })}
                      item={form.favPlace}
                      id="favPlace"
                    />
                  ) : (
                    <input
                      type="text"
                      name="favPlace"
                      id="favPlace"
                      value={form.favPlace ? form.favPlace : ""}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      readOnly
                    />
                  )}
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => updateForm({ password: e.target.value })}
                    readOnly={!isEditMode}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          onClick={() => deleteRecord(id)}
        >
          Delete
        </button>
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
        {isEditMode ? (
          <button
            onClick={handleSubmit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            onClick={toggleEditMode}
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
