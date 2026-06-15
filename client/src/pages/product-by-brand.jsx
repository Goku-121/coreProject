import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductStore from '../store/ProductStore';
import Layout from '../components/layout/Layout';
import ProductList from '../components/products/ProductList';

const ProductByBrand = () => {
    const { ListByBrandRequest } = ProductStore();
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            await ListByBrandRequest(id);
        })();
    }, [id]);

    return (
        <Layout>
            <ProductList brandId={id} />
        </Layout>
    );
};

export default ProductByBrand;