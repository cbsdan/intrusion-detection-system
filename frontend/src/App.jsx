import { Routes, Route, Navigate } from "react-router-dom";
import { isAdmin, isAuthenticated } from "./utils/helper";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Home";
import NotFound404 from "./components/NotFound404";
import About from "./components/About";
import Features from "./components/Features";
import Attacks from "./components/Attacks";
import Stats from "./components/Stats";
import Predict from "./components/Predict";
import Parameters from "./components/predictComponent/Parameters";
import ParamSecrets from "./components/predictComponent/ParamSecrets";
import KnnBin from "./components/tables/KnnBin";
import KnnMulti from "./components/tables/KnnMulti";
import RfBin from "./components/tables/RfBin";
import RfMulti from "./components/tables/RfMulti";
import CnnBin from "./components/tables/CnnBin";
import CnnMulti from "./components/tables/CnnMulti";
import LstmBin from "./components/tables/LstmBin";
import LstmMulti from "./components/tables/LstmMulti";

function App() {
  const UserRoute = () => {
    if (!isAuthenticated()) {
      return <Navigate to="/" />;
    }

    return (
      <Routes>
        <Route path="/stats" element={<Stats />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/predict/parameter" element={<Parameters />} />
        <Route path="/predict/param-secrets" element={<ParamSecrets />} />
        <Route path="/knn_bin_table" element={<KnnBin />} />
        <Route path="/knn_table" element={<KnnMulti />} />
        <Route path="/rf_bin_table" element={<RfBin />} />
        <Route path="/rf_table" element={<RfMulti />} />
        <Route path="/cnn_bin_table" element={<CnnBin />} />
        <Route path="/cnn_table" element={<CnnMulti />} />
        <Route path="/lstm_bin_table" element={<LstmBin />} />
        <Route path="/lstm_table" element={<LstmMulti />} />
      </Routes>
    );
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/attacks" element={<Attacks />} />

        <Route path="/*" element={<UserRoute />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
