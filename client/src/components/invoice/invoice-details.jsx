import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import CartStore from "../../store/CartStore.js";
import NoData from "../layout/no-data.jsx"
import CartSkeleton from "../../skeleton/CartListSkeleton.jsx";
import { Modal } from "react-bootstrap";
import ReviewStore from "../../store/ReviewStore.js";
import ProductStore from "../../store/ProductStore.js";
import ValidationHelper from "../../utility/ValidatonHelper.js";
import toast from "react-hot-toast";
import ReviewSubmitButton from "./ReviewSubmitButton.jsx";

const StarRating = ({ value, onChange }) => {
    const [hovered, setHovered] = useState(null);
    const stars = [1, 2, 3, 4, 5];
    const current = hovered ?? value;

    const getStarFill = (star) => {
        if (current >= star) return "full";
        if (current >= star - 0.5) return "half";
        return "empty";
    };

    return (
        <div className="d-flex align-items-center gap-1">
            <div className="d-flex" style={{ fontSize: "2rem", cursor: "pointer" }}>
                {stars.map((star) => {
                    const fill = getStarFill(star);
                    return (
                        <span
                            key={star}
                            onMouseMove={(e) => {
                                const { left, width } = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - left;
                                setHovered(x < width / 2 ? star - 0.5 : star);
                            }}
                            onMouseLeave={() => setHovered(null)}
                            onClick={(e) => {
                                const { left, width } = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - left;
                                onChange(x < width / 2 ? star - 0.5 : star);
                            }}
                            style={{ position: "relative", userSelect: "none" }}
                        >
                            <span style={{ color: "#ccc" }}>★</span>
                            <span style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                overflow: "hidden",
                                width: fill === "full" ? "100%" : fill === "half" ? "50%" : "0%",
                                color: "#f5a623",
                                transition: "width 0.1s"
                            }}>★</span>
                        </span>
                    );
                })}
            </div>
            <span className="fs-6 text-muted ms-1">{value} / 5</span>
        </div>
    );
};

const InvoiceDetails = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    let { ReviewFormData, ReviewFormOnChange, ReviewSaveRequest } = ReviewStore();
    let { ReviewListRequest } = ProductStore();

    const ReviewModal = (id) => {
        setShow(true);
        ReviewFormOnChange('productID', id);
    }

    const { id } = useParams();
    let { InvoiceDetails, InvoiceDetailsRequest } = CartStore();

    useEffect(() => {
        (async () => {
            await InvoiceDetailsRequest(id);
        })()
    }, [id]);

    const submitReview = async () => {
        if (ValidationHelper.IsEmpty(ReviewFormData.description)) {
            toast.error("Review Required");
        } else {
            let res = await ReviewSaveRequest(ReviewFormData);
            if (res) {
                toast.success("New Review Created");
                await ReviewListRequest(ReviewFormData.productID);
            } else {
                toast.error("Something Went Wrong!");
            }
            setShow(false);
        }
    }

    if (InvoiceDetails == null) {
        return <CartSkeleton />;
    } else if (InvoiceDetails.length === 0) {
        return <NoData />;
    } else {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card p-4">
                            <ul className="list-group list-group-flush">
                                {
                                    InvoiceDetails.map((item) => {
                                        return (
                                            <li key={item._id} className="list-group-item d-flex justify-content-between align-items-start">
                                                <img className="rounded-1" alt="" width="90" height="auto" src={item['products']['image']} />
                                                <div className="ms-2 me-auto">
                                                    <div className="fw-medium h6">
                                                        {item['products']['title']}
                                                    </div>
                                                    <span>Unit Price: {item['price']}, Total: {item['price'] * parseInt(item['qty'])}</span><br />
                                                    <span>Qty: {item['qty']}, Size: {item['size']}, Color: {item['color']}</span>
                                                </div>
                                                <button onClick={() => ReviewModal(item['productID'])} className="btn btn-success">Create Review</button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <h6>Create Review</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-12 p-2">
                                    <label className="form-label d-block">Rating</label>
                                    <StarRating
                                        value={ReviewFormData.rating}
                                        onChange={(val) => ReviewFormOnChange('rating', val)}
                                    />
                                </div>
                                <div className="col-12 p-2">
                                    <label className="form-label">Review</label>
                                    <textarea
                                        onChange={(e) => ReviewFormOnChange('description', e.target.value)}
                                        className="form-control"
                                        rows={7}
                                    />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-dark" onClick={handleClose}>Close</button>
                        <ReviewSubmitButton text="Submit" className="btn btn-success" onClick={submitReview} />
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
};

export default InvoiceDetails;