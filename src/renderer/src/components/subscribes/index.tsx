/*
 * @Author: wangzhisen
 * @Date: 2023-02-08 11:32:31
 * @Last Modified by: wangzhisen
 * @Last Modified time: 2023-02-08 13:39:21
 *
 * 展示添加RSS信息的输入框
 * 展示已订阅的RSS信息
 */

import { Button, Input, Modal } from 'antd'
import { useState } from 'react'
import { extract } from '@extractus/feed-extractor'
import type { ChangeEventHandler } from 'react'
import type { Subscribe, SubscribesProps } from './types'
import { SubscribeList } from '../subscribe-list'
import './index.less'

export const Subscribes = ({
  subscribeItem,
  subscribes,
  onSubscribeSelect,
  onSubscribesUpdate
}: SubscribesProps): JSX.Element => {
  const [link, setLink] = useState('')
  const [loading, setLoading] = useState(false)

  // 点击添加订阅
  const handleAddSubscribe = async (): Promise<void> => {
    if (!link) {
      Modal.error({ title: '添加失败', content: '请输入订阅源!' })
      return
    }
    if (subscribes.some((subscribe) => subscribe.url === link)) {
      Modal.error({ title: '添加失败', content: '该订阅源已添加!' })
      return
    }
    try {
      setLoading(true)
      // 读取订阅下的所有文章信息
      const {
        entries,
        title,
        link: url
      } = await extract(
        link,
        {},
        {
          mode: 'no-cors',
          headers: { 'Access-Control-Allow-Origin': '*' },
          proxy: { target: 'http://localhost:9000/proxy/getxml?url=' }
        }
      )
      if (Array.isArray(entries) && entries.length) {
        const nextSubscribes = [
          ...subscribes,
          { url: url as string, title: title as string, entries }
        ]

        onSubscribesUpdate(nextSubscribes)
        Modal.success({
          title: '添加成功!',
          content: '订阅源添加成功!'
        })
        setLink('')
      }
    } catch {
      Modal.error({ title: '添加失败', content: '添加出错，请重试!' })
    } finally {
      setLoading(false)
    }
  }

  // 输入框变动事件
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
    const { value } = event.currentTarget
    setLink(value)
  }

  // 点击订阅，查看订阅相应的文章
  const handleSubscribeClick = (item: Subscribe): void => {
    onSubscribeSelect(item)
  }

  return (
    <div>
      <div className="subscribes-search">
        <Input value={link} onChange={handleInputChange} allowClear placeholder="请输入订阅源URL" />
        <Button type="primary" loading={loading} disabled={loading} onClick={handleAddSubscribe}>
          添加订阅
        </Button>
      </div>
      <SubscribeList<Subscribe>
        data={subscribes}
        subscribeItem={subscribeItem}
        onListItemClick={handleSubscribeClick}
      />
    </div>
  )
}
