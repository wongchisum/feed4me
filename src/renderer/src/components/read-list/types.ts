import type { FeedEntry } from '@extractus/feed-extractor'

export interface ReadListProps {
  articles: FeedEntry[]
  onArticleClick: (article: FeedEntry) => void
}
