require('dotenv').config();
currentYear = new Date().getFullYear();
const {stringify } = require('flatted');
let { PythonShell } = require('python-shell')
const express = require("express");
var multer = require('multer');
const fs = require('fs');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

const auth = require('./routes/auth');
const networktraffic = require('./routes/networktraffic');
const logRoutes = require('./routes/logRoutes');

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(cookieParser());

const cors = require("cors");
const { newNetworkTraffic } = require('./controllers/networkTrafficController');

app.use(express.json({limit:'50mb'}))
app.use(cors())

mongoose.connect(process.env.DB_LINK, { useNewUrlParser: true }).then(() => {
  console.log("database connected Successfully!!");
}).catch((err) => {
  console.log("database not connected!!");
  console.log(err);
})


submitted_csv_file = "";
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './Uploaded_files');
  },
  filename: function (req, file, callback) {
    submitted_csv_file = file.originalname;
    console.log(submitted_csv_file);
    callback(null, file.originalname);
  }
});

var upload = multer({ storage: storage }).single('myfile');

app.get("/secrets", async function (req, res) {
  // Initialize the variables
  console.log('entering!')
  let knn_bin_cls = "", knn_mul_cls = "", knn_desc = "", knn_bin_acc = "0.9760368900303525", knn_mul_acc = "0.9740368900303525";
  let rf_bin_cls = "", rf_mul_cls = "", rf_desc = "", rf_bin_acc = "0.9741029652113005", rf_mul_acc = "0.9731029652113005";
  let cnn_bin_cls = "", cnn_mul_cls = "", cnn_desc = "", cnn_bin_acc = "0.9582535605883726", cnn_mul_acc = "0.9506420733130982";
  let lstm_bin_cls = "", lstm_mul_cls = "", lstm_desc = "", lstm_bin_acc = "0.9562456222274107", lstm_mul_acc = "0.9590940929255195";

  // Set up the options for running the Python script
  const options = {
    args: []
  };

  try {
    const response = await new Promise((resolve, reject) => {
      PythonShell.run('nids_random_updated.py', options, (err, response) => {
        if (err) {
          return reject(err);
        }
        resolve(response);
      });
    });

    knn_bin_cls = "KNN algorithm binary class:" + response[0].split(':')[1]?.trim(); 
    knn_mul_cls = "KNN Multi Class Type:" + response[1].split(':')[1]?.replace('[','').replace(']','').trim(); 
    knn_desc = "KNN Description:" + response[2].split(':')[1]?.trim(); 

    rf_bin_cls = "Random Forest Algorithm Binary class:" + response[3].split(':')[1]?.trim(); 
    rf_mul_cls = "RANDOM FOREST Multi Class Type:" + response[4].split(':')[1]?.trim();
    rf_desc = "RANDOM FOREST DESCRIPTION:" + response[5].split(':')[1]?.trim();

    cnn_bin_cls = "CNN Algorithm binary class:" + response[6].split(':')[1]?.trim(); 
    cnn_mul_cls = "CNN Algorithm Multi Class Type:" + response[7].split(':')[1]?.trim(); 
    cnn_desc = "CNN Description:" + response[8].split(':')[1]?.trim();

    lstm_bin_cls = "LSTM Algorithm binary class:" + response[9].split(':')[1]?.trim(); 
    lstm_mul_cls = "LSTM Algorithm Multi Class Type:" + response[10].split(':')[1]?.trim();
    lstm_desc = "LSTM Description: " + response[11].split(':')[1]?.trim();

    res.json({
      knn: {
        bin_cls: knn_bin_cls,
        mul_cls: knn_mul_cls,
        description: knn_desc,
        bin_acc: knn_bin_acc,
        mul_acc: knn_mul_acc
      },
      rf: {
        bin_cls: rf_bin_cls,
        mul_cls: rf_mul_cls,
        description: rf_desc,
        bin_acc: rf_bin_acc,
        mul_acc: rf_mul_acc
      },
      cnn: {
        bin_cls: cnn_bin_cls,
        mul_cls: cnn_mul_cls,
        description: cnn_desc,
        bin_acc: cnn_bin_acc,
        mul_acc: cnn_mul_acc
      },
      lstm: {
        bin_cls: lstm_bin_cls,
        mul_cls: lstm_mul_cls,
        description: lstm_desc,
        bin_acc: lstm_bin_acc,
        mul_acc: lstm_mul_acc
      }
    });
    console.log('entered!')
  } catch (error) {
    console.error("Error running the Python script:", error);
    res.status(500).json({ error: "Failed to process the data." });
  }
});

p_complete_answer = ""
// knn
p_knn_bin_cls = ""
p_knn_mul_cls = ""
p_knn_desc = ""
p_knn_bin_acc = "0.9760368900303525"
p_knn_mul_acc = "0.9740368900303525"
// random forest
p_rf_bin_cls = ""
p_rf_mul_cls = ""
p_rf_desc = ""
p_rf_bin_acc = "0.9741029652113005"
p_rf_mul_acc = "0.9731029652113005"
// cnn
p_cnn_bin_cls = ""
p_cnn_mul_cls = ""
p_cnn_desc = ""
p_cnn_bin_acc = "0.9582535605883726"
p_cnn_mul_acc = "0.9506420733130982"
//lstm
p_lstm_bin_cls = ""
p_lstm_mul_cls = ""
p_lstm_desc = ""
p_lstm_bin_acc = "0.9562456222274107"
p_lstm_mul_acc = "0.9590940929255195"

app.post("/parameters", async function (req, res) {
  const {
    user,
    protocol_type,
    service,
    flag,
    logged_in,
    count,
    srv_serror_rate,
    srv_rerror_rate,
    same_srv_rate,
    diff_srv_rate,
    dst_host_count,
    dst_host_srv_count,
    dst_host_same_srv_rate,
    dst_host_diff_srv_rate,
    dst_host_same_src_port_rate,
    dst_host_serror_rate,
    dst_host_rerror_rate
  } = req.body;

  let options = {
    args: [
      protocol_type, service, flag, logged_in, count,
      srv_serror_rate, srv_rerror_rate, same_srv_rate,
      diff_srv_rate, dst_host_count, dst_host_srv_count,
      dst_host_same_srv_rate, dst_host_diff_srv_rate,
      dst_host_same_src_port_rate, dst_host_serror_rate, dst_host_rerror_rate
    ]
  };

  console.log("entering!!");

  const runPythonScript = (options) => {
    return new Promise((resolve, reject) => {
      PythonShell.run('nids_parameter_updated.py', options, (err, response) => {
        if (err) {
          return reject(err);
        }
        resolve(response);
      });
    });
  };

  try {
    const response = await runPythonScript(options);
    console.log("entered!!");

    p_complete_answer = stringify(response);
    // KNN
    p_knn_bin_cls = stringify(response[0]).slice(2, -2);
    p_knn_mul_cls = stringify(response[1]).slice(2, -2);
    p_knn_desc = stringify(response[2]).slice(2, -2);

    // Random Forest
    p_rf_bin_cls = stringify(response[3]).slice(2, -2);
    p_rf_mul_cls = stringify(response[4]).slice(2, -2);
    p_rf_desc = stringify(response[5]).slice(2, -2);

    // CNN
    p_cnn_bin_cls = stringify(response[6]).slice(2, -2);
    p_cnn_mul_cls = stringify(response[7]).slice(2, -2);
    p_cnn_desc = stringify(response[8]).slice(2, -2);

    // LSTM
    p_lstm_bin_cls = stringify(response[9]).slice(2, -2);
    p_lstm_mul_cls = stringify(response[10]).slice(2, -2);
    p_lstm_desc = stringify(response[11]).slice(2, -2);

    const result = {
      knn: {
        bin_cls: p_knn_bin_cls,
        mul_cls: p_knn_mul_cls,
        description: p_knn_desc
      },
      rf: {
        bin_cls: p_rf_bin_cls,
        mul_cls: p_rf_mul_cls,
        description: p_rf_desc
      },
      cnn: {
        bin_cls: p_cnn_bin_cls,
        mul_cls: p_cnn_mul_cls,
        description: p_cnn_desc
      },
      lstm: {
        bin_cls: p_lstm_bin_cls,
        mul_cls: p_lstm_mul_cls,
        description: p_lstm_desc
      }
    };

    res.status(200).json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({message: "An error occurred while processing your request."});
  }
});

final_ans = ""
app.post('/uploadjavatpoint', async function (req, res) {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({message: "Internal Server Error"});
    }

    const submitted_model = req.body.selected_model;
    const submitted_csv_file = req.file.path; 

    console.log(submitted_model);
    console.log(submitted_csv_file);

    let options = {
      args: [submitted_model, submitted_csv_file]
    };

    try {
      const response = await runPythonScript('nids_csv_updated.py', options);
      temp_final_ans = JSON.stringify(response[0]);
      final_ans = temp_final_ans.slice(2, -2);
      console.log("completed");

      // Construct the path to the updated CSV file
      const updated_csv_file_path = submitted_csv_file;

      // Check if the updated CSV file exists
      if (fs.existsSync(updated_csv_file_path)) {
        // Send the updated CSV file as a download
        res.download(updated_csv_file_path, 'updated_file.csv', (err) => {
          if (err) {
            console.error("Error sending file:", err);
            res.status(500).json({message: "Error sending file."});
          } else {
            console.log("File sent successfully.");
          }
        });
      } else {
        res.status(404).json({message: "Updated CSV file not found."});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({message: "Error processing file."});
    }
  });
});

function runPythonScript(scriptPath, options) {
  return new Promise((resolve, reject) => {
    PythonShell.run(scriptPath, options, (err, response) => {
      if (err) {
        console.error('PythonShellError:', err);
        return reject(new Error("Python script error: " + err.message));
      }
      resolve(response);
    });
  });
}
l = "completed!!"



//Routes
app.use('/', auth);
app.use('/', networktraffic);
app.use('/', logRoutes);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("Server started on port 3000.");
});