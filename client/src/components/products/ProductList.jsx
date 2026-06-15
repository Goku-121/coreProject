import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductStore from '../../store/ProductStore';
import ProductsSkeleton from '../../skeleton/ProductsSkeleton';

const StarRatings = ({ rating }) => {
    const stars = Math.round(parseFloat(rating) || 0);
    return (
        <div style={{ display: 'flex', gap: '2px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    style={{
                        color: star <= stars ? '#f59e0b' : '#d1d5db',
                        fontSize: '14px'
                    }}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

const ProductList = () => {

    const { ListProduct, BrandListRequest, BrandList, CategoryList, CategoryListRequest, ListByFilterRequest } = ProductStore();

    const [Filter, SetFilter] = useState({
        brandId: "",
        categoryId: "",
        priceMin: 0,
        priceMax: 0
    });

    const inputOnChange = (name, value) => {
        SetFilter((data) => ({
            ...data,
            [name]: value
        }));
    };

    // Load Brands and Categories
    useEffect(() => {
        (async () => {
            if (BrandList === null) await BrandListRequest();
            if (CategoryList === null) await CategoryListRequest();
        })();
    }, []);

    // Apply Filter when Filter changes
    useEffect(() => {
        const filterToSend = {
            ...Filter,
            priceMax: Filter.priceMax === 0 ? 10000 : Filter.priceMax
        };

        (async () => {
            await ListByFilterRequest(filterToSend);
        })();
    }, [Filter]);

    return (
        <div style={{ display: 'flex', gap: '20px', padding: '16px', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>

            {/* Filter Sidebar */}
            <div style={{
                width: '260px',
                minWidth: '260px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                height: 'fit-content',
                position: 'sticky',
                top: '16px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                   <span style={{ fontSize: '16px' }}><i className="bi bi-filter-square"></i></span>
                    <h6 style={{ margin: 0, fontWeight: 700, fontSize: '15px', color: '#111827' }}>Filter Products</h6>
                </div>

                {/* Brand */}
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                        Brands
                    </label>
                    <select
                        value={Filter.brandId}
                        onChange={(e) => inputOnChange('brandId', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 10px',
                            borderRadius: '8px',
                            border: '1px solid #d1d5db',
                            fontSize: '13px',
                            color: '#374151',
                            backgroundColor: '#fff',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="">Choose Brand</option>
                        {BrandList?.map((item) => (
                            <option key={item['_id']} value={item['_id']}>
                                {item['brand']}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Category */}
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                        Categories
                    </label>
                    <select
                        value={Filter.categoryId}
                        onChange={(e) => inputOnChange('categoryId', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 10px',
                            borderRadius: '8px',
                            border: '1px solid #d1d5db',
                            fontSize: '13px',
                            color: '#374151',
                            backgroundColor: '#fff',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="">Choose Category</option>
                        {CategoryList?.map((item) => (
                            <option key={item['_id']} value={item['_id']}>
                                {item['categoryName']}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Max Price */}
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                        Maximum Price: <span style={{ color: '#2563eb' }}>${Filter.priceMax}</span>
                    </label>
                    <input
                        type="range"
                        min={0}
                        max={5000}
                        step={100}
                        value={Filter.priceMax}
                        onChange={(e) => inputOnChange('priceMax', e.target.value)}
                        style={{ width: '100%', accentColor: '#2563eb' }}
                    />
                    <input
                        type="number"
                        value={Filter.priceMax}
                        onChange={(e) => inputOnChange('priceMax', e.target.value)}
                        min={0}
                        max={5000}
                        style={{
                            width: '100%',
                            marginTop: '6px',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            border: '1px solid #d1d5db',
                            fontSize: '13px',
                            outline: 'none'
                        }}
                    />
                </div>

                {/* Min Price */}
                <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                        Minimum Price: <span style={{ color: '#2563eb' }}>${Filter.priceMin}</span>
                    </label>
                    <input
                        type="range"
                        min={0}
                        max={3000}
                        step={100}
                        value={Filter.priceMin}
                        onChange={(e) => inputOnChange('priceMin', e.target.value)}
                        style={{ width: '100%', accentColor: '#2563eb' }}
                    />
                    <input
                        type="number"
                        value={Filter.priceMin}
                        onChange={(e) => inputOnChange('priceMin', e.target.value)}
                        min={0}
                        max={3000}
                        style={{
                            width: '100%',
                            marginTop: '6px',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            border: '1px solid #d1d5db',
                            fontSize: '13px',
                            outline: 'none'
                        }}
                    />
                </div>
            </div>

            {/* Products Grid */}
            <div style={{ flex: 1 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '16px'
                }}>
                    {ListProduct === null ? (
                        <ProductsSkeleton />
                    ) : (
                        ListProduct.map((item) => {
                            let price;
                            if (item['discount'] === true) {
                                price = (
                                    <p style={{ margin: '4px 0', fontSize: '13px', color: '#111827' }}>
                                        <strike style={{ color: '#9ca3af', marginRight: '6px' }}>${item['price']}</strike>
                                        <span style={{ color: '#16a34a', fontWeight: 700 }}>${item['discountPrice']}</span>
                                    </p>
                                );
                            } else {
                                price = (
                                    <p style={{ margin: '4px 0', fontSize: '13px', color: '#111827', fontWeight: 600 }}>
                                        ${item['price']}
                                    </p>
                                );
                            }

                            let brandName = item.brand?.brand || item.brand || '';

                            return (
                                <Link
                                    key={item['_id']}
                                    to={`/details/${item['_id']}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <div style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                                        height: '100%',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        cursor: 'pointer'
                                    }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.13)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.07)';
                                        }}
                                    >
                                        <img
                                            src={item['image']}
                                            alt={item['title']}
                                            style={{
                                                width: '100%',
                                                height: '160px',
                                                objectFit: 'cover',
                                                display: 'block'
                                            }}
                                        />
                                        <div style={{ padding: '12px' }}>
                                            {brandName && (
                                                <p style={{ margin: '0 0 2px', fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                    {brandName}
                                                </p>
                                            )}
                                            <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#374151', fontWeight: 500, lineHeight: '1.4' }}>
                                                {item['title']}
                                            </p>
                                            {price}
                                            <StarRatings rating={parseFloat(item['star'] || 0)} />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductList;