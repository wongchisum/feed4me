/*
 * @Author: wangzhisen
 * @Date: 2023-02-07 19:33:02
 * @Last Modified by: wangzhisen
 * @Last Modified time: 2023-02-08 12:59:58
 */
import { extract } from '@extractus/article-extractor'
import { useEffect, useState } from 'react'
import type { ArticleData, ParserOptions } from '@extractus/article-extractor'
import { Modal } from 'antd'
import type { ReadAreaProps } from './types'
import './index.less'

export const ReadArea = ({ articleItem }: ReadAreaProps): JSX.Element => {
  const [article, setArticle] = useState<null | ArticleData>(null)
  const [loading, setLoading] = useState(false)

  const handleFetchArticle = async (): Promise<void> => {
    if (!articleItem?.link) return
    try {
      setLoading(true)
      const result = await extract(articleItem?.link, {} as ParserOptions, {
        // mode: 'no-cors',
        // headers:[],
        // headers: { 'Access-Control-Allow-Origin': '*' },
        proxy: { target: 'http://localhost:9000/proxy/getxml?url=' }
      })
      setArticle(result)
    } catch {
      Modal.error({
        title: '获取失败'
      })
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    handleFetchArticle()
  }, [articleItem])

  if (loading) return <div>Loading...</div>
  if (!article) return <div>文章暂时无法阅读</div>

  const { content } = article
  return (
    <div className="read-area">
      <div dangerouslySetInnerHTML={{ __html: content as string }} className="read-area-wrap"></div>
    </div>
  )
}
