import React, { useState } from "react";
import "./List.scss";
import { Link } from "react-router-dom";

const List = () => {
  const [data, setData] = useState([]);
  fetch(`https://task-back-end.herokuapp.com/getDetail`)
    .then((res) => res.json())
    .then((res) => setData(res));
  return (
    <div className="container" id="container">
      <div className="form-container personal-in-container">
        {data.map((detail, ind) => (
          <div key={detail.certification} className="list-box">
            <table>
              <tr>
                <td>
                  <div className="main">
                    <span className="num">{ind + 1}</span>
                    {detail.certification}
                    <span className="span">{detail.issuer}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <a href={detail.image.data} target="_blank" rel="noreferrer">
                    {detail.image.fileName}
                  </a>
                </td>
              </tr>
            </table>
          </div>
        ))}
        <Link to="/">
          <button className="btn">Add Another one certification</button>
        </Link>
      </div>
    </div>
  );
};

export default List;
