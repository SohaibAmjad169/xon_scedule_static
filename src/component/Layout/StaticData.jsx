import { LiaCertificateSolid } from "react-icons/lia";
import { IoCameraOutline } from "react-icons/io5";
import { IoSpeedometerOutline } from "react-icons/io5";
import React from "react";

const StaticData = () => {
    return (
        <div className="mx-4 md:mx-20 my-12 md:my-28 flex flex-col md:flex-row justify-between text-center">
            {/* Individual Data Item */}
            <div className="flex flex-col items-center space-y-4 mx-6 mb-8 md:mb-0">
                {/* Icon Container */}
                <div className="bg-[#333333] text-white p-7 rounded-full flex items-center justify-center">
                    <LiaCertificateSolid className="text-white text-3xl" />
                </div>
                <h5 className="font-bold text-lg">Certified Barbers</h5>
                <p className="text-[13px] text-gray-600">
                    Our skilled and certified barbers bring years of experience to deliver the perfect haircut and grooming services.
                </p>
            </div>

            <div className="flex flex-col items-center space-y-4 mx-6 mb-8 md:mb-0">
                <div className="bg-[#333333] text-white p-7 rounded-full flex items-center justify-center">
                    <IoCameraOutline className="text-white text-3xl" />
                </div>
                <h5 className="font-bold text-lg">Modern Styles</h5>
                <p className="text-[13px] text-gray-600">
                    Stay ahead of trends with stylish haircuts, fades, and beard trims that match your personality and look.
                </p>
            </div>

            <div className="flex flex-col items-center space-y-4 mx-6 mb-8 md:mb-0">
                <div className="bg-[#333333] text-white p-7 rounded-full flex items-center justify-center">
                    <IoSpeedometerOutline className="text-white text-3xl" />
                </div>
                <h5 className="font-bold text-lg">Fast & Convenient</h5>
                <p className="text-[13px] text-gray-600">
                    No more long waits! Book your appointment online and get top-notch service at your preferred time.
                </p>
            </div>

        </div>
    );
};

export default StaticData;
