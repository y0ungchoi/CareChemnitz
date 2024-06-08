import { useState } from "react";

import Maps from "../components/Maps";
import SideFilter from "../components/SideFilter";
import SlidePanel from "../components/SlidePanel";
import { FunnelIcon } from "@heroicons/react/20/solid";

export interface FacilityInfo {
  facilities: string[];
}

export default function Mainpage() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [facilityInfo, setFacilityInfo] = useState<FacilityInfo>({
    facilities: [],
  });

  const mobileFiltersHandler = () => {
    setIsMobileFiltersOpen((prev) => !prev);
  };

  return (
    <main>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 py-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Maps
          </h1>
          <div className="flex items-center">
            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={mobileFiltersHandler}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <SideFilter
              mobileFiltersHandler={mobileFiltersHandler}
              isMobileFiltersOpen={isMobileFiltersOpen}
              facilityInfo={facilityInfo}
              setFacilityInfo={setFacilityInfo}
            />
            <div className="lg:col-span-2">
              <Maps facilities={facilityInfo.facilities} />
            </div>
            <div className="lg:col-1">
              <SlidePanel />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
