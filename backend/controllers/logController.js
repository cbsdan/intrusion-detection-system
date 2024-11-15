const Log = require("../models/Log");
const NetworkTraffic = require("../models/NetworkTraffic");

// Create a new log
exports.newLog = async (req, res) => {
  try {
    console.log("Request Body: ", JSON.stringify(req.body));
    const log = new Log(req.body);
    const validationError = log.validateSync();

    if (validationError) {
      const errors = Object.values(validationError.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        errors,
      });
    }

    await log.save();

    res.status(201).json({
      success: true,
      log,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get log by parameters
exports.getLogByParam = async (req, res) => {
  try {
    // Build the query object based on the query parameters
    const query = {};

    // Binary classification filters
    if (req.query.modelUsed) {
      query["binaryClassResult.modelUsed"] = req.query.modelUsed;
    }
    if (req.query.result) {
      query["binaryClassResult.result"] = req.query.result;
    }

    // Multi-class classification filters
    if (req.query.multiClassResult) {
      query["multiClassResult.result"] = req.query.multiClassResult;
    }

    // Network traffic filters
    if (req.query.protocolType) {
      query["networkTraffic.protocol_type"] = req.query.protocolType;
    }

    if (req.query.service) {
      query["networkTraffic.service"] = req.query.service;
    }

    if (req.query.flag) {
      query["networkTraffic.flag"] = req.query.flag;
    }

    if (req.query.user) {
      query["networkTraffic.user.email"] = req.query.user; // Assumes user is in networkTraffic
    }

    // Find logs that match the query
    const logs = await Log.find(query)
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .populate({
        path: "networkTraffic",
        populate: {
          path: "user",
          model: "User",
        },
      });

    if (logs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No logs found matching the provided query",
      });
    }

    res.status(200).json({
      success: true,
      logs,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all logs
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .populate({
        path: "networkTraffic",
        populate: {
          path: "user",
          model: "User",
        },
      });
    res.status(200).json({
      success: true,
      logs,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Dashboard methods (placeholders for now)
exports.getMultiClassTypeCounts = async (req, res) => {
  try {
    // Aggregate the logs based on multi-class result
    const counts = await Log.aggregate([
      { $unwind: "$multiClassResult" }, // Unwind the multiClassResult array
      {
        $group: {
          _id: "$multiClassResult.result", // Group by the result (dos, normal, probe, etc.)
          count: { $sum: 1 }, // Count the occurrences
        },
      },
      {
        $project: {
          _id: 0, // Don't include the _id field in the result
          result: "$_id", // Rename _id to result
          count: 1, // Include the count field
        },
      },
    ]);

    res.status(200).json({
      success: true,
      counts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getBinaryClassTypeCounts = async (req, res) => {
  try {
    // Aggregate the logs based on binary class result
    const counts = await Log.aggregate([
      { $unwind: "$binaryClassResult" }, // Unwind the binaryClassResult array
      {
        $group: {
          _id: "$binaryClassResult.result", // Group by the result (normal or attack)
          count: { $sum: 1 }, // Count the occurrences
        },
      },
      {
        $project: {
          _id: 0, // Don't include the _id field in the result
          result: "$_id", // Rename _id to result
          count: 1, // Include the count field
        },
      },
    ]);

    res.status(200).json({
      success: true,
      counts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Explanation:
// newLog: This method creates a new log entry using the data from the request body. It returns the created log or an error message if the creation fails.
// getLogByParam: This method retrieves a log entry by its ID and populates the networkTraffic field. It returns the log or an error message if not found.
// getAllLogs: This method retrieves all log entries and populates the networkTraffic field for each log.
// getMultiClassTypeCounts and getBinaryClassTypeCounts: These methods are placeholders for future implementations that will count the occurrences of different multi-class and binary types in the logs.
// You can expand the dashboard methods as needed to implement the specific counting logic.
