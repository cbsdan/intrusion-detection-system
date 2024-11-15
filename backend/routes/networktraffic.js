const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, isAdmin } = require("../middleware/auth");
const {
  newNetworkTraffic,
  getAllNetworkTraffic,
  getNetworkTrafficByParam,
} = require("../controllers/networkTrafficController");

router.post("/network-traffic", isAuthenticatedUser, newNetworkTraffic);

router.get("/network-traffic-all", isAdmin, getAllNetworkTraffic);

router.get("/network-traffic", isAuthenticatedUser, getNetworkTrafficByParam);

module.exports = router;
