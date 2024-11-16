import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadHead from "../layout/LoadHead";
import LoadFoot from "../layout/LoadFoot";
import { getToken, getUser } from "../../utils/helper";
import Loader from "../layout/Loader";

const Parameters = () => {
  const [networkTraffic, setNetworkTraffic] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    user: getUser()._id,
    protocol_type: "",
    service: "",
    flag: "",
    logged_in: "",
    count: "",
    srv_serror_rate: "",
    srv_rerror_rate: "",
    same_srv_rate: "",
    diff_srv_rate: "",
    dst_host_count: "",
    dst_host_srv_count: "",
    dst_host_same_srv_rate: "",
    dst_host_diff_srv_rate: "",
    dst_host_same_src_port_rate: "",
    dst_host_serror_rate: "",
    dst_host_rerror_rate: "",
  });

  // Handle input change and update form fields
  const handleNetworkTrafficChange = (value) => {
    const cleanedValue = value.replace(/\s+/g, " ").trim();
    // Invoke the debounced function here
    setNetworkTraffic(value);

    const values = cleanedValue.split(" ");

    const formFields = [
      "protocol_type",
      "service",
      "flag",
      "logged_in",
      "count",
      "srv_serror_rate",
      "srv_rerror_rate",
      "same_srv_rate",
      "diff_srv_rate",
      "dst_host_count",
      "dst_host_srv_count",
      "dst_host_same_srv_rate",
      "dst_host_diff_srv_rate",
      "dst_host_same_src_port_rate",
      "dst_host_serror_rate",
      "dst_host_rerror_rate",
    ];

    values.forEach((value, index) => {
      if (formFields[index]) {
        setFormData((prevState) => ({
          ...prevState,
          [formFields[index]]: value,
        }));
      }
    });
  };

  // Debounce function
  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  function extractData(data, networkTrafficData) {
    const extractBinCls = (str) =>
      str
        .slice(str.indexOf(":") + 1)
        .toLowerCase()
        .trim();
    const extractMulCls = (str) =>
      str
        .slice(str.indexOf(":") + 1)
        .toLowerCase()
        .trim();

    const binaryClassResult = [];
    const multiClassResult = [];

    // Extract binary and multi-class results
    Object.keys(data).forEach((model) => {
      const binCls = extractBinCls(data[model].bin_cls);
      const mulCls = extractMulCls(data[model].mul_cls);

      binaryClassResult.push({
        modelUsed: model,
        result: binCls,
      });

      multiClassResult.push({
        modelUsed: model,
        result: mulCls,
      });
    });

    return {
      binaryClassResult,
      multiClassResult,
      networkTraffic: networkTrafficData._id,
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      };

      const url = `${import.meta.env.VITE_API}/parameters`;
      const newNetworkTrafficUrl = `${
        import.meta.env.VITE_API
      }/network-traffic`;
      const logsUrl = `${import.meta.env.VITE_API}/log`;

      const { data: response } = await axios.post(url, formData, config);
      console.log(response);

      const { data: networkTrafficResponse } = await axios.post(
        newNetworkTrafficUrl,
        formData,
        config
      );
      console.log(networkTrafficResponse);

      const result = extractData(response, networkTrafficResponse);
      console.log(result);
      const { data: logsResponse } = await axios.post(logsUrl, result, config);
      console.log(logsResponse);

      setLoading(false);
      navigate("/predict/param-secrets", { state: { data: response } });
    } catch (error) {
      setError(error);
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("myDiv").style.display = "block";
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <LoadHead />
      <div id="loader"></div>
      {loading ? (
        <Loader message="Machine Learning is analyzing the parameters"/>
      ) : (
        <div
          className={` animate-bottom d-flex flex-column align-items-center justify-content-center`}
          id="myDiv"
        >
          <div
            className="row w-75 card-color p-3"
            style={{ borderRadius: "10px" }}
          >
            <div className="login-box w-100">
              <h1>Network Traffic Parameters</h1>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="type here the network traffic separated by spaces"
                  className="networkTrafficField p-2 w-100 mb-3"
                  value={networkTraffic}
                  onChange={(e) => {
                    handleNetworkTrafficChange(e.target.value);
                  }}
                />
                <br />
                <div className="textbox">
                  <select
                    name="protocol_type"
                    value={formData.protocol_type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        protocol_type: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      Protocol Type
                    </option>
                    <option value="tcp">TCP</option>
                    <option value="udp">UDP</option>
                    <option value="icmp">ICMP</option>
                  </select>
                </div>

                <div className="textbox">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Service
                    </option>
                    <option value="IRC">IRC</option>
                    <option value="X11">X11</option>
                    <option value="Z39_50">Z39_50</option>
                    <option value="http_8001">http_8001</option>
                    <option value="auth">auth</option>
                    <option value="bgp">bgp</option>
                    <option value="courier">courier</option>
                    <option value="csnet_ns">csnet_ns</option>
                    <option value="ctf">ctf</option>
                    <option value="daytime">daytime</option>
                    <option value="discard">discard</option>
                    <option value="domain">domain</option>
                    <option value="domain_u">domain_u</option>
                    <option value="echo">echo</option>
                    <option value="eco_i">eco_i</option>
                    <option value="ecr_i">ecr_i</option>
                    <option value="efs">efs</option>
                    <option value="exec">exec</option>
                    <option value="finger">finger</option>
                    <option value="ftp">ftp</option>
                    <option value="ftp_data">ftp_data</option>
                    <option value="gopher">gopher</option>
                    <option value="harvest">harvest</option>
                    <option value="hostnames">hostnames</option>
                    <option value="http">http</option>
                    <option value="http_2784">http_2784</option>
                    <option value="http_443">http_443</option>
                    <option value="aol">aol</option>
                    <option value="imap4">imap4</option>
                    <option value="iso_tsap">iso_tsap</option>
                    <option value="klogin">klogin</option>
                    <option value="kshell">kshell</option>
                    <option value="ldap">ldap</option>
                    <option value="link">link</option>
                    <option value="login">login</option>
                    <option value="mtp">mtp</option>
                    <option value="name">name</option>
                    <option value="netbios_dgm">netbios_dgm</option>
                    <option value="netbios_ns">netbios_ns</option>
                    <option value="netbios_ssn">netbios_ssn</option>
                    <option value="netstat">netstat</option>
                    <option value="nnsp">nnsp</option>
                    <option value="nntp">nntp</option>
                    <option value="ntp_u">ntp_u</option>
                    <option value="other">other</option>
                    <option value="pm_dump">pm_dump</option>
                    <option value="pop_2">pop_2</option>
                    <option value="pop_3">pop_3</option>
                    <option value="printer">printer</option>
                    <option value="private">private</option>
                    <option value="red_i">red_i</option>
                    <option value="remote_job">remote_job</option>
                    <option value="rje">rje</option>
                    <option value="shell">shell</option>
                    <option value="smtp">smtp</option>
                    <option value="sql_net">sql_net</option>
                    <option value="ssh">ssh</option>
                    <option value="sunrpc">sunrpc</option>
                    <option value="supdup">supdup</option>
                    <option value="systat">systat</option>
                    <option value="telnet">telnet</option>
                    <option value="tftp_u">tftp_u</option>
                    <option value="tim_i">tim_i</option>
                    <option value="time">time</option>
                    <option value="urh_i">urh_i</option>
                    <option value="urp_i">urp_i</option>
                    <option value="uucp">uucp</option>
                    <option value="uucp_path">uucp_path</option>
                    <option value="vmnet">vmnet</option>
                    <option value="whois">whois</option>
                  </select>
                </div>

                <div className="textbox">
                  <select
                    name="flag"
                    value={formData.flag}
                    onChange={(e) =>
                      setFormData({ ...formData, flag: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Flag
                    </option>
                    <option value="OTH">OTH</option>
                    <option value="REJ">REJ</option>
                    <option value="RSTO">RSTO</option>
                    <option value="RSTOS0">RSTOS0</option>
                    <option value="RSTR">RSTR</option>
                    <option value="S0">S0</option>
                    <option value="S1">S1</option>
                    <option value="S2">S2</option>
                    <option value="S3">S3</option>
                    <option value="SF">SF</option>
                    <option value="SH">SH</option>
                  </select>
                </div>

                <div className="textbox">
                  <input
                    type="text"
                    placeholder="logged_in"
                    name="logged_in"
                    value={formData.logged_in}
                    onChange={(e) =>
                      setFormData({ ...formData, logged_in: e.target.value })
                    }
                  />
                </div>

                <div className="textbox">
                  <input
                    type="text"
                    placeholder="count"
                    name="count"
                    value={formData.count}
                    onChange={(e) =>
                      setFormData({ ...formData, count: e.target.value })
                    }
                  />
                </div>

                <div className="textbox">
                  <input
                    type="text"
                    placeholder="srv_serror_rate"
                    name="srv_serror_rate"
                    value={formData.srv_serror_rate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        srv_serror_rate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="textbox">
                  <input
                    type="text"
                    placeholder="srv_rerror_rate"
                    name="srv_rerror_rate"
                    value={formData.srv_rerror_rate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        srv_rerror_rate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="textbox">
                  <input
                    type="text"
                    placeholder="same_srv_rate"
                    name="same_srv_rate"
                    value={formData.same_srv_rate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        same_srv_rate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="textbox">
                  <input
                    type="text"
                    placeholder="diff_srv_rate"
                    name="diff_srv_rate"
                    value={formData.diff_srv_rate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        diff_srv_rate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="textbox">
                  <input
                    type="text"
                    placeholder="dst_host_count"
                    name="dst_host_count"
                    value={formData.dst_host_count}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dst_host_count: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="textbox">
                  <input
                    type="text"
                    placeholder="dst_host_srv_count"
                    name="dst_host_srv_count"
                    value={formData.dst_host_srv_count}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dst_host_srv_count: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="textbox">
                  <input
                    type="text"
                    placeholder="dst_host_same_srv_rate"
                    name="dst_host_same_srv_rate"
                    value={formData.dst_host_same_srv_rate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dst_host_same_srv_rate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="textbox">
                  <input
                    type="text"
                    placeholder="dst_host_diff_srv_rate"
                    name="dst_host_diff_srv_rate"
                    value={formData.dst_host_diff_srv_rate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dst_host_diff_srv_rate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="textbox">
                  <input
                    type="text"
                    placeholder="dst_host_same_src_port_rate"
                    name="dst_host_same_src_port_rate"
                    value={formData.dst_host_same_src_port_rate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dst_host_same_src_port_rate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="textbox">
                  <input
                    type="text"
                    placeholder="dst_host_serror_rate"
                    name="dst_host_serror_rate"
                    value={formData.dst_host_serror_rate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dst_host_serror_rate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="textbox">
                  <input
                    type="text"
                    placeholder="dst_host_rerror_rate"
                    name="dst_host_rerror_rate"
                    value={formData.dst_host_rerror_rate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dst_host_rerror_rate: e.target.value,
                      })
                    }
                  />
                </div>

                <button type="submit" className="btn" disabled={loading}>
                  {loading ? "Loading" : "Predict"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <LoadFoot />
      {loading ? <LoadHead /> : <LoadFoot />}
    </div>
  );
};

export default Parameters;
