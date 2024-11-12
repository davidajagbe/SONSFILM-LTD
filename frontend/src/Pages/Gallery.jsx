import { Swiper, SwiperSlide } from 'swiper/react';
// Swiper styles
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import {Autoplay, Navigation} from 'swiper/modules';
import '../styles/Gallery.css';
import img1 from '../assets/musicians-blending-tracks-club-stage.jpg';
import img2 from '../assets/84179.jpg';
import img3 from '../assets/85805.jpg';
import img4 from '../assets/IMG-20241022-WA0001.jpg';
import img5 from '../assets/IMG-20241022-WA0002.jpg';
import img6 from '../assets/IMG-20241022-WA0003.jpg';

const Gallery = () => {
  const images = [img1,img2,img3,img4,img5,img6];// Add more image URLs as needed

  return (
    <div className="gallery-container">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={10}
        slidesPerView={4}
        loop={true}
        navigation={true} // Adds arrows
        autoplay={{
          delay: 2000, // 2000ms (2 seconds) for auto transition
          disableOnInteraction: false, // Keeps autoplay active even if the user interacts with the slider.
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`Slide ${index + 1}`} className="gallery-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
