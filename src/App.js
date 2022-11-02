import axios from "axios";
import { useEffect, useState } from "react";
import Review from "./Review";
import "./App.css";

function App() {

  const [data, setData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const apiBaseUrl = "http://localhost:5000";

  const fetchTopFiveIceCreamShops = async () => {
    const result = await axios.get(`${apiBaseUrl}/getTopFiveIceCreamShops`);
    return result.data.businesses;
  };

  const getReview = async (id) => {
    if (!reviews.hasOwnProperty(id)) {
      const result = await axios.get(`${apiBaseUrl}/getTopFiveIceCreamShops/${id}/review`);
      setReviews({ ...reviews, [id]: result.data.reviews });
    }
  };

  useEffect(() => {
    (async () => {
      const shops = await fetchTopFiveIceCreamShops();
      setData(shops);
    })();
  }, []);

  return (
    <div className="App">
      <h1>Top five ice cream shops in Alpharetta, GA</h1>

      {data.length === 0 && <div className="center">Loading...</div>}

      <ul className="card">
        {data.length > 0 &&
          data.map((shop) => {
            return (
              <li key={shop.id}>
                <div className="title">{shop.name}</div>
                <div>
                  {shop.location.address1}, {shop.location.city}
                </div>
                <button onClick={() => getReview(shop.id)}>Show Reviews</button>
                <Review shop={shop} reviews={reviews} />
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default App;
