const express = require("express");
const router = express.Router();
const Product = require("./models/Product");
const Category = require("./models/Category");
const Order = require("./models/Order");

router.get("/", (req, res) => {
  res.status(200).send("wellcome home my friend");
});

router.get("/getAllSmartphones", async (req, res) => {
  try {
    const items = await Product.find({ category: "Smartphones" });
    // console.log("items", );
    res.send(items);
  } catch (err) {
    console.log("👹 hehehe, something went wrong, here is probleb: ", err);
  }
  // Product.find();
});

router.get("/calculateTotalProfit", async (req, res) => {
  try {
    const items = await Product.find();
    let totalCount = 0;
    items.forEach((item) => {
      totalCount += item.price;
    });
    console.log("totalCount: ", totalCount);
    res.send(totalCount);
  } catch (err) {
    console.log("👹 hehehe, something went wrong, here is probleb: ", err);
  }
});

router.get("/updateNumOfitems", async (req, res) => {
  try {
  } catch (err) {
    console.log("👹 hehehe, something went wrong, here is probleb: ", err);
  }
});

router.get("/topItems", async (req, res) => {
  try {
    let itemsQuantity = {};

    const orders = await Order.find().lean();
    console.log("👀", orders);
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const category = item.category || "unknown";
        const quantity = item.quantity;
        console.log(typeof category);
        itemsQuantity[category] = (itemsQuantity[category] || 0) + quantity;
      });
    });

    console.log("🗄️ obj with list of items and their counts: ", itemsQuantity);

    // 1) find the maximum quantity value
    const maxQty = Math.max(...Object.values(itemsQuantity));

    // 2) find which key has that value
    const maxCategory = Object.keys(itemsQuantity).find(
      (cat) => itemsQuantity[cat] === maxQty
    );

    console.log(`Top: ${maxCategory} (${maxQty})`);

    res.status(200).json(maxCategory);
  } catch (err) {
    console.log("👹 hehehe, something went wrong, here is probleb: ", err);
  }
});

module.exports = router;
