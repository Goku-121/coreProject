import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Details from '../components/products/Details';
import Brands from '../components/products/Brands';
import ProductStore from '../store/ProductStore';

const ProductDetails = () => {
    const { BrandList, DetailsRequest, ReviewListRequest, BrandListRequest } = ProductStore();
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            await DetailsRequest(id);
            await ReviewListRequest(id);
            if (BrandList === null) await BrandListRequest();
        })();
    }, [id]); 

    return (
        <Layout>
            <Details />
            <Brands />
        </Layout>
    );
};

export default ProductDetails;