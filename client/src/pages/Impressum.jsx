export default function Impressum() {
  return (
    <main className="h-[calc(100vh-theme('spacing.27'))]">
      <div className="mx-auto max-w-7xl py-6 px-6 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 py-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Impressum
          </h1>
        </div>
        <section aria-labelledby="products-heading" className="pb-6 pt-6">
          <div className="grid grid-cols-1 gap-y-5">
            <p>
              <strong>Website Owner:</strong> <br />
              Eun-young Choi <br />
              Care Chemnitz <br />
            </p>
            <p>
              <strong>Address:</strong> <br />
              Straße der Nationen 62 <br />
              09111 Chemnitz
              <br />
              Germany
            </p>
            <p>
              <strong>Contact Information:</strong> <br />
              Phone: +49 178 937268 <br />
              Email: youngchoi2094@gmail.com <br />
            </p>
            <p className="text-[11px] font-medium text-[#646464]">
              © {new Date().getFullYear()} Care Chemnitz <br /> Developed by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/y0ungchoi"
              >
                Eun-young Choi
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
