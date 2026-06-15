import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductStroe from "../../store/ProductStore";
import ProductsSkeleton from "../../skeleton/ProductsSkeleton";

const Products = () => {
    const { ListByRemark, ListByRemarkRequest } = ProductStroe();
    const [remark, setRemark] = useState("new");

    if (ListByRemark === null) {
        return <ProductsSkeleton />;
    }

    return (
        <div className="section">
            <div className="container-fluid py-5 bg-white">
                <div className="row">
                    <div className="col-12">
                        <h1 className="headline-4 text-center my-2 p-0">
                            Our Products
                        </h1>
                        <span className="bodySmall mb-3 text-center d-block">
                            Explore a World of Choices Across Our Most Popular
                        </span>

                        {/* pills */}
                        <ul className="nav nav-pills p-3 justify-content-center mb-3">
                            {["new", "trending", "popular", "top", "special"].map((type) => (
                                <li className="nav-item" key={type}>
                                    <button
                                        onClick={() => {
                                            ListByRemarkRequest(type);
                                            setRemark(type);
                                        }}
                                        className={`nav-link ${remark === type ? "active" : ""}`}
                                    >
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* products */}
                        <div className="row g-3">
                            {ListByRemark
                                ?.filter((p) => p.remark?.toLowerCase() === remark)
                                .map((item, i) => {
                                    let price = (
                                        <p className="bodyMedium text-dark my-1">
                                            Price: ${item['price']}
                                        </p>
                                    );

                                    if (item['discount'] === true) {
                                        price = (
                                            <p className="bodyMedium text-dark my-1">
                                                Price: <strike>${item['price']}</strike> ${item['discountPrice']}
                                            </p>
                                        );
                                    }

                                    return (
                                        <div
                                            key={i}
                                            className="col-md-3 p-2 col-lg-3 col-sm-6 col-12"
                                        >
                                            <Link
                                                to={`/details/${item['_id']}`}
                                                className="card shadow-sm h-100 rounded-3 bg-white text-decoration-none"
                                            >
                                                <img
                                                    className="w-100 rounded-top-2"
                                                    src={item['image']}
                                                    alt={item['title']}
                                                    style={{ height: "200px", objectFit: "cover" }}
                                                />
                                                <div className="card-body">
                                                    {/* ✅ FIXED: Brand name added */}
                                                    <p className="text-uppercase text-muted my-1" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                                                        {item?.brand?.brand || ''}
                                                    </p>
                                                    <p className="bodySmall text-secondary my-1">
                                                        {item['title']}
                                                    </p>
                                                    {price}

                                                    {/* Star Rating */}
                                                    <div className="mt-1">
                                                        {Array.from({ length: 5 }).map((_, idx) => (
                                                            <span
                                                                key={idx}
                                                                style={{
                                                                    color: idx < Math.round(parseFloat(item['star']) || 0)
                                                                        ? "red"
                                                                        : "#e4e5e9",
                                                                    fontSize: "15px",
                                                                    marginRight: "2px",
                                                                }}
                                                            >
                                                                ★
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;