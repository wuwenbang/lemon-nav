import React, { useState, useEffect } from 'react'
import './App.scss'
import useBookmark from '../hooks/useBookmark'
import defaultImage from '../assets/default.jpg'
import image1 from '../assets/image1.jpg'
function App() {
  const [settingFlag, setSettingFlag] = useState(false)
  const { bookmarks, createBookmark, deleteBookmark } = useBookmark()
  useEffect(() => {
    let image = window.localStorage.getItem('image') || 'https://blog.mrabit.com/bing/today'
    document.querySelector('.bg').src = image
  }, [])
  useEffect(() => {
    document.querySelector('body').addEventListener('click', (e) => {
      if (e.target.tagName !== 'use' && e.target.tagName !== 'svg') {
        setSettingFlag(false)
      }
    })
  }, [])

  useEffect(() => {
    const window = document.querySelector('.setting-window')
    if (settingFlag) {
      window.classList.remove('disappear')
    } else {
      window.classList.add('disappear')
    }
  }, [settingFlag])
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
  const onSettingToggle = () => {
    setSettingFlag((flag) => !flag)
  }

  const onImportFile = () => {
    let selectedFile = document.querySelector('.import-file').files[0]
    let reader = new FileReader()
    reader.readAsDataURL(selectedFile)
    reader.onload = function () {
      document.querySelector('.import-image').src = this.result
      document.querySelector('.bg').src = this.result
      window.localStorage.setItem('image', this.result)
    }
  }
  const onClickImportFile = () => {
    document.querySelector('.import-file').click()
  }
  const onSettingBgClose = () => {
    document.querySelector('.setting-background').classList.add('disappear')
  }
  const onSettingBgOpen = () => {
    document.querySelector('.setting-background').classList.remove('disappear')
  }
  return (
    <div className="wrapper">
      {/* <video autoPlay loop muted>
        <source src="?" type="video/mp4" />
      </video> */}
      <img src="https://blog.mrabit.com/bing/today" className="bg" alt="" />
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
                <use xlinkHref="#icon-delete"></use>
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
      <div className="setting-btn" onClick={onSettingToggle}>
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-setting"></use>
        </svg>
      </div>
      <div className="setting-window">
        <div className="setting-window-item" onClick={onSettingBgOpen}>
          壁纸设置
        </div>
        <div className="setting-window-item">关于</div>
      </div>
      <div className="setting-background disappear">
        <main className="setting-background-content">
          <header className="content-title">壁纸图片设置</header>
          <div className="setting-background-item">
            <div className="item-title">自定义壁纸</div>
            <div className="import-wrapper">
              <img className="import-image" src={defaultImage} alt="导入图片" />
              <div className="import-text">
                <div className="import-describe">导入你喜欢的图片设为壁纸</div>
                <div className="import-describe-sub">建议尺寸：分辨率 1920x1080 或以上</div>
                <input type="file" className="import-file" onChange={onImportFile} />
                <button className="import-file-button" onClick={onClickImportFile}>
                  浏览文件
                </button>
              </div>
            </div>
          </div>
          <div className="setting-background-item">
            <div className="item-title">默认壁纸</div>
            <div className="image-wrapper">
              <img className="image-item" src={defaultImage} alt="默认壁纸" />
              <img className="image-item" src={defaultImage} alt="默认壁纸" />
              <img className="image-item" src={defaultImage} alt="默认壁纸" />
            </div>
          </div>
        </main>
        <div className="setting-background-close" onClick={onSettingBgClose}>
          <svg className="icon " aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </div>
      </div>

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
