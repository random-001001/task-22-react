import React, { useState, useEffect, useCallback } from "react";

function App() {
  // Custom hook for fetching data
  function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }, [url]);

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    return { data, loading, error };
  }

  // Using the custom hook
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/photos?_limit=12"
  );

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold mb-4">Photos</h1>
      <div className="grid grid-cols-3 gap-4">
        {data.map((photo) => (
          <div key={photo.id} className="border border-white p-2">
            <div
              className="w-full h-60 flex items-center justify-center text-gray-200 text-xl"
              style={{
                backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
              }}
            >
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center mt-2">{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
