/*
 * @Author: wangzhisen
 * @Date: 2023-02-07 19:06:20
 * @Last Modified by: wangzhisen
 * @Last Modified time: 2023-02-08 12:46:49
 *
 * 文章列表
 */

import { List } from 'antd'
import type { ReadListProps } from './types'
import './index.less'

export const ReadList = ({ articles = [], onArticleClick }: ReadListProps): JSX.Element => {
  return (
    <List
      dataSource={articles}
      size="large"
      renderItem={(entity): JSX.Element => {
        const { description, title, id } = entity
        return (
          <List.Item
            key={id}
            className="read-list-item"
            onClick={(): void => onArticleClick(entity)}
          >
            <List.Item.Meta title={title} description={description}></List.Item.Meta>
          </List.Item>
        )
      }}
    />
  )
}
