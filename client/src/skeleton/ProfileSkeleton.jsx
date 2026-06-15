import React from 'react';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileSkeleton = () => {
    return (
        <div className="container mt-5">
            <div className="card p-5 rounded-3 shadow-sm">

                {/* Customer Details Section */}
                <h6 className="mb-3">
                    <Skeleton width={180} height={20} />
                </h6>
                <hr className="mb-4" />

                <div className="row mb-5">
                    {[...Array(7)].map((_, i) => (
                        <div className="col-md-3 p-2" key={i}>
                            <Skeleton width="70%" height={14} className="mb-2" /> 
                            <Skeleton height={45} borderRadius={8} />
                        </div>
                    ))}
                </div>

                {/* Shipping Details Section */}
                <h6 className="mb-3">
                    <Skeleton width={160} height={20} />
                </h6>
                <hr className="mb-4" />

                <div className="row mb-5">
                    {[...Array(7)].map((_, i) => (
                        <div className="col-md-3 p-2" key={i}>
                            <Skeleton width="75%" height={14} className="mb-2" />
                            <Skeleton height={45} borderRadius={8} />
                        </div>
                    ))}
                </div>

                {/* Button Area */}
                <div className="d-flex justify-content-end mt-4">
                    <Skeleton 
                        width={140} 
                        height={45} 
                        borderRadius={8} 
                    />
                </div>

            </div>
        </div>
    );
};

export default ProfileSkeleton;