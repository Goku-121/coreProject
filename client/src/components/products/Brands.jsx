import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductStore from "../../store/ProductStore";
import BrandsSkeleton from "../../skeleton/BrandsSkeleton";

const Brands = () => {

    const { BrandList, BrandListRequest } = ProductStore();

    useEffect(() => {
        (async () => {
            await BrandListRequest();
        })();
    }, []);

    if (BrandList === null) {
        return <BrandsSkeleton />;
    }

    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center mb-5">
                        <h1 className="headline-4">Top Brands</h1>
                        <span className="bodySmall">
                            Explore a World of Choices Across Our Most Popular Brands
                        </span>
                    </div>
                </div>

                <div className="row g-4">
                    {BrandList.map((item, i) => (
                        <div
                            key={item._id || i}
                            className="col-6 col-sm-4 col-md-3 col-lg-2 text-center"
                        >
                            <Link
                                to={`/by-brand/${item._id}`}
                                className="text-decoration-none"
                            >
                                <div className="card h-100 rounded-3 bg-white">
                                    <div className="card-body d-flex flex-column align-items-center justify-content-center py-4">
                                        <img
                                            src={item.brandImg}
                                            alt={item.brand}
                                            className="w-75 mx-auto"
                                        />

                                        <p className="bodySmall mt-3 mb-0 fw-medium">
                                            {item.brand}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Brands;