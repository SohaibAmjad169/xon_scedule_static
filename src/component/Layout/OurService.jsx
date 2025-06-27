import React from 'react'

const OurService = () => {
    return (
        <>
            <div>
                {/* Content with Images and Text */}
                <div className='flex mx-4 md:mx-[83px] flex-col md:flex-row'>
                    <div className="mb-4 md:mb-0">
                        <img src="/images/h5-img-2.jpg" alt="" className="w-full h-auto object-cover" />
                    </div>

                    <div className='flex flex-col mb-4 md:mb-0'>
                        <div>
                            <img src="/images/h5-img-4.jpg" alt="" className="w-full h-auto object-cover" />
                        </div>

                        {/* Centered Content Div */}
                        <div className="bg-[#333333] text-white p-6 flex flex-col justify-center items-center h-[300px]">
                            {/* Vertically Centered h4 and p tags */}
                            <h4 className="text-center text-2xl font-extrabold text-white leading-tight">
                                Meets modern style
                            </h4>
                            <p className="text-center text-lg font-medium text-[#ffffff] mt-4">
                                experience the finest haircuts
                            </p>
                        </div>
                    </div>

                    <div className="mb-4 md:mb-0">
                        <img src="/images/h5-img-3.jpg" alt="" className="w-full h-auto object-cover" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row mx-4 md:mx-20 my-20">
                {/* Left Side - Text Content */}
                <div className="w-full md:w-1/2 p-4 md:pe-20 md:ps-10 pt-10">
                    <h3 className="text-2xl font-bold mb-4">Fast & Modern Booking</h3>
                    <p className="text-[15px] text-gray-600 mb-4">
                        More than just a haircut—it's a community. Our barbershop is a place to relax, unwind,
                        and get the freshest styles from experienced professionals.
                        No waiting, no hassle—just great haircuts. Book your next appointment online
                        and let our expert barbers take care of the rest.
                    </p>
                    <p className="text-[14px] text-gray-600">
                        Discover local barbers you can trust. Whether you're looking for a quick trim
                        or a full grooming session, we've got you covered.
                    </p>


                    <div className="flex space-x-4 pt-10">
                        {/* Button with Black Background */}
                        <button className="bg-black text-white py-2 px-6 rounded-sm hover:bg-gray-800 transition duration-300">
                            LEARN MORE
                        </button>

                        {/* Button with Dark Grey Background */}
                        <button className="bg-gray-700 text-white py-2 px-6 rounded-sm hover:bg-gray-700 transition duration-300">
                            PURCHASE
                        </button>
                    </div>
                </div>

                {/* Right Side - Two Images */}
                <div className="w-full md:w-1/2 p-4 flex space-x-4">
                    <div className="w-full md:w-1/2 mb-4 md:mb-0">
                        <img src="/images/h5-img-5.jpg" alt="Image 1" className="w-full h-auto object-cover" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <img src="/images/h5-img-6.jpg" alt="Image 2" className="w-full h-auto object-cover" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default OurService
