import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductStore from "../../store/ProductStore";
import CategoriesSkeleton from "../../skeleton/CategoriesSkeleton";

const Categories = () => {
    const { CategoryList, CategoryListRequest } = ProductStore();  // ← add CategoryListRequest

    useEffect(() => {
        if (!CategoryList) {
            CategoryListRequest();  // ← fetch if not already loaded
        }
    }, []);

    if (CategoryList === null) {
        return <CategoriesSkeleton />;
    }

    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <h1 className="headline-4 text-center my-2 p-0">Top Categories</h1>
                    <span className="bodySmall mb-5 text-center">
                        Explore a World of Choices Across Our Most Popular Categories
                    </span>

                    {CategoryList.map((item, i) => (
                        <div key={item._id || i} className="col-6 col-lg-3 col-md-3 p-2">
                            <Link
                                to={`/by-category/${item['_id']}`}
                                className="card h-100 rounded-3 overflow-hidden text-decoration-none"
                            >
                                <div style={{ height: "200px", overflow: "hidden" }}>
                                    <img
                                        alt={item['categoryName']}
                                        src={item['categoryImg']}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover"
                                        }}
                                    />
                                </div>
                                <div className="card-body text-center py-3">
                                    <p className="bodySmall mb-0 fw-medium">
                                        {item['categoryName']}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;