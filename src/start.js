import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

let elem = <Welcome />;

// if (location.pathname != "/welcome") {
//     elem = <img src="/logo.png" alt="logo" />;
// }

// puts the stuff on screen.
ReactDOM.render(elem, document.querySelector("main"));

// function HelloWorld() {
//     return <div>Hello, World!</div>;
// }

console.log("In start.js");
