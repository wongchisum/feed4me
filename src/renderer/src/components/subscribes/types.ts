import type { FeedEntry } from '@extractus/feed-extractor'

export interface CachedSubscribe {
  url: string
  title: string
}

export interface Subscribe {
  url: string
  title: string
  entries: FeedEntry[] // 订阅源包含的文章信息
}

export interface SubscribesProps {
  subscribes: Subscribe[]
  subscribeItem: Subscribe | null
  onSubscribeSelect: (item: Subscribe) => void
  onSubscribesUpdate: (subscribes: Subscribe[]) => void
}
