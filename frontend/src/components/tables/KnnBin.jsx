import React, { useEffect, useState } from "react";

const KnnBin = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div id="loader"></div>
    );
  }

  return (
    <div>
      <div className="container-fluid">
        <div className="login-box">
          <h1>K-NEAREST NEIGHBOUR BINARY-CLASS CLASSIFICATION TABLE</h1>
        </div>
        <table className="table table-striped" style={{ color: "#fff" }}>
          <thead>
            <tr>
              <th scope="col"> </th>
              <th scope="col">PRECISION</th>
              <th scope="col">RECALL</th>
              <th scope="col">F-1 SCORE</th>
              <th scope="col">SUPPORT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">NORMAL</th>
              <td>0.97</td>
              <td>0.97</td>
              <td>0.97</td>
              <td>9246</td>
            </tr>
            <tr>
              <th scope="row">ATTACK</th>
              <td>0.98</td>
              <td>0.98</td>
              <td>0.98</td>
              <td>12169</td>
            </tr>
            <tr>
              <th scope="row">ACCURACY</th>
              <td></td>
              <td></td>
              <td>0.98</td>
              <td>21415</td>
            </tr>
            <tr>
              <th scope="row">MACRO AVERAGE</th>
              <td>0.98</td>
              <td>0.98</td>
              <td>0.98</td>
              <td>21415</td>
            </tr>
            <tr>
              <th scope="row">WEIGHTED AVERAGE</th>
              <td>0.98</td>
              <td>0.98</td>
              <td>0.98</td>
              <td>21415</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KnnBin;
