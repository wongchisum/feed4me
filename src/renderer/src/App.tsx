import { Subscribes, Layout, ReadArea, ReadList } from './components'
import { useState } from 'react'
import { Drawer } from 'antd'
import type { FeedEntry } from '@extractus/feed-extractor'
import { ConfigProvider } from 'antd'
import './assets/reset.css'

interface Subscribe {
  url: string
  title: string
  entries: FeedEntry[] // 订阅源包含的文章信息
}

function App(): JSX.Element {
  const [subscribeItem, setSubscribeItem] = useState<Subscribe | null>(null) // 当前的订阅源信息
  const [subscribes, setSubscribes] = useState<Subscribe[]>([]) // 已添加的订阅源信息
  const [showReadArea, setShowArea] = useState(false) // 是否展示阅读区域
  const [articleItem, setArticleItem] = useState<null | FeedEntry>(null) // 当前阅读的文章信息

  // 选中订阅源，跳转
  const handleSubscribeSelect = (item: Subscribe): void => {
    setSubscribeItem(item)
  }

  // 切换弹窗开关
  const handleToggleReadArea = (): void => {
    setShowArea((prevState: boolean) => !prevState)
  }

  // 点击文章，打开弹窗进行阅读
  const handleArticleClick = (item: FeedEntry): void => {
    setArticleItem(item)
    handleToggleReadArea()
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6096B4'
        }
      }}
    >
      <div>
        <Layout
          left={
            <Subscribes
              subscribeItem={subscribeItem}
              subscribes={subscribes}
              onSubscribesUpdate={setSubscribes}
              onSubscribeSelect={handleSubscribeSelect}
            />
          }
          right={
            <ReadList articles={subscribeItem?.entries ?? []} onArticleClick={handleArticleClick} />
          }
        />
      </div>

      <Drawer
        open={showReadArea}
        destroyOnClose
        onClose={handleToggleReadArea}
        width={'100%'}
        title={articleItem?.title}
      >
        <ReadArea articleItem={articleItem} />
      </Drawer>
    </ConfigProvider>
  )
}

export default App
