import React from 'react'
import './App.scss'
import useBookmark from '../hooks/useBookmark'
function App() {
  const { bookmarks, createBookmark, deleteBookmark } = useBookmark()
  const onDeleteBookmark = (e) => {
    deleteBookmark(parseInt(e.currentTarget.id))
  }
  const onFocusStyle = () => {
    let search = document.querySelector('.search')
    search.style.boxShadow = '0 0 0 2px rgba(24, 114, 255, 0.5)'
  }
  const onBlurStyle = () => {
    let search = document.querySelector('.search')
    search.style.boxShadow = 'none'
  }
  return (
    <div className="wrapper">
      {/* <video autoPlay loop muted>
        <source src="?" type="video/mp4" />
      </video> */}
      <form className="search" id="myForm" action="http://www.baidu.com/s" target="_blank">
        <div className="search-icon">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-baidu"></use>
          </svg>
        </div>
        <input
          onFocus={onFocusStyle}
          onBlur={onBlurStyle}
          className="search-input"
          name="wd"
          placeholder="请输入搜索内容"
          autoComplete="off"
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
        {bookmarks.map((item) => {
          return (
            <li className="bookmark-item" key={item.id} id={item.id}>
              <a className="bookmark-link" href={item.url} target="_blank">
                <img className="bookmark-icon" src={item.url + '/favicon.ico'}></img>
              </a>
              <svg className="icon bookmark-delete" aria-hidden="true" onClick={onDeleteBookmark} id={item.id}>
                <use xlinkHref="#icon-close"></use>
              </svg>
            </li>
          )
        })}
        <li className="bookmark-item">
          <a className="bookmark-link" onClick={createBookmark}>
            <svg className="icon bookmark-icon bookmark-add" aria-hidden="true">
              <use xlinkHref="#icon-add"></use>
            </svg>
          </a>
        </li>
      </ul>
      {/* <div className="star-wrapper">
        <div className="star-surround">
          <svg className="icon" aria-hidden="true" className="star">
            <use xlinkHref="#icon-earth"></use>
          </svg>
          <svg className="icon" aria-hidden="true" className="cat">
            <use xlinkHref="#icon-cat"></use>
          </svg>
        </div>
      </div> */}
    </div>
  )
}

export default App
