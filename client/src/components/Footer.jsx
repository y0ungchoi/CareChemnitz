//https://medium.com/@ryaddev/creating-a-responsive-footer-component-in-react-using-tailwind-css-7b8a7a4a007d

function Footer() {
  return (
    <>
      <footer className="bg-gray-200">
        <div className="container mx-auto py-[5rem]">
          {/* footer div all */}
          <div className="flex justify-between flex-col md:flex-row items-center md:items-start md:gap-[5rem] text-left">
            {/* logo side */}
            <div className="flex flex-col w-1/2 md:p-0 py-4 gap-8">
              <img
                src="../src/assets/Chemnitz_care_text.svg"
                alt="footer_logo"
                className="w-[12rem]"
              />
              <p className="text-[15px] font-medium text-[#646464]">
                Take your health and body to the next level with our
                comprehensive program designed to help you reach your fitness
                goals.
              </p>
            </div>
            <div className="flex w-1/2 md:p-0 py-4 gap-8">
              <p className="text-[16px] font-medium text-[#646464] content-end">
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
              <p className="text-[16px] font-medium text-[#646464] content-end">
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
