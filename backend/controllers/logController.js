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

exports.getMultiClassTypeCounts = async (req, res) => {
  try {
    // Aggregate the logs based on multi-class result and model used
    const counts = await Log.aggregate([
      { $unwind: "$multiClassResult" }, // Unwind the multiClassResult array
      {
        $group: {
          _id: {
            model: "$multiClassResult.modelUsed", // Group by the model used
            result: "$multiClassResult.result", // Group by the result (dos, normal, probe, etc.)
          },
          count: { $sum: 1 } // Count the occurrences
        }
      },
      {
        $project: {
          _id: 0, // Don't include the _id field in the result
          model: "$_id.model", // Rename _id.model to model
          result: "$_id.result", // Rename _id.result to result
          count: 1 // Include the count field
        }
      }
    ]);

    // Organize counts by model and result
    const modelCounts = counts.reduce((acc, { model, result, count }) => {
      if (!acc[model]) {
        acc[model] = { normal: 0, attack: { dos: 0, probe: 0, r2l: 0, u2r: 0 } };
      }

      if (result === "normal") {
        acc[model].normal = count;
      } else if (result !== "normal") {
        // Categorize attack types
        if (result === "dos") {
          acc[model].attack.dos = count;
        } else if (result === "probe") {
          acc[model].attack.probe = count;
        } else if (result === "r2l") {
          acc[model].attack.r2l = count;
        } else if (result === "u2r") {
          acc[model].attack.u2r = count;
        }
      }

      return acc;
    }, {});

    res.status(200).json({
      success: true,
      counts: modelCounts
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


exports.getBinaryClassTypeCounts = async (req, res) => {
  try {
    const counts = await Log.aggregate([
      { $unwind: "$binaryClassResult" }, 
      {
        $group: {
          _id: {
            model: "$binaryClassResult.modelUsed", 
            result: "$binaryClassResult.result" 
          },
          count: { $sum: 1 } 
        }
      },
      {
        $project: {
          _id: 0, 
          model: "$_id.model", 
          result: "$_id.result", 
          count: 1 
        }
      }
    ]);

    // Organize counts by model
    const modelCounts = counts.reduce((acc, { model, result, count }) => {
      if (!acc[model]) {
        acc[model] = { attack: 0, normal: 0 };
      }
      acc[model][result] = count;
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      counts: modelCounts
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


exports.countAllLogs = async (req, res) => {
  try {
      const logCount = await Log.countDocuments();
      return res.status(200).json({
          success: true,
          count: logCount
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          success: false,
          message: 'Internal Server Error'
      });
  }
};

// Explanation:
// newLog: This method creates a new log entry using the data from the request body. It returns the created log or an error message if the creation fails.
// getLogByParam: This method retrieves a log entry by its ID and populates the networkTraffic field. It returns the log or an error message if not found.
// getAllLogs: This method retrieves all log entries and populates the networkTraffic field for each log.
// getMultiClassTypeCounts and getBinaryClassTypeCounts: These methods are placeholders for future implementations that will count the occurrences of different multi-class and binary types in the logs.
// You can expand the dashboard methods as needed to implement the specific counting logic.
