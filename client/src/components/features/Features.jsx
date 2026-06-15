// ===================== Features.jsx =====================
import React from 'react';
import FeaturesStore from "../../store/FeaturesStore";
import FeaturesSkeleton from "../../skeleton/FeaturesSkeleton";

const Features = () => {
    const { FeaturesList, FeaturesListRequest } = FeaturesStore();

    // Call request only once if data is empty
    if (!FeaturesList) {
        FeaturesListRequest();
        return <FeaturesSkeleton />;
    }

    return (
        <div className="container section">

            {/* Header */}
            <div className="row">
                <div className="col-12 text-center mb-5">
                    <h1 className="headline-4">Features</h1>
                    <span className="bodySmall">
                        Shop with Confidence — Fast, Safe & Always Supported
                    </span>
                </div>
            </div>

            {/* Feature Cards */}
            <div className="row justify-content-center">
               {FeaturesList.map((item, i) => (
    <div
        key={item._id || i}
        className="col-6 col-sm-6 col-md-3 col-lg-3 p-2"
    >
                        <div className="card shadow-sm h-100 text-center">
                            <div className="card-body d-flex flex-column align-items-center justify-content-center py-4">
                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center mb-3"
                                    style={{
                                        width: 64,
                                        height: 64,
                                        background: "#f5f5f5"
                                    }}
                                >
                                    <img
                                        src={item.icon}
                                        alt={item.name}
                                        style={{
                                            width: 36,
                                            height: 36,
                                            objectFit: "contain"
                                        }}
                                    />
                                </div>

                                <h3 className="bodyXLarge mb-1">
                                    {item.name}
                                </h3>

                                <span className="bodySmall text-muted">
                                    {item.description}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Features;