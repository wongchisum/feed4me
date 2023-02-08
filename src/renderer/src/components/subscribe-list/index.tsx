import { List } from 'antd'
import type { SubscribeListProps } from './types'
import type { CachedSubscribe } from '../subscribes/types'
import './index.less'

export function SubscribeList<T extends CachedSubscribe>({
  data = [],
  subscribeItem,
  onListItemClick
}: SubscribeListProps<T>): JSX.Element {
  const handleListItemClick = (item: T): void => {
    onListItemClick(item)
  }
  return (
    <>
      <div className="subscribe-list-wrap-header">你的订阅</div>
      <List
        dataSource={data}
        size="large"
        className="subscribe-list-wrap"
        renderItem={(item): JSX.Element => {
          const { title, url } = item
          const isActive = subscribeItem?.url === url
          return (
            <div
              key={url}
              onClick={(): void => handleListItemClick(item)}
              className={`${'subscribe-list-item'} ${isActive && 'subscribe-list-item-active'}`}
            >
              {title}
            </div>
          )
        }}
      />
    </>
  )
}
