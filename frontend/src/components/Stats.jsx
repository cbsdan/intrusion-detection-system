import React, { useEffect, useState } from 'react';

const Stats = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer); 
  }, []);

var binaryClassData = [
    {
      label: 'NORMAL',
      algorithms: [
        { name: 'KNN', precision: 0.97, recall: 0.97, f1: 0.97, support: 9246 },
        { name: 'RANDOM FOREST', precision: 0.99, recall: 0.96, f1: 0.97, support: 9847 },
        { name: 'CNN', precision: 0.94, recall: 0.96, f1: 0.95, support: 9217 },
        { name: 'LSTM', precision: 0.94, recall: 0.96, f1: 0.95, support: 9217 },
      ],
    },
    {
      label: 'ATTACK',
      algorithms: [
        { name: 'KNN', precision: 0.98, recall: 0.98, f1: 0.98, support: 12169 },
        { name: 'RANDOM FOREST', precision: 0.97, recall: 0.99, f1: 0.98, support: 11928 },
        { name: 'CNN', precision: 0.97, recall: 0.96, f1: 0.96, support: 12198 },
        { name: 'LSTM', precision: 0.97, recall: 0.96, f1: 0.96, support: 12198 },
      ],
    },
    {
      label: 'ACCURACY',
      algorithms: [
        { name: 'KNN', precision: null, recall: null, f1: 0.98, support: 21415 },
        { name: 'RANDOM FOREST', precision: null, recall: null, f1: 0.97, support: 21415 },
        { name: 'CNN', precision: null, recall: null, f1: 0.96, support: 21415 },
        { name: 'LSTM', precision: null, recall: null, f1: 0.96, support: 21415 },
      ],
    },
    {
      label: 'MACRO AVERAGE',
      algorithms: [
        { name: 'KNN', precision: 0.98, recall: 0.98, f1: 0.98, support: 21415 },
        { name: 'RANDOM FOREST', precision: 0.98, recall: 0.97, f1: 0.97, support: 21415 },
        { name: 'CNN', precision: 0.96, recall: 0.96, f1: 0.96, support: 21415 },
        { name: 'LSTM', precision: 0.95, recall: 0.96, f1: 0.96, support: 21415 },
      ],
    },
    {
      label: 'WEIGHTED AVERAGE',
      algorithms: [
        { name: 'KNN', precision: 0.98, recall: 0.98, f1: 0.98, support: 21415 },
        { name: 'RANDOM FOREST', precision: 0.97, recall: 0.97, f1: 0.97, support: 21415 },
        { name: 'CNN', precision: 0.96, recall: 0.96, f1: 0.96, support: 21415 },
        { name: 'LSTM', precision: 0.96, recall: 0.96, f1: 0.96, support: 21415 },
      ],
    },
  ];
  
  var multiClassData = [
    {
      label: 'DOS',
      algorithms: [
        { name: 'KNN', precision: 0.99, recall: 0.99, f1: 0.99, support: 6834 },
        { name: 'RANDOM FOREST', precision: 1.00, recall: 1.00, f1: 1.00, support: 6822 },
        { name: 'CNN', precision: 0.99, recall: 0.97, f1: 0.98, support: 6822 },
        { name: 'LSTM', precision: 1.00, recall: 0.97, f1: 0.98, support: 6822 },
      ],
    },
    {
      label: 'NORMAL',
      algorithms: [
        { name: 'KNN', precision: 0.97, recall: 0.97, f1: 0.97, support: 9270 },
        { name: 'RANDOM FOREST', precision: 0.99, recall: 0.95, f1: 0.97, support: 9513 },
        { name: 'CNN', precision: 0.92, recall: 0.98, f1: 0.95, support: 9217 },
        { name: 'LSTM', precision: 0.94, recall: 0.97, f1: 0.96, support: 9217 },
      ],
    },
    {
      label: 'PROBE',
      algorithms: [
        { name: 'KNN', precision: 0.98, recall: 0.98, f1: 0.98, support: 2307 },
        { name: 'RANDOM FOREST', precision: 1.00, recall: 1.00, f1: 1.00, support: 2308 },
        { name: 'CNN', precision: 0.94, recall: 0.97, f1: 0.96, support: 2298 },
        { name: 'LSTM', precision: 0.96, recall: 0.98, f1: 0.97, support: 2298 },
      ],
    },
    {
      label: 'U2R',
      algorithms: [
        { name: 'KNN', precision: 0.84, recall: 0.87, f1: 0.86, support: 919 },
        { name: 'RANDOM FOREST', precision: 0.83, recall: 1.00, f1: 0.90, support: 1765 },
        { name: 'CNN', precision: 0.97, recall: 0.89, f1: 0.93, support: 2125 },
        { name: 'LSTM', precision: 0.97, recall: 0.90, f1: 0.94, support: 2125 },
      ],
    },
    {
      label: 'R2L',
      algorithms: [
        { name: 'KNN', precision: 0.96, recall: 0.98, f1: 0.97, support: 2085 },
        { name: 'RANDOM FOREST', precision: 0.94, recall: 0.89, f1: 0.92, support: 1007 },
        { name: 'CNN', precision: 0.91, recall: 0.66, f1: 0.76, support: 953 },
        { name: 'LSTM', precision: 0.85, recall: 0.84, f1: 0.85, support: 953 },
      ],
    },
    {
      label: 'ACCURACY',
      algorithms: [
        { name: 'KNN', precision: null, recall: null, f1: 0.97, support: 21415 },
        { name: 'RANDOM FOREST', precision: null, recall: null, f1: 0.97, support: 21415 },
        { name: 'CNN', precision: null, recall: null, f1: 0.95, support: 21415 },
        { name: 'LSTM', precision: null, recall: null, f1: 0.96, support: 21415 },
      ],
    },
    {
      label: 'MACRO AVERAGE',
      algorithms: [
        { name: 'KNN', precision: 0.95, recall: 0.96, f1: 0.97, support: 21415 },
        { name: 'RANDOM FOREST', precision: 0.95, recall: 0.97, f1: 0.96, support: 21415 },
        { name: 'CNN', precision: 0.95, recall: 0.89, f1: 0.92, support: 21415 },
        { name: 'LSTM', precision: 0.94, recall: 0.93, f1: 0.94, support: 21415 },
      ],
    },
    {
      label: 'WEIGHTED AVERAGE',
      algorithms: [
        { name: 'KNN', precision: 0.96, recall: 0.96, f1: 0.96, support: 21415 },
        { name: 'RANDOM FOREST', precision: 0.96, recall: 0.96, f1: 0.96, support: 21415 },
        { name: 'CNN', precision: 0.94, recall: 0.94, f1: 0.94, support: 21415 },
        { name: 'LSTM', precision: 0.94, recall: 0.94, f1: 0.94, support: 21415 },
      ],
    },
  ];
  

  return (
    <div>
      {loading ? (
        <div id="loader" />
      ) : (
        <div id="myDiv" className="animate-bottom">
          <div className="row">
            <div className="container-fluid">
              <div className="login-box">
                <h1>BINARY-CLASS CLASSIFICATION TABLE</h1>
              </div>
              <table className="table table-striped" style={{ color: '#fff' }}>
                <thead>
                  <tr>
                    <th scope="col"> </th>
                    <th scope="col">ALGORITHMS</th>
                    <th scope="col">PRECISION</th>
                    <th scope="col">RECALL</th>
                    <th scope="col">F-1 SCORE</th>
                    <th scope="col">SUPPORT</th>
                  </tr>
                </thead>
                <tbody>
                  {binaryClassData.map((category, idx) => (
                    <React.Fragment key={idx}>
                      <tr>
                        <th rowSpan={category.algorithms.length + 1} className='bg-secondary'>
                          {category.label}
                        </th>
                      </tr>
                      {category.algorithms.map((algorithm, idx2) => (
                        <tr key={idx2}>
                          <td>{algorithm.name}</td>
                          <td>{algorithm.precision}</td>
                          <td>{algorithm.recall}</td>
                          <td>{algorithm.f1}</td>
                          <td>{algorithm.support}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>

              <br />
              <br />
              <div className="login-box">
                <h1>MULTI-CLASS CLASSIFICATION TABLE</h1>
              </div>
              <table className="table table-striped" style={{ color: '#fff' }}>
                <thead>
                  <tr>
                    <th scope="col"> </th>
                    <th scope="col">ALGORITHMS</th>
                    <th scope="col">PRECISION</th>
                    <th scope="col">RECALL</th>
                    <th scope="col">F-1 SCORE</th>
                    <th scope="col">SUPPORT</th>
                  </tr>
                </thead>
                <tbody>
                  {multiClassData.map((category, idx) => (
                    <React.Fragment key={idx}>
                      <tr>
                        <th rowSpan={category.algorithms.length + 1} className='bg-secondary'>
                          {category.label}
                        </th>
                      </tr>
                      {category.algorithms.map((algorithm, idx2) => (
                        <tr key={idx2}>
                          <td>{algorithm.name}</td>
                          <td>{algorithm.precision}</td>
                          <td>{algorithm.recall}</td>
                          <td>{algorithm.f1}</td>
                          <td>{algorithm.support}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;
