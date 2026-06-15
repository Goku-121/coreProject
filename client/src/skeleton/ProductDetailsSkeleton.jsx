import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import NoResults from '../assets/images/no-results.png'

const ProductDetailsSkeleton = () => {

  return (
    <div className="container mt-2">
      <div className="row">

        {/* Left - Image */}
        <div className="col-md-7 align-content-center p-1">
          <div className="container">

            <div className="row">
              <div className="col-12 text-center">

                <img
                  src={NoResults}
                  alt="No Result"
                  className="img-fluid"
                  style={{ maxHeight: "400px" }}
                />

              </div>
            </div>

          </div>
        </div>

        {/* Right - Details Skeleton */}
        <div className="col-md-5 p-1">
          <Skeleton count={5} />
        </div>

      </div>
    </div>
  )
}

export default ProductDetailsSkeleton