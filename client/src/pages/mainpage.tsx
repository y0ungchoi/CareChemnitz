import Maps from "../components/Maps";
import Filter from "../components/Filter";

export default function Example() {
  return (
    <>
      <div>
        {/* <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900"></h1>
          </div>
        </header> */}
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <Filter />
            <Maps />
          </div>
        </main>
      </div>
    </>
  );
}
