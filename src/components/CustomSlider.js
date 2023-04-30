import React from 'react'
import Slider from 'react-slick'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Box } from '@mui/material';

export const CustomSlider = ({children}) => {
    const sliderRef = React.useRef()

    const handleNext = () => {
        sliderRef.current.slickNext()
      };
  
    const handleBack = () => {
        sliderRef.current.slickPrev()
        }

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: '1em',
        slidesToShow: 5,
        speed: 500,
        cssEase: "linear",
        css: {
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        prevArrow: <div style={{ display: 'none' }} />,
        nextArrow: <div style={{ display: 'none' }} />,      
        responsive: [
          {
            breakpoint: 1281,
            settings: {
              slidesToShow: 3,
              centerMode: true,
              centerPadding: '1em',
              cssEase: "linear",
              css: {
                padding: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              },
            }
          },
          {
            breakpoint: 765,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: '1em',
              cssEase: "linear",
              css: {
                padding: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              },
            }
          }
        ]
      }
            
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          mb: 1,
        }}
      >
        <ArrowCircleLeftIcon
          onClick={handleBack}
          style={{
            fontSize: '3rem',
            cursor: 'pointer',
          }}
        />
        <ArrowCircleRightIcon
          onClick={handleNext}
          style={{
            fontSize: '3rem',
            cursor: 'pointer',
            m: 5,
          }}
        />
      </Box>
 <Slider ref={sliderRef} {...settings}>{children}</Slider>
    </>
  )
}
