import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BrandsSkeleton = () => {
  return (
    <div className="section py-5">
      <div className="container">
        
        {/* Header */}
        <div className="text-center mb-5">
          <Skeleton 
            height={45} 
            width={220} 
            className="mb-3 mx-auto" 
          />
          <Skeleton 
            height={22} 
            width={480} 
            className="mx-auto" 
          />
        </div>

        {/* Brands Grid / Row */}
        <div className="row g-4 justify-content-center">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">
              <div className="card border-0 shadow-sm h-100 text-center p-4 bg-white">
                
                {/* Brand Logo Skeleton - Usually Square or Circle */}
                <div 
                  className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                  style={{ 
                    width: "110px", 
                    height: "110px",
                    background: "#f8f9fa",
                    borderRadius: "12px"
                  }}
                >
                  <Skeleton 
                    height="85%" 
                    width="85%" 
                    borderRadius={8}
                  />
                </div>

                {/* Brand Name */}
                <Skeleton height={20} width="70%" className="mx-auto" />

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BrandsSkeleton;