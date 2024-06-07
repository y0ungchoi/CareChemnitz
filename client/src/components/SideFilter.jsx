//Tailwind filter example
//https://tailwindui.com/components/ecommerce/components/category-filters
import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Maps from "../components/Maps";

const subCategories = [
  { name: "Jugendberufshilfen", href: "#" },
  { name: "Kindertageseinrichtungen", href: "#" },
  { name: "Schulen", href: "#" },
  { name: "Schulsozialarbeit", href: "#" },
];
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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SideFilter() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  function toggleCheckbox(id) {
    const checkboxes = document.getElementsByName(id);
    console.log("check : " + checkboxes);
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = id.checked;
    }
  }

  return (
    <div>
      {/* Mobile filter dialog */}
      <Transition show={mobileFiltersOpen}>
        <Dialog
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
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
                    onClick={() => setMobileFiltersOpen(false)}
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
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    >
                      <li key={section.name}>
                        <input
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          type="checkbox"
                          name={section.name}
                          value={section.name}
                          id={`filter-mobile-${section.name}`}
                        />
                        <label
                          htmlFor={`filter-mobile-${section.id}`}
                          className="ml-3 min-w-0 flex-1 text-gray-900"
                        >
                          {section.name}
                        </label>
                      </li>

                      {section.options &&
                        section.options.map((option, optionIdx) => (
                          <div className="pl-6 space-y-6">
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                defaultChecked={option.checked}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
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

      <main>
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900"></h1>

          <div className="flex items-center">
            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Web Filters */}
            <form className="hidden lg:block">
              <h3 className="sr-only">Categories</h3>
              {filters.map((section) => (
                <ul
                  role="list"
                  className="space-y-4 pb-6 text-sm font-medium text-gray-900"
                >
                  <li key={section.name}>
                    <input
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      type="checkbox"
                      name={section.name}
                      value={section.name}
                      id={`checkbox-${section.name}`}
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
                      <div className="pl-6 space-y-4">
                        <li key={option.value} className="flex items-center">
                          <input
                            id={`filter-${section.id}-${optionIdx}`}
                            name={section.id}
                            defaultValue={option.value}
                            type="checkbox"
                            defaultChecked={option.checked}
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

            {/* Product grid */}
            <div className="lg:col-span-3">
              <Maps />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
