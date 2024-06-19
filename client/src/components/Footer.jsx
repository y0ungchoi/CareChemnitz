import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="bg-background hidden sm:block">
        <div className="container mx-auto px-[1rem] py-[1rem]">
          {/* footer div all */}
          <div className="flex justify-between flex-col md:flex-row items-center md:items-start md:gap-[2rem] text-left">
            {/* logo side */}
            <div className="flex flex-col w-1/2 md:p-0 gap-1">
              <img
                src="../src/assets/Chemnitz_care_text.svg"
                alt="footer_logo"
                className="w-[7rem]"
              />
              <p className="text-[10px] font-medium text-[#646464]">
                Children, adolescents, and young adults require access to the
                education and care system.
                <br />
                This is essential for their development and also legally
                mandated.
              </p>
            </div>
            <div className="flex flex-col md:p-0 gap-1 relative">
              <div className="flex flex-col h-[7rem] md:p-0 gap-1"></div>
              <p className="text-[11px] font-medium text-[#646464] text-right">
                <NavLink to="/impressum">Impressum</NavLink> | ©{" "}
                {new Date().getFullYear()} Care Chemnitz <br /> Developed by{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.radiustheme.com/"
                >
                  Eun-young Choi
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
