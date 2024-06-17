//https://medium.com/@ryaddev/creating-a-responsive-footer-component-in-react-using-tailwind-css-7b8a7a4a007d

function Footer() {
  return (
    <>
      <footer className="bg-background hidden sm:block">
        <div className="container mx-auto py-[2rem]">
          {/* footer div all */}
          <div className="flex justify-between md:flex-row items-center md:items-start md:gap-[5rem]">
            {/* logo side */}
            <div className="flex md:p-0 py-1 gap-1">
              <img
                src="../src/assets/Chemnitz_care_text.svg"
                alt="footer_logo"
                className="w-[7rem]"
              />
            </div>
            <div className="flex md:p-0 py-1 gap-1">
              <p className="text-[15px] font-medium text-[#646464]">
                Take your health and body to the next level with.
              </p>
              <p className="text-[16px] font-medium text-[#646464] text-right">
                Privacy Policy | © {new Date().getFullYear()} Care Chemnitz{" "}
                <br /> Developed by{" "}
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
