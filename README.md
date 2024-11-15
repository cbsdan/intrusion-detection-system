# Machine Learning-based Intrusion Detection System (IDS) with MERN Stack

## Introduction
This project implements a **Machine Learning-based Intrusion Detection System (IDS)** using Python for model training and a **MERN stack** (MongoDB, Express.js, React, Node.js) for the user interface. The system utilizes four machine learning models to detect network intrusions: **K-Nearest Neighbors (KNN)**, **Random Forest (RF)**, **Convolutional Neural Network (CNN)**, and **Long Short-Term Memory (LSTM)**. The project applies the principles of **Intrusion Detection Systems** and **network traffic analysis** using advanced machine learning and deep learning techniques.


### Technologies Used:
- **Python**: Used for training models and handling the backend
- **Machine Learning Libraries**: TensorFlow, Scikit-Learn
- **MERN Stack**: For building the web interface (MongoDB, Express, React, Node.js)
- **Models**:
  - KNN
  - Random Forest (RF)
  - Convolutional Neural Network (CNN)
  - Long Short-Term Memory (LSTM)


### Developers:
- Cabasa, Daniel
- Esquivel, Cassley Ann Mina
- Ines, Juliana Mae
- Tan, Josh Ziemenn
- Obrerors, Jhun Mark

-----

## Instructions 

### Cloning from GitHub:
- To start, clone the repository from GitHub:
git clone https://github.com/cbsdan/intrusion-detection-system.git


### Backend Setup
- Open the `backend/requirements.txt` file, and make sure the following packages are included:

```
google-auth==2.11.0
google-auth-oauthlib==0.4.6
google-pasta==0.2.0
MouseInfo==0.1.3
numpy==1.21.4
pandas==1.4.4
pathy==0.6.2
react==4.3.0
requests==2.27.1
scikit-learn==1.1.2
scipy==1.9.1
seaborn==0.12.0
sklearn==0.0
spacy==3.4.1
tensorflow==2.10.0
```

### .env Variables
- Create a `.env` file in the backend directory and insert the following environment variables:
```
DB_LINK=[Your mongoDb DB]
JWT_SECRET=[Your JWT Secret]
JWT_EXPIRES_TIME=7d
```

- Create a `.env` file in the frontend directory and insert the following environment variables:
```
VITE_API=http://localhost:3000
```

### Python Interpreter Setup:
- Ensure you are using Python 3.10.0 to avoid compatibility issues.
- Download and install Python 3.10.0
- Select Python 3.10.0 in Your IDE (e.g., Visual Studio Code)


### Create Virtual Environment for Python
1. Create Virtual Environment for Python:
2. Open the backend directory in Visual Studio Code.
3. Press Ctrl + Shift + P to open the command palette.
4. Type Python: Select Interpreter.
5. Select Create Virtual Environment.
6. Choose Venv.
7. Select Python 3.10.0 as the interpreter.
8. Install the packages by selecting the requirements.txt.
9. Wait for the virtual environment to be created. This may take up to 15 minutes. 


### Installing Node Modules
#### In the backend directory
1. Open a new terminal and navigate to the backend directory.
2. Run 'npm i'
3. Wait until the installation finishes.

#### In the frontend directory
1. Open a new terminal and navigate to the frontend directory.
2. Run 'npm i'
3. Wait until the installation finishes.


### Running the Web Application:
1. In the backend directory
2. On terminal type 'npm start'
3. Open new terminal and move to frontend directory
4. type 'npm run dev'
5. Open the web application on browser provided in the frontend
6. Try out the application and explore the features!
