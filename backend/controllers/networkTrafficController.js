const NetworkTraffic = require("../models/NetworkTraffic");
const User = require("../models/User");

exports.newNetworkTraffic = async (req, res) => {
  try {
    console.log(req.body)
    const newTraffic = new NetworkTraffic(req.body);

    const validationErrors = newTraffic.validateSync();

    if (validationErrors) {
      const errorMessages = Object.values(validationErrors.errors).map(error => error.message);
      return res.status(400).json({ errors: errorMessages, message: "Validation Errors" });
    }
    
    const savedTraffic = await newTraffic.save();

    res.status(201).json(savedTraffic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving the network traffic" });
  }
};


exports.getAllNetworkTraffic = async (req, res) => {
  try {
    const networkTraffic = await NetworkTraffic.find().populate('user');

    res.status(200).json(networkTraffic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getNetworkTrafficByParam = async (req, res) => {
  try {
    const { protocolType, service, flag, user } = req.query;

    const filter = {};
    if (protocolType) filter.protocolType = protocolType;
    if (service) filter.service = service;
    if (flag) filter.flag = flag;
    if (user) filter.user = user; 

    const networkTraffic = await NetworkTraffic.find(filter).populate('user');

    if (networkTraffic.length === 0) {
      return res
        .status(404)
        .json({
          message: "No network traffic found!",
        });
    }

    res.status(200).json(networkTraffic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

