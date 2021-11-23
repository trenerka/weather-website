const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { ForegroundColor } = require("chalk");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Andre Mead",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Andre Mead",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    message: "This is a help page...",
    name: "Andre Mead",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address)
    return res.send({ error: "You must provide an address" });
  geocode(
    req.query.address,
    (error, { location, latitude, longitude } = {}) => {
      if (error) return res.send({ error });
      forecast(latitude, longitude, (error, data) => {
        if (error) return res.send({ error });
        res.send({
          forecast: "It is snowing",
          location: location,
          address: req.query.address,
          weather: data,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "Help article not found",
    name: "Andre Mead",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    error: "Page not found",
    name: "Andre Mead",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
