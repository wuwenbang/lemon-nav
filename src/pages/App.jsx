import React, { useState } from 'react'
import './App.scss'
import useBookmark from '../hooks/useBookmark'
function App() {
  const [settingFlag, setSettingFlag] = useState(false)
  const { bookmarks, createBookmark, deleteBookmark } = useBookmark()

  const onDeleteBookmark = (e) => {
    deleteBookmark(parseInt(e.currentTarget.id))
  }
  const onFocusStyle = () => {
    let search = document.querySelector('.search')
    search.style.boxShadow = '0 0 0 2px rgba(150, 150, 150, 0.75)'
  }
  const onBlurStyle = () => {
    let search = document.querySelector('.search')
    search.style.boxShadow = 'none'
  }
  const onDragStart = (e) => {
    // React 异步访问事件属性需加上 event.persist()
    // 这会从事件池中移除该合成函数并允许对该合成事件的引用被保留下来。
    e.persist()
    setTimeout(() => {
      e.target.style.display = 'none'
    }, 0)
  }
  // const onDragOver = (e) => {
  //   e.preventDefault()
  // }
  // const onDragEnter = (e) => {
  //   e.preventDefault()
  // }
  const onSettingOpen = () => {
    setSettingFlag(true)
  }
  const onSettingClose = () => {
    setSettingFlag(false)
  }
  return (
    <div className="wrapper">
      {/* <video autoPlay loop muted>
        <source src="?" type="video/mp4" />
      </video> */}
      <div className="bg"></div>
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
            <li
              className="bookmark-item"
              key={item.id}
              id={item.id}
              draggable="true"
              onDragStart={onDragStart}
              // onDragOver={onDragOver}
              // onDragEnter={onDragEnter}
            >
              <a className="bookmark-link" href={item.url} target="_blank" draggable="false">
                <img className="bookmark-icon" src={item.url + '/favicon.ico'} draggable="false"></img>
              </a>
              <svg className="icon bookmark-delete" aria-hidden="true" onClick={onDeleteBookmark} id={item.id}>
                <use xlinkHref="#icon-close"></use>
              </svg>
            </li>
          )
        })}
        <li className="bookmark-item" draggable="true">
          <a className="bookmark-link" onClick={createBookmark} draggable="false">
            <svg className="icon bookmark-icon bookmark-add" aria-hidden="true" draggable="false">
              <use xlinkHref="#icon-add"></use>
            </svg>
          </a>
        </li>
      </ul>
      <div className="setting-btn" onClick={onSettingOpen}>
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-setting"></use>
        </svg>
      </div>
      {settingFlag ? (
        <div className="setting-window">
          <div className="setting-window-topbar">
            <div className="setting-window-close">
              <svg className="icon " aria-hidden="true" onClick={onSettingClose}>
                <use xlinkHref="#icon-close"></use>
              </svg>
            </div>
          </div>
          <div className="setting-window-sider"></div>
          <div className="setting-window-main"></div>
        </div>
      ) : (
        <div></div>
      )}

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
