import type { CachedSubscribe } from '../subscribes/types'

export type SubscribeListProps<T extends CachedSubscribe> = {
  data: T[]
  subscribeItem: CachedSubscribe | null
  onListItemClick: (item: T) => void
}
