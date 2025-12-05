import React, { useEffect, useState } from 'react';

function CategoryGrid({ onTypeSelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://api.mridangas.com/api/products/product-types/')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  const categoryImages = {
    'Mobiles': 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=400&fit=crop',
    'Fashion': 'https://images.unsplash.com/photo-1539533057592-4d2b7472e0a7?w=400&h=400&fit=crop',
    'Appliances': 'https://images.unsplash.com/photo-1584998572914-78b5b00dbf13?w=400&h=400&fit=crop',
    'Laptops': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    'Furniture': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    'Groceries': 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=400&fit=crop',
    'Covers': 'https://mridangas-buacket.s3.us-east-1.amazonaws.com/media/products/CKS04880A.jpg',
    'Djembe': '',
    'Harmonium': 'https://mridangas-buacket.s3.us-east-1.amazonaws.com/media/products/CKS04838.JPG',
    'Kansa Metal Instruments': 'https://mridangas-buacket.s3.us-east-1.amazonaws.com/media/products/CKS04887A.jpg',
    'Kartal': 'https://mridangas-buacket.s3.us-east-1.amazonaws.com/media/products/CKS04894A_1Zx0oPv.jpg',
    'Kartals': 'https://mridangas-buacket.s3.us-east-1.amazonaws.com/media/products/CKS04894A_1Zx0oPv.jpg',
    'Mridangas': 'https://mridangas-buacket.s3.us-east-1.amazonaws.com/media/products/CKS04859.JPG',
    'Mridanga': 'https://mridangas-buacket.s3.us-east-1.amazonaws.com/media/products/CKS04873_8nVC8t7.JPG',
    'Whomper': 'https://mridangas-buacket.s3.us-east-1.amazonaws.com/media/products/CKS04901A_bJg2Db9.jpg',
    'bag': 'https://mridangas-buacket.s3.us-east-1.amazonaws.com/media/products/CKS04828.JPG'
  };

  const defaultCategories = [
    { type_id: 1, type_name: 'Kartal', image: categoryImages['Kartal'] },
    { type_id: 2, type_name: 'Harmonium', image: categoryImages['Harmonium'] },
    { type_id: 3, type_name: 'Mridangas', image: categoryImages['Mridangas'] },
    { type_id: 4, type_name: 'Whomper', image: categoryImages['Whomper'] },
    { type_id: 5, type_name: 'Covers', image: categoryImages['Covers'] },
    { type_id: 6, type_name: 'bag', image: categoryImages['bag'] },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <section>
      <h2 className="text-gray-900 text-[22px] font-bold leading-tight tracking-tight px-4 pb-3 pt-5">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
        {displayCategories.map((cat) => (
          <div
            key={cat.type_id}
            onClick={() => onTypeSelect(cat.type_id)}
            className="relative group overflow-hidden rounded-lg cursor-pointer"
          >
            <div
              className="bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end p-4 aspect-square transition-transform duration-300 group-hover:scale-105"
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%), url(${cat.image || categoryImages[cat.type_name] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'})`
              }}
            >
              <p className="text-white text-base font-bold leading-tight line-clamp-2">{cat.type_name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryGrid;
