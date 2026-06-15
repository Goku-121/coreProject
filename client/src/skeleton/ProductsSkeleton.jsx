import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductsSkeleton = () => {
  return (
    <div className="section py-5">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <Skeleton height={40} width={280} className="mb-3 mx-auto" />
          <Skeleton height={20} width={420} className="mx-auto" />
        </div>

        {/* Products Grid */}
        <div className="row g-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-3">
              <div className="card h-100 border-0 shadow-sm overflow-hidden">
                {/* Product Image Skeleton - Rectangular */}
                <div style={{ height: "220px", position: "relative" }}>
                  <Skeleton
                    height="100%"
                    width="100%"
                    className="rounded-top"
                  />
                </div>

                <div className="card-body p-3">
                  {/* Product Title */}
                  <Skeleton height={20} width="85%" className="mb-2" />
                  <Skeleton height={20} width="65%" className="mb-3" />

                  {/* Price */}
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <Skeleton height={24} width={80} />
                    <Skeleton height={18} width={50} />
                  </div>

                  {/* Rating / Small info */}
                  <Skeleton height={16} width="60%" className="mb-3" />

                  {/* Add to Cart Button */}
                  <Skeleton
                    height={42}
                    width="100%"
                    borderRadius={6}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSkeleton;