import React from "react";
import "./App.scss";
function App() {
  return (
    <div className="wrapper">
      <div className="search">
        <div className="search-icon">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-baidu"></use>
          </svg>
        </div>
        <input className="search-input" />
        <div className="search-button">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;
