import React, { use, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AppCard = ({ app }) => (
  <Link to={`/apps/${app.id}`} className="border rounded-2xl shadow-lg p-4 w-full sm:w-64 hover:scale-105 transition-transform">
    <img src={app.thumbnail} alt={app.name} className="w-full h-40 object-cover rounded-xl mb-2" />
    <h3 className="text-lg font-semibold">{app.name}</h3>
    <p className="text-sm">Rating: {app.rating} ⭐</p>
    <p className="text-sm">Downloads: {app.downloads.toLocaleString()}</p>
  </Link>
);

export default function Apps() {

  const appsData = useLoaderData();

  if (appsData.length === 0) return <p className="text-center mt-10">Loading apps...</p>;

  const sliderApps = appsData.slice(0, 3);

  const trendingApps = [...appsData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const categories = ['Productivity', 'Gaming', 'Education'];

  const extraSectionApps = [...appsData]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 3);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  return (
    <div className="space-y-10 px-4 sm:px-10 py-6">

      {/* Slider Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Featured Promotions</h2>
        <Slider {...sliderSettings}>
          {sliderApps.map(app => (
            <div key={app.id} className="p-2">
              <img src={app.banner} alt={app.name} className="w-full h-[600px] object-cover rounded-xl" />
            </div>
          ))}
        </Slider>
      </div>

      {/* Trending Apps */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Trending Apps</h2>
        <div className="flex flex-wrap gap-4">
          {trendingApps.map(app => <AppCard key={app.id} app={app} />)}
        </div>
      </div>

      {/* Category Sections */}
      {categories.map(category => (
        <div key={category}>
          <h2 className="text-2xl font-bold mb-4">{category}</h2>
          <div className="flex flex-wrap gap-4">
            {appsData.filter(app => app.category === category).map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </div>
      ))}

      {/* Extra Section: Most Downloaded */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Most Downloaded Apps</h2>
        <div className="flex flex-wrap gap-4">
          {extraSectionApps.map(app => <AppCard key={app.id} app={app} />)}
        </div>
      </div>

    </div>
  );
}
