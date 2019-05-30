import "modules/bootstrap/dist/css/bootstrap.min.css";
import "modules/font-awesome/css/font-awesome.min.css";
import React from "react";

import foto from "./images.jpg";

export default () => (
  <div className="jumbotron">
    <di className="container">
      <h1>Teste</h1>
      <img className="float-right" src={foto} />
    </di>
  </div>
);
