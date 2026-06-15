import React from 'react'
import ProductStore from '../../store/ProductStore';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const ProductImages = () => {
    const { Details } = ProductStore();

    
    const details = Details?.[0]?.details || {};

    const images = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7', 'img8']
        .map(key => details[key])
        .filter(Boolean)
        .map(url => ({ original: url, thumbnail: url }));

    if (images.length === 0) {
        return <div className="text-muted p-3">No images available</div>;
    }

    return (
        <div>
            <ImageGallery autoPlay={true} items={images} />
        </div>
    );
};

export default ProductImages;