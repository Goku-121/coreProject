import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductStroe from "../../store/ProductStore";
import SliderSkeleton from "../../skeleton/SliderSkeleton";
import '../../assets/css/Animation.css'; 

const Slider = () => {

    const { SliderList } = ProductStroe();
    const [activeIndex, setActiveIndex] = useState(0);

    // Next Slide
    const handleNext = () => {
        setActiveIndex((prev) =>
            prev === SliderList.length - 1 ? 0 : prev + 1
        );
    };

    // Previous Slide
    const handlePrev = () => {
        setActiveIndex((prev) =>
            prev === 0 ? SliderList.length - 1 : prev - 1
        );
    };

    // Auto Slide
    useEffect(() => {

        if (!SliderList || SliderList.length === 0) return;

        const sliderInterval = setInterval(() => {
            handleNext();
        }, 3000);

        return () => clearInterval(sliderInterval);

    }, [SliderList]);

    // Loading
    if (SliderList === null || SliderList.length === 0) {
        return <SliderSkeleton />;
    }

    const currentSlide = SliderList[activeIndex];

    return (
        <div
            style={{
                background:
                    "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)",
                position: "relative",
                overflow: "hidden",
            }}
        >

            {/* Wave SVG */}
            <svg
                viewBox="0 0 1440 320"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 0,
                    opacity: 0.5,
                }}
            >
                <path
                    fill="#4caf50"
                    fillOpacity="0.4"
                    d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,138.7C840,117,960,107,1080,122.7C1200,139,1320,181,1380,202.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                />
            </svg>

            {/* Blob */}
            <div
                style={{
                    position: "absolute",
                    top: "-80px",
                    right: "-80px",
                    width: "400px",
                    height: "400px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, #66bb6a 0%, #43a047 60%, transparent 100%)",
                    opacity: 0.5,
                    zIndex: 0,
                }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
                <div className="container py-5">

                    <div
                        className="row align-items-center justify-content-center"
                        style={{ minHeight: "420px" }}
                    >

                        {/* Text */}
                        <div
                            key={activeIndex + "-text"}
                            className="col-12 col-md-6 p-4 p-md-5 slider-text-animation"
                        >

                            <h1
                                className="headline-1 mb-3"
                                style={{
                                    color: "#1b5e20",
                                    fontWeight: "bold",
                                }}
                            >
                                {currentSlide.title}
                            </h1>

                            <p
                                className="mb-4"
                                style={{
                                    color: "#2e7d32",
                                    opacity: 0.9,
                                    fontSize: "17px",
                                    lineHeight: "28px",
                                }}
                            >
                                {currentSlide.description ||
                                    currentSlide.shortDescription}
                            </p>

                            <Link
                           to={`/details/${currentSlide.productID?._id || currentSlide.productID}`}
                                className="btn btn-success text-white px-5 py-2"
                                style={{
                                    borderRadius: "10px",
                                    fontWeight: "600",
                                }}
                            >
                                Buy Now
                            </Link>
                        </div>

                        {/* Image */}
                        <div
                            key={activeIndex + "-image"}
                            className="col-12 col-md-6 p-4 p-md-5 text-center slider-image-animation"
                        >

                            <img
                                src={currentSlide.img || currentSlide.image}
                                alt={currentSlide.title}
                                className="img-fluid slider-image-float"
                                style={{
                                    maxHeight: "350px",
                                    objectFit: "contain",
                                    filter:
                                        "drop-shadow(0 10px 30px rgba(0,0,0,0.25))",
                                }}
                            />

                        </div>

                    </div>
                </div>
            </div>

            {/* Indicators */}
            <div
                className="d-flex justify-content-center gap-2 pb-4"
                style={{
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {SliderList.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        style={{
                            width: i === activeIndex ? "30px" : "10px",
                            height: "10px",
                            borderRadius: "5px",
                            border: "none",
                            background:
                                i === activeIndex ? "#2e7d32" : "#a5d6a7",
                            transition: "all 0.4s ease",
                            cursor: "pointer",
                        }}
                    />
                ))}
            </div>

            {/* Prev Button */}
            <button
                onClick={handlePrev}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "15px",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    background: "rgba(255,255,255,0.7)",
                    border: "none",
                    borderRadius: "50%",
                    width: "45px",
                    height: "45px",
                    fontSize: "24px",
                    cursor: "pointer",
                }}
            >
                ‹
            </button>

            {/* Next Button */}
            <button
                onClick={handleNext}
                style={{
                    position: "absolute",
                    top: "50%",
                    right: "15px",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    background: "rgba(255,255,255,0.7)",
                    border: "none",
                    borderRadius: "50%",
                    width: "45px",
                    height: "45px",
                    fontSize: "24px",
                    cursor: "pointer",
                }}
            >
                ›
            </button>

        </div>
    );
};

export default Slider;