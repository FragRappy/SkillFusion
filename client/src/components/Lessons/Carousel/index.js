import React from "react";
import { Box } from "@mui/material";
import Carousel from "react-multi-carousel";
import LessonCard from "../Card";
import "react-multi-carousel/lib/styles.css";


const LessonCarousel = ({ lessons, access, loading }) => {
    return (
        <Box sx={{ maxWidth: '1500px', margin: '0 auto' }}>
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 4,
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 1,
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 2,
                    }
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
                {lessons && lessons.map((lesson) => (
                    <Box key={lesson.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <LessonCard lesson={lesson} access={access} loading={loading} />
                    </Box>
                ))}
            </Carousel>
        </Box>
    );
};

export default LessonCarousel;