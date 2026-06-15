import React, { useEffect } from 'react';
import cartStore from "../../store/CartStore";
import CartSubmitButton from "./CartSubmitButton.jsx";
import NoData from "../layout/no-data.jsx";
import CartSkeleton from "../../skeleton/CartListSkeleton.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CartList = () => {
    const navigate = useNavigate();
    const {
        CartTotal,
        CartVatTotal,
        CartPayableTotal,
        CartListRequest,
        CartList,
        CreateInvoiceRequest,
        RemoveCartListRequest,
        isCartSubmit
    } = cartStore();

    useEffect(() => {
        CartListRequest();
    }, []);

    const remove = async (cartID) => {
        const success = await RemoveCartListRequest(cartID);
        if (success) {
            toast.success("Item removed from cart!", {
                style: { background: "#1e1e1e", color: "#fff", border: "1px solid #28a745" },
                iconTheme: { primary: "#28a745", secondary: "#fff" },
            });
            await CartListRequest();
        } else {
            toast.error("Failed to remove item!", {
                style: { background: "#1e1e1e", color: "#fff", border: "1px solid #dc3545" },
            });
        }
    };

    const checkout = async () => {
        const success = await CreateInvoiceRequest();
        if (success) {
            toast.success("Order placed! Redirecting to payment...", {
                style: { background: "#1e1e1e", color: "#fff", border: "1px solid #28a745" },
                iconTheme: { primary: "#28a745", secondary: "#fff" },
            });
            await CartListRequest();
            setTimeout(() => navigate("/orders"), 1500);
        } else {
            toast.error("Checkout failed. Try again!", {
                style: { background: "#1e1e1e", color: "#fff", border: "1px solid #dc3545" },
            });
        }
    };

    if (CartList == null) return <CartSkeleton />;
    if (CartList.length === 0) return <NoData />;

    return (
        <div className="container mt-4">

            {/* Header */}
            <div className="d-flex align-items-center mb-4 gap-2">
                <h5 className="mb-0 fw-bold text-white">My Cart</h5>
                <span className="badge rounded-pill bg-success">{CartList.length}</span>
            </div>

            <div className="row g-4">

                {/* Cart Items */}
                <div className="col-lg-8">
                    <div className="d-flex flex-column gap-3">
                        {CartList.filter(item => item?.product).map((item) => {
                            const price = item.product.discount
                                ? item.product.discountPrice
                                : item.product.price;
                            const lineTotal = parseInt(price) * parseInt(item.qty);

                            return (
                                <div key={item._id}
                                    className="d-flex align-items-center gap-3 p-3 rounded-3"
                                    style={{ backgroundColor: "#1e1e1e", border: "1px solid #333" }}
                                >
                                    {/* Image */}
                                    <img
                                        src={item.product.image}
                                        alt={item.product.title}
                                        className="rounded-2"
                                        style={{ width: "90px", height: "90px", objectFit: "cover", flexShrink: 0 }}
                                    />

                                    {/* Info */}
                                    <div className="flex-grow-1">
                                        <p className="text-white fw-semibold mb-1"
                                            style={{
                                                fontSize: "14px",
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden"
                                            }}>
                                            {item.product.title}
                                        </p>
                                        <p className="mb-1" style={{ fontSize: "13px", color: "#aaa" }}>
                                            Unit Price:{" "}
                                            <span className="text-success fw-bold">${price}</span>
                                            {" · "}Qty: <span className="text-white">{item.qty}</span>
                                            {item.size && <>{" · "}Size: <span className="text-white">{item.size}</span></>}
                                            {item.color && <>{" · "}Color: <span className="text-white">{item.color}</span></>}
                                        </p>
                                        <p className="mb-0 fw-bold text-success" style={{ fontSize: "15px" }}>
                                            Total: ${lineTotal}
                                        </p>
                                    </div>

                                    {/* Remove */}
                                    <button
                                        onClick={() => remove(item._id)}
                                        className="btn btn-outline-danger btn-sm"
                                        style={{ flexShrink: 0 }}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Summary */}
                <div className="col-lg-4">
                    <div className="p-4 rounded-3 sticky-top"
                        style={{ backgroundColor: "#1e1e1e", border: "1px solid #333", top: "100px" }}>
                        <h6 className="text-white fw-bold mb-3">
                            <i className="bi bi-receipt me-2"></i>Order Summary
                        </h6>
                        <hr style={{ borderColor: "#333" }} />

                        <div className="d-flex justify-content-between mb-2">
                            <span style={{ color: "#aaa" }}>Subtotal</span>
                            <span className="text-white">${CartTotal}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span style={{ color: "#aaa" }}>VAT (5%)</span>
                            <span className="text-white">${CartVatTotal}</span>
                        </div>

                        <hr style={{ borderColor: "#333" }} />

                        <div className="d-flex justify-content-between mb-4">
                            <span className="text-white fw-bold">Payable</span>
                            <span className="text-success fw-bold fs-5">${CartPayableTotal}</span>
                        </div>

                        <CartSubmitButton
                            text="Check Out"
                            onClick={checkout}
                            isLoading={isCartSubmit}
                            className="btn btn-success w-100 py-2 fw-bold"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CartList;