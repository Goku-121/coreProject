import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";

// Store imports
import ProductStroe from "../store/ProductStore";  // ProductStroe.js
import FeaturesStore from "../store/FeaturesStore";  // FeaturesStore.js


import Slider from "../components/products/Slider";
import Features from "../components/features/Features";
import Categories from "../components/products/Categories";
import Products from "../components/products/Products";
import Brands from "../components/products/Brands";

const HomePage = () => {
  const { BrandListRequest, CategoryListRequest, SliderListRequest, ListByRemarkRequest } = ProductStroe();
  const { FeaturesListRequest } = FeaturesStore();

  useEffect(() => {
    (async () => {
      await SliderListRequest();
      await FeaturesListRequest();
      await BrandListRequest();
      await CategoryListRequest();
      await ListByRemarkRequest("new");
    })();
  }, []);

  return (
    <Layout>
      <Slider />
      <Features />
      <Categories />
      <Products />
      <Brands />
    </Layout>
  );
};

export default HomePage;