import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router';

export default function Appdetails() {
  const { id } = useParams();
  const appsData = useLoaderData();

  const app = appsData.find(app => app.id === id);

  const [isInstalled, setIsInstalled] = useState(false);
  const [hasInstalledOnce, setHasInstalledOnce] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState('');
  const [userReviews, setUserReviews] = useState([]);

  if (!app) {
    return <p className="text-center mt-10">App not found</p>;
  }

  const handleInstallToggle = () => {
    setIsInstalled(!isInstalled);
    if (!hasInstalledOnce) {
      setHasInstalledOnce(true);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const rating = parseInt(reviewRating);
    if (!reviewText.trim() || isNaN(rating) || rating < 1 || rating > 5) {
      alert("Please enter a valid review and rating between 1 and 5.");
      return;
    }
    const newReview = {
      user: 'currentUser', // can replace with actual user if available
      rating,
      comment: reviewText,
    };
    setUserReviews([newReview, ...userReviews]);
    setReviewText('');
    setReviewRating('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <img src={app.banner} alt={app.name} className="w-full h-64 object-cover rounded-xl" />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{app.name}</h1>
          <p className="text-sm text-gray-600">By {app.developer}</p>
          <p className="text-sm text-gray-600">Category: {app.category}</p>
        </div>
        <button
          onClick={handleInstallToggle}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {isInstalled ? 'Uninstall' : 'Install'}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <img src={app.thumbnail} alt={app.name} className="w-40 h-40 object-cover rounded-lg" />
        <div className="space-y-2">
          <p><strong>Downloads:</strong> {app.downloads.toLocaleString()}</p>
          <p><strong>Rating:</strong> {app.rating} ⭐</p>
          <p><strong>Description:</strong> {app.description}</p>
          <div>
            <strong>Features:</strong>
            <ul className="list-disc ml-5">
              {app.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Review Form */}
      <div className="border-t pt-6">
        <h2 className="text-2xl font-bold mb-2">Submit a Review</h2>
        {hasInstalledOnce ? (
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Write your review..."
              rows={3}
            />
            <input
              type="number"
              min="1"
              max="5"
              value={reviewRating}
              onChange={(e) => setReviewRating(e.target.value)}
              className="border p-2 rounded w-24"
              placeholder="Rating (1-5)"
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Submit Review
            </button>
          </form>
        ) : (
          <p className="text-gray-600">You must install the app before submitting a review.</p>
        )}
      </div>

      {/* Reviews Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mt-6">User Reviews</h2>
        {[...userReviews, ...app.reviews].map((review, idx) => (
          <div key={idx} className="border p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-700"><strong>{review.user}</strong></p>
            <p className="text-sm">Rating: {review.rating} ⭐</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
