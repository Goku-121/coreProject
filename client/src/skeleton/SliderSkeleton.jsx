import React from "react";
import { useLottie } from "lottie-react";
import animationData from "../assets/images/image.json";

const SliderSkeleton = () => {
  const options = {
    animationData: animationData,
    loop: true,
    autoplay: true,
    style: { height: 420, width: "100%" },
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { View } = useLottie(options);

  return (
    <div className="container-fluid hero-bg py-5 position-relative overflow-hidden">
      <div className="row justify-content-center align-items-center g-5">

        {/* Left Side - Text Skeletons */}
        <div className="col-12 col-lg-5 p-4 p-lg-5">
          <div className="mb-4" style={{ maxWidth: "80%" }}>
            <div className="bg-light rounded" style={{ height: "45px", width: "80%" }}></div>
          </div>

          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-light rounded mb-3" style={{ height: "25px", width: "90%" }}></div>
          ))}

          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-light rounded mb-2" style={{ height: "18px", width: "95%" }}></div>
          ))}

          <div className="mt-5">
            <div className="bg-light rounded-pill" style={{ height: "55px", width: "200px" }}></div>
          </div>
        </div>

        {/* Right Side - Lottie Animation */}
        <div className="col-12 col-lg-5 p-4 p-lg-5 text-center">
          <div className="position-relative mx-auto" style={{ maxWidth: "420px" }}>
            {View}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SliderSkeleton;