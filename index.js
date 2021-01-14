import express from "express";
import dotenv from "dotenv";
// import fetch from "node-fetch";
import axios from "axios";

dotenv.config();
const port = process.env.PORT;
const app = express();

const baseUrl =
  "https://api.exchangeratesapi.io/latest?base=CZK&symbols=EUR,GBP,USD";
const defaultUrl = "https://api.exchangeratesapi.io/latest";

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(`oops! : ${error}`);
  }
};

app.get(`/api/rates`, (req, res) => {
  console.log(req.query);
  if (req.query.base === "CZK") {
    return fetchData(baseUrl).then((data) => res.json({ results: data }));
  } else if (!req.query.base) {
    return fetchData(defaultUrl).then((data) => res.json({ results: data }));
  } else {
    res.send("Oops! Couldn't find page");
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
