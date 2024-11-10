import React, { useEffect, useState } from "react";

const LstmBin = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  if (isLoading) {
    return (
      <div id="loader">
        {/* You can add a loader or spinner here */}
        Loading...
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="login-box">
        <h1>LONG-SHORT TERM MEMORY BINARY-CLASS CLASSIFICATION TABLE</h1>
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
            <th scope="row">ATTACK</th>
            <td>0.97</td>
            <td>0.96</td>
            <td>0.96</td>
            <td>12198</td>
          </tr>
          <tr>
            <th scope="row">NORMAL</th>
            <td>0.94</td>
            <td>0.96</td>
            <td>0.95</td>
            <td>9217</td>
          </tr>
          <tr>
            <th scope="row">ACCURACY</th>
            <td></td>
            <td></td>
            <td>0.96</td>
            <td>21415</td>
          </tr>
          <tr>
            <th scope="row">MACRO AVERAGE</th>
            <td>0.95</td>
            <td>0.96</td>
            <td>0.96</td>
            <td>21415</td>
          </tr>
          <tr>
            <th scope="row">WEIGHTED AVERAGE</th>
            <td>0.96</td>
            <td>0.96</td>
            <td>0.96</td>
            <td>21415</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LstmBin;
