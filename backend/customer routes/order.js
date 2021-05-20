const router = require("express").Router();
let Order = require("../customer models/order.model");

router.route("/").get((req, res) => {
  Order.find()
    .then((order) => res.json(order))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const restaurantname = req.body.restaurantname;
  const name = req.body.name;
  const dinein = Boolean(req.body.dinein);
  const tablereservation = Boolean(req.body.tablereservation);
  const people = Number(req.body.people);
  const status = req.body.status;
  const total = Number(req.body.order.total);

  const settingOrder = req.body.order.products.map((ite) => ({
    item: ite.item,
    price: ite.price,
    quantity: ite.quantity,
  }));

  const newOrder = new Order({
    restaurantname,
    name,
    dinein,
    tablereservation,
    people,
    status,
    order: {
      products: settingOrder,
      total: total,
    },
  });

  newOrder
    .save()
    .then(() => res.json("Order added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.route("/:id").get((req, res) => {
//   Order.findById(req.params.id)
//     .then((order) => res.json(order))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/:id").delete((req, res) => {
//   Order.findByIdAndDelete(req.params.id)
//     .then(() => res.json("order deleted."))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

router.route("/update/:id").post((req, res) => {
  Order.findById(req.params.id)
    .then((order) => {
      order.status = req.body.status;

      order
        .save()
        .then(() => res.json("Status Changed"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
  Order.findByIdAndDelete(req.params.id)
    .then(() => res.json("Order completed."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;