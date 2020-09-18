import React, { useState } from 'react'
import './App.scss'
function App() {
  const [bookMarkList, setBookMarkList] = useState([1, 2, 3, 4, 5, 6])

  return (
    <div className="wrapper">
      <form className="search" id="myForm" action="http://www.baidu.com/s" target="_blank">
        <div className="search-icon">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-baidu"></use>
          </svg>
        </div>
        <input
          className="search-input"
          name="wd"
          placeholder="请输入搜索内容"
          autoComplete="on"
          autoFocus="autofocus"
          maxLength="255"
        />
        <div className="search-button">
          <input className="search-submit" type="submit"></input>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg>
        </div>
      </form>
      <ul className="bookmark-list">
        {bookMarkList.map((item) => {
          return <li>{item}</li>
        })}
      </ul>
      <div className="star-wrapper">
        <div className="star-surround">
          <svg className="icon" aria-hidden="true" className="star">
            <use xlinkHref="#icon-earth"></use>
          </svg>
          <svg className="icon" aria-hidden="true" className="cat">
            <use xlinkHref="#icon-cat"></use>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default App
