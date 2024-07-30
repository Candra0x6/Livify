import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const InfiniteSlider = ({ rtl }: { rtl: boolean }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 8000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    vertical: true,
    verticalSwiping: true,
    rtl: rtl,
    arrow: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="relative w-full h-full">
      {/* Overlay hitam */}

      {/* Slider */}
      <div className="relative z-0">
        <Slider {...settings}>
          <div className="px-2">
            <div className="bg-blue-500 h-[21rem] w-[15.5rem] rounded-lg flex items-center justify-center text-white text-2xl">
              Slide 1
            </div>
          </div>
          <div className="px-2">
            <div className="bg-green-500 h-[21rem] w-[15.5rem] rounded-lg flex items-center justify-center text-white text-2xl">
              Slide 2
            </div>
          </div>
          <div className="px-2">
            <div className="bg-red-500 h-[21rem] w-[15.5rem] rounded-lg flex items-center justify-center text-white text-2xl">
              Slide 3
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default InfiniteSlider;
