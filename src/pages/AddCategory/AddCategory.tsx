import React, { useState, type FC } from 'react';
import { useFetchData } from '../../hooks';

type returnTypes = {
  message: string;
  data: {
    name: string;
  };
};

export const AddCategory: FC = () => {
  const [categoryName, setCategoryName] = useState('');
  const { fetchData, isLoading, error, data } = useFetchData<returnTypes>(); // Assuming the API returns any type

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name: categoryName };

    try {
      const res = await fetchData({
        url: '/categories',
        method: 'POST',
        body: payload,
      });

      console.log('Category added successfully:', data);
      console.log('Category added successfully:', res);
      setCategoryName('');
      // Handle success (e.g., show a success message)
    } catch (err) {
      console.error('Error adding category:', err);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div>
      <h1>Add Category</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Category'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      {data && <p>Category added successfuly</p>}
    </div>
  );
};
