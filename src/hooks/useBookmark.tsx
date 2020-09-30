import { useState, useEffect } from 'react'
import useUpdate from './useUpdate'
import createId from '../utils/createId'
interface Bookmark {
  id: number
  url: string
}
const useBookmark = () => {
  // const bookmarkData = JSON.parse(localStorage.getItem('bookmark'))

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  useEffect(() => {
    let locakBookmarks = JSON.parse(window.localStorage.getItem('bookmarks') || '[]')
    if (locakBookmarks.length === 0) {
      locakBookmarks = [
        { id: createId(), url: 'https://www.gitee.com' },
        { id: createId(), url: 'https://www.github.com' },
        { id: createId(), url: 'https://www.zhihu.com' },
        { id: createId(), url: 'https://www.bilibili.com' },
        { id: createId(), url: 'https://www.jianshu.com' },
        { id: createId(), url: 'https://www.douban.com' },
      ]
    }
    setBookmarks(locakBookmarks)
  }, [])
  // 依赖更新自动存储到 localStorage
  useUpdate(() => {
    window.localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }, bookmarks)
  const createBookmark = () => {
    let newUrl: string | null = window.prompt('请输入网址:')
    if (newUrl === null) {
      newUrl = ''
    }
    if (newUrl.indexOf('http') !== 0) {
      if (newUrl.indexOf('www.') === -1) {
        newUrl = 'https://www.' + newUrl
      } else {
        newUrl = 'https://' + newUrl
      }
    }
    const newBookmarkUrl = newUrl
    const newBookmark: Bookmark = {
      id: createId(),
      url: newBookmarkUrl,
    }
    setBookmarks([...bookmarks, newBookmark])
  }
  const deleteBookmark = (id: number) => {
    setBookmarks(bookmarks.filter((item) => item.id !== id))
  }
  return { bookmarks, setBookmarks, createBookmark, deleteBookmark }
}
export default useBookmark
