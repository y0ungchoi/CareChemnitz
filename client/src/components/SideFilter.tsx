//Tailwind filter example
//https://tailwindui.com/components/ecommerce/components/category-filters
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FacilityInfo } from "../pages/Mainpage";

const filters = [
  {
    id: "Jugendberufshilfen",
    name: "Jugendberufshilfen",
  },
  {
    id: "Schulen",
    name: "Schulen",
  },
  {
    id: "Schulsozialarbeit",
    name: "Schulsozialarbeit",
  },
  {
    id: "Kindertageseinrichtungen",
    name: "Kindertageseinrichtungen",
    options: [
      { value: "hort", label: "Hort", checked: false },
      { value: "kita", label: "Kita", checked: false },
    ],
  },
];

interface SideFilterProps {
  isMobileFiltersOpen: boolean;
  mobileFiltersHandler: () => void;
  facilityInfo: FacilityInfo;
  setFacilityInfo: (info: FacilityInfo) => void;
}

export default function SideFilter({
  isMobileFiltersOpen,
  mobileFiltersHandler,
  facilityInfo,
  setFacilityInfo,
}: SideFilterProps) {
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const { facilities } = facilityInfo;

    if (checked) {
      setFacilityInfo({
        facilities: [...facilities, value],
      });
    } else {
      setFacilityInfo({
        facilities: facilities.filter((facility) => facility !== value),
      });
    }
  };
  const isChecked = (value: string) => facilityInfo.facilities.includes(value);

  return (
    <div>
      {/* Mobile filter dialog */}
      <Transition show={isMobileFiltersOpen}>
        <Dialog
          className="relative z-40 lg:hidden"
          onClose={mobileFiltersHandler}
        >
          <TransitionChild
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 z-40 flex">
            <TransitionChild
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={mobileFiltersHandler}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Mobile Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  {filters.map((section) => (
                    <ul
                      key={`filter-mobile-${section.name}`}
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    >
                      <li>
                        <input
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          type="checkbox"
                          name={section.name}
                          value={section.name}
                          id={`filter-mobile-${section.name}`}
                          checked={isChecked(section.name)}
                          onChange={handleFilterChange}
                        />
                        <label
                          htmlFor={`filter-mobile-${section.name}`}
                          className="ml-3 min-w-0 flex-1 text-gray-900"
                        >
                          {section.name}
                        </label>
                      </li>

                      {section.options &&
                        section.options.map((option, optionIdx) => (
                          <div key={option.value} className="pl-6 space-y-6">
                            <li className="flex items-center">
                              <input
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                checked={isChecked(option.value)}
                                defaultChecked={option.checked}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-600"
                              >
                                {option.label}
                              </label>
                            </li>
                          </div>
                        ))}
                    </ul>
                  ))}
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      {/* Web Filters */}
      <form className="hidden lg:block">
        <h3 className="sr-only">Categories</h3>
        {filters.map((section) => (
          <ul
            key={section.name}
            role="list"
            className="space-y-4 pb-6 text-sm font-medium text-gray-900"
          >
            <li>
              <input
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                type="checkbox"
                name={section.name}
                value={section.name}
                id={`checkbox-${section.name}`}
                checked={isChecked(section.name)}
                onChange={handleFilterChange}
              />
              <label
                className="ml-3 font-medium text-gray-900"
                htmlFor={`checkbox-${section.name}`}
              >
                {section.name}
              </label>
            </li>

            {section.options &&
              section.options.map((option, optionIdx) => (
                <div key={option.value} className="pl-6 space-y-4">
                  <li key={option.value} className="flex items-center">
                    <input
                      id={`filter-${section.id}-${optionIdx}`}
                      name={section.id}
                      defaultValue={option.value}
                      type="checkbox"
                      checked={isChecked(option.value)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`filter-${section.id}-${optionIdx}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {option.label}
                    </label>
                  </li>
                </div>
              ))}
          </ul>
        ))}
      </form>
    </div>
  );
}
