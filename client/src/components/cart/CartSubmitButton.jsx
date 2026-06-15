import React from 'react';
import CartStore from "../../store/CartStore";

const CartSubmitButton = (props) => {
    let { isCartSubmit } = CartStore();

    return (
        <button
            onClick={props.onClick}
            type="submit"
            className={props.className}
            disabled={isCartSubmit}
        >
            {/* ✅ Fix: Processing spinner when loading */}
            {isCartSubmit ? (
                <>
                    <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                    />
                    Processing...
                </>
            ) : (
                props.text
            )}
        </button>
    );
};

export default CartSubmitButton;