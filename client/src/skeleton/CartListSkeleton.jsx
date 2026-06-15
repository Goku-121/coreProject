import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CartSkeleton = () => {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-12">

                    <div className="card p-4">

                        <ul className="list-group list-group-flush">

                            {Array.from({ length: 4 }).map((_, index) => (
                                <li
                                    key={index}
                                    className="list-group-item d-flex align-items-center"
                                >

                                    {/* IMAGE PLACEHOLDER */}
                                    <div className="me-3">
                                        <Skeleton width={80} height={80} />
                                    </div>

                                    {/* TEXT PLACEHOLDER */}
                                    <div className="flex-grow-1">
                                        <Skeleton width={200} />
                                        <Skeleton width={150} />
                                        <Skeleton width={100} />
                                    </div>

                                </li>
                            ))}

                        </ul>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default CartSkeleton;