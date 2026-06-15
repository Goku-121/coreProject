import React, { useEffect } from 'react';
import ProductStore from '../../store/ProductStore';
import { Rating, Star } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

const myStyles = {
  itemShapes: Star,
  activeFillColor: 'red',
  inactiveFillColor: '#ccc',
  activeStrokeColor: 'red',
  inactiveStrokeColor: '#ccc',
  itemStrokeWidth: 1,
};

const Reviews = () => {
  return (
    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#review">
      Reviews
    </button>
  );
};

export const ReviewList = () => {
  const { ReviewList: reviewData, ReviewListRequest, Details } = ProductStore();
  const reviews = reviewData || [];

  useEffect(() => {
    if (Details?.[0]?._id) {
      ReviewListRequest(Details[0]._id);
    }
  }, [Details]);

  return (
    <ul className="list-group list-group-flush">
      {reviews.length > 0 ? (
        reviews.map((item, i) => (
          <li key={i} className="list-group-item">
            <h6 className="mb-0 p-0">
              <i className="bi bi-person-circle mx-auto p-2"></i>
              {item['profile']?.['cus_name'] || "Anonymous"}
            </h6>
            <Rating
              value={parseFloat(item['rating']) || 0}
              readOnly
              style={{ maxWidth: 90 }}
              itemStyles={myStyles}
            />
            <p>{item['description']}</p>
          </li>
        ))
      ) : (
        <li className="list-group-item">No reviews found</li>
      )}
    </ul>
  );
};

export default Reviews;