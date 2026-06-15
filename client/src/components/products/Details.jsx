import React, { useState } from 'react';
import ProductImages from './ProductImage';
import ProductDetailsSkeleton from '../../skeleton/ProductDetailsSkeleton';
import ProductStore from '../../store/ProductStore';
import CartStore from '../../store/CartStore';
import WishStore from '../../store/WishStroe.js';
import CartSubmitButton from '../cart/CartSubmitButton';
import parse from 'html-react-parser';
import Reviews, { ReviewList } from './Reviews';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const toArray = (val) => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string' && val.trim()) return val.split(',').map(s => s.trim());
    return [];
};

const Details = () => {
    const { Details } = ProductStore();
    const { CartSaveRequest, CartListRequest } = CartStore();
    const { WishSaveRequest, WishListRequest, isWishSubmit } = WishStore();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    if (!Details || !Details[0]) {
        return <ProductDetailsSkeleton />;
    }

    const product = Details[0];
    const details = product?.details || {};

    const sizeList = toArray(details?.size);
    const colorList = toArray(details?.color);

    const handleAddToCart = async () => {
        if (!selectedSize) {
            toast.error("Please select a size!", {
                style: { background: "#1e1e1e", color: "#fff", border: "1px solid #dc3545" },
            });
            return;
        }
        if (!selectedColor) {
            toast.error("Please select a color!", {
                style: { background: "#1e1e1e", color: "#fff", border: "1px solid #dc3545" },
            });
            return;
        }

        const success = await CartSaveRequest(
            { color: selectedColor, size: selectedSize, qty: quantity.toString() },
            product._id
        );

        if (success) {
            await CartListRequest();
            toast.success("Added to cart! Redirecting...", {
                style: { background: "#1e1e1e", color: "#fff", border: "1px solid #28a745" },
                iconTheme: { primary: "#28a745", secondary: "#fff" },
            });
            setTimeout(() => navigate("/cart"), 1500);
        } else {
            toast.error("Failed to add to cart!", {
                style: { background: "#1e1e1e", color: "#fff", border: "1px solid #dc3545" },
            });
        }
    };

    const handleAddToWish = async () => {
        await WishSaveRequest(product._id);
        await WishListRequest();
    };

    return (
        <div className="container mt-2">
            <div className="row">

                {/* Product Images - Left Column */}
                <div className="col-md-7 p-3">
                    <ProductImages />
                </div>

                {/* Product Info - Right Column */}
                <div className="col-md-5 p-3">
                    <h4>{product?.title || "No Title"}</h4>

                    <p className="text-muted small">
                        Category: {product?.category?.categoryName || "N/A"}
                    </p>
                    <p className="text-muted small">
                        Brand: {product?.brand?.brand || "N/A"}
                    </p>
                    <p className="small">{product?.shortDescription || "N/A"}</p>

                    {/* Pricing */}
                    <div className="mb-3">
                        {product?.discount ? (
                            <>
                                <strike className="text-secondary me-2">${product?.price}</strike>
                                <strong className="text-success fs-5">${product?.discountPrice}</strong>
                            </>
                        ) : (
                            <strong className="text-success fs-5">${product?.price}</strong>
                        )}
                    </div>

                    <div className="row g-2">

                        {/* Size Selector */}
                        <div className="col-4">
                            <label className="small fw-semibold">Size</label>
                            <select
                                className="form-select form-select-sm mt-1"
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                            >
                                <option value="">Select</option>
                                {sizeList.map((item, i) => (
                                    <option key={i} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>

                        {/* Color Selector */}
                        <div className="col-4">
                            <label className="small fw-semibold">Color</label>
                            <select
                                className="form-select form-select-sm mt-1"
                                value={selectedColor}
                                onChange={(e) => setSelectedColor(e.target.value)}
                            >
                                <option value="">Select</option>
                                {colorList.map((item, i) => (
                                    <option key={i} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>

                        {/* Quantity Control */}
                        <div className="col-4">
                            <label className="small fw-semibold">Quantity</label>
                            <div className="input-group input-group-sm mt-1">
                                <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={decrementQuantity}
                                >
                                    <i className="bi bi-dash"></i>
                                </button>
                                <input
                                    className="form-control text-center"
                                    value={quantity}
                                    readOnly
                                />
                                <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={incrementQuantity}
                                >
                                    <i className="bi bi-plus"></i>
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="col-6">
                            <CartSubmitButton
                                onClick={handleAddToCart}
                                text={
                                    <>
                                        <i className="bi bi-cart-plus me-1"></i>
                                        Add to Cart
                                    </>
                                }
                                className="btn btn-success btn-sm w-100"
                            />
                        </div>

                        {/* Add to Wishlist */}
                        <div className="col-6">
                            <button
                                onClick={handleAddToWish}
                                disabled={isWishSubmit}
                                className="btn btn-warning btn-sm w-100"
                            >
                                {isWishSubmit ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-1"></span>
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-heart me-1"></i>
                                        Add to Wish
                                    </>
                                )}
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Product Tabs - Specs & Reviews */}
            <div className="mt-3">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button
                            className="nav-link active"
                            data-bs-toggle="tab"
                            data-bs-target="#spec"
                        >
                            <i className="bi bi-journal-text me-1"></i>Specs
                        </button>
                    </li>
                    <li className="nav-item">
                        <Reviews />
                    </li>
                </ul>

                <div className="tab-content mt-2">
                    <div className="tab-pane fade show active" id="spec">
                        {details?.description ? parse(details.description) : "No description available"}
                    </div>
                    <div className="tab-pane fade" id="review">
                        <ReviewList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;