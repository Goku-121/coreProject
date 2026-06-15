import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FeaturesSkeleton = () => {
  return (
    <div className="container section">
      <div className="row">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="col-6 p-2 col-md-3 col-lg-3 col-sm-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="row align-items-center">

                  {/* Left - Image Placeholder */}
                  <div className="col-4">
                    <Skeleton
                      height={55}
                      width="100%"
                      borderRadius={8}
                    />
                  </div>

                  {/* Right - Skeleton Lines */}
                  <div className="col-8">
                    <Skeleton count={3} height={14} className="mb-1" />
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSkeleton;