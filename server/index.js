import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());

const axiosService = axios.create({
  baseURL: process.env.YELP_API_ENDPOINT,
  headers: {
    Authorization: `Bearer ${process.env.YELP_API_KEY}`,
  },
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/getTopFiveIceCreamShops", async (req, res) => {
  const result = await axiosService.get("/businesses/search", {
    params: {
      term: "ice cream",
      categories: "icecream",
      location: "Alpharetta, GA",
      sort_by: "review_count",
      limit: 5,
    },
  });
  return res.json(result.data);
});

app.get("/getTopFiveIceCreamShops/:id/review", async (req, res) => {
  const id = req.params.id;
  const result = await axiosService.get(`/businesses/${id}/reviews`);
  return res.json(result.data);
});

app.listen(5000, () => console.log("App listening on port 5000."));
