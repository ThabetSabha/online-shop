const express = require("express");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const enforce = require("express-sslify");
const helmet = require("helmet");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(compression());
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "service-worker.js"));
});

//Stripe:
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).json(stripeErr);
    } else {
      res.status(200).json(stripeRes);
    }
  });
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port" + port);
});
