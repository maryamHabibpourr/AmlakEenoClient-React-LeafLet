import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {MdArrowForwardIos, MdArrowBackIosNew} from "react-icons/md"
import "./Slider.scss"
//data
import { SLiderDate } from './SliderDate';



const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  initialSlide: 0,
  nextArrow: <MdArrowBackIosNew />,
  prevArrow: <MdArrowForwardIos />,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};



function SliderBrand() {


  return (
    <div className="sliderContainer">
      <div className="contain">
        <Slider {...settings} >
          {SLiderDate.map((post) => {
            return <div className="cardSlider" key={post.id}>
              <div className="cardmMdia">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="cardContent">
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  {post.title}
                </a>
              </div>
            </div>
          })}
        </Slider>
      </div>
    </div>
  )
}

export default SliderBrand