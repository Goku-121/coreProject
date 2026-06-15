import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CategoriesSkeleton = () => {
  return (
    <div className="py-5">
      <div className="container">

        {/* Top Categories Section */}
        <div className="text-center mb-5">
          <Skeleton height={48} width={260} className="mb-3 mx-auto" />
          <Skeleton height={24} width={520} className="mx-auto" />
        </div>

        {/* Bottom Categories Grid */}
        <div className="row g-4">
          {[...Array(16)].map((_, index) => (
            <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">

              {/* card like FeaturesSkeleton (but keep circle UI) */}
              <div className="card shadow-sm border-0 h-100 text-center p-3">

                {/* circle image skeleton */}
                <div className="mx-auto mb-3" style={{ width: "85px", height: "85px" }}>
                  <Skeleton circle height="100%" width="100%" />
                </div>

                {/* text skeleton */}
                <Skeleton height={18} width="75%" className="mx-auto mb-2" />
                <Skeleton height={14} width="45%" className="mx-auto" />

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CategoriesSkeleton;