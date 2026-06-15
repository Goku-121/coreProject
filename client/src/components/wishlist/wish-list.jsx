import React, { useEffect } from "react";
import WishStore from "../../store/WishStroe.js";
import ProductsSkeleton from "../../skeleton/ProductsSkeleton.jsx";
import { Link } from "react-router-dom";
import NoData from "../layout/no-data.jsx";
import "../../assets/css/Animation.css";

const WishList = () => {
    const { WishListRequest, WishList, RemoveWishListRequest } = WishStore();

    useEffect(() => {
        (async () => {
            await WishListRequest();
        })();
    }, []);

    // Toast is now handled inside the store, just call remove directly
    const remove = async (productID) => {
        await RemoveWishListRequest(productID);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <span
                key={i}
                style={{
                    color: i < Math.round(Number(rating) || 0) ? "red" : "#555",
                    fontSize: "16px",
                    marginRight: "2px",
                }}
            >
                ★
            </span>
        ));
    };

    if (!WishList) {
        return (
            <div className="container">
                <div className="row"><ProductsSkeleton /></div>
            </div>
        );
    }

    return (
        <div className="container mt-4">

            {/* Counter Badge */}
            <div className="d-flex align-items-center mb-4 gap-2">
                <h5 className="mb-0 fw-bold">My Wishlist</h5>
                <span className={`badge rounded-pill ${WishList.length === 0 ? "bg-secondary" : "bg-danger"}`}>
                    {WishList.length}
                </span>
            </div>

            {WishList.length === 0 ? (
                <NoData />
            ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                    {WishList.map((item, i) => {
                        const product = item.products || item.product;
                        if (!product) return null;

                        return (
                            <div key={i} className="col">
                                <div
                                    className="card shadow-sm h-100 rounded-3"
                                    style={{ backgroundColor: "#1e1e1e", border: "1px solid #333" }}
                                >
                                    <div style={{ height: "200px", overflow: "hidden" }}>
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-100 h-100 rounded-top-3"
                                            style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
                                            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                                            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                                        />
                                    </div>

                                    <div className="card-body d-flex flex-column p-3">
                                        <p
                                            className="text-white fw-semibold mb-1"
                                            style={{
                                                fontSize: "14px",
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {product.title}
                                        </p>

                                        <p className="mb-2" style={{ fontSize: "14px", color: "#aaa" }}>
                                            Price:{" "}
                                            {product.discount ? (
                                                <>
                                                    <strike className="text-secondary">${product.price}</strike>{" "}
                                                    <span className="text-success fw-bold">${product.discountPrice}</span>
                                                </>
                                            ) : (
                                                <span className="text-success fw-bold">${product.price}</span>
                                            )}
                                        </p>

                                        <div className="mb-3">{renderStars(product.star)}</div>

                                        <div className="mt-auto d-flex gap-2">
                                            <button
                                                onClick={() => remove(item.productID)}
                                                className="btn btn-outline-danger btn-sm flex-fill"
                                            >
                                                <i className="bi bi-trash me-1"></i>Remove
                                            </button>
                                            <Link
                                                className="btn btn-outline-success btn-sm flex-fill"
                                                to={`/details/${item.productID}`}
                                            >
                                                <i className="bi bi-eye me-1"></i>Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default WishList;