import React, { useEffect } from "react";
import heroData from "../database/heroData.json";
import Calendar from "../component/Layout/Calender";
import StaticData from "../component/Layout/StaticData";
import OurService from "../component/Layout/OurService";

const Hero = () => {
  useEffect(() => {
    let bookingResults = JSON.parse(localStorage.getItem("bookingResults"));

    if (!bookingResults || bookingResults === undefined || bookingResults.lenght === 0) {
      window.bookingResults = [];
      localStorage.setItem("bookingResults", JSON.stringify(window.bookingResults));
    } else {
      window.bookingResults = bookingResults
    }
  }, []);
  return (
    <>
      <section
        className="relative bg-cover bg-center px-4 sm:px-[10px] md:px-[10px] lg:px-[60px] overflow-visible"
        style={{
          backgroundImage: `url(${heroData.backgroundImage})`,
          minHeight: "100vh",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Content Area */}
        <div className="flex flex-col items-start justify-end z-20 pt-[100px] pb-10">
          <div className="bg-white opacity-100 text-black py-6 px-[54px] rounded-sm shadow-lg">
            <h1 className="text-[25px] font-bold tracking-wide">
              {heroData.title.split("/n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h1>
          </div>

          {/* Calendar Component */}
          <div className="w-full max-w-lg">
            <Calendar />
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <section>
        <StaticData />
      </section>
      <section>
        {/* Centering the 'Our Services' Title */}
        <div className="flex justify-center items-center">
          <div className="text-center mb-6">
            <h4 className="text-center text-2xl font-extrabold mb-4 leading-tight">
              Our Services
            </h4>
            <p className="text-center text-[13px] text-gray-600 font-sm">
              Experience top-tier grooming services, from precision haircuts to expert beard trims.
              <br />
              Book now and redefine your style with our professional barbers.
            </p>

          </div>
        </div>
        <OurService />
      </section>
    </>
  );
};

export default Hero;
