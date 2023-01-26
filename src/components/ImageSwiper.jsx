import React from "react";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import PropTypes from "prop-types";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const ImageSwiper = (props) => {
  const { pictures } = props;

  return (
    <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {pictures.map((picture) => (
            <SwiperSlide key={picture.id}>
                <img src={picture.pictureUrl} />
            </SwiperSlide>
        ))}
      </Swiper>
  );
};

ImageSwiper.propTypes = {
  pictures: PropTypes.array
};

export default ImageSwiper;
