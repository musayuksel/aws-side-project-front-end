import { useState, useEffect } from "react";

export const usePromos = (channel) => {
  const [promoData, setPromoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://z54uu6fx6e.execute-api.eu-west-1.amazonaws.com/Prod/promos?channel=${channel}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch promos: ${response.statusText}`);
        }
        const data = await response.json();
        setPromoData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPromos();
  }, [channel]);

  return { promoData, loading, error };
};
