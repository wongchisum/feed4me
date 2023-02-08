import type { LayoutProps } from './types'
import './index.less'

export const Layout = ({ left, right }: LayoutProps): JSX.Element => {
  return (
    <div className="layout">
      <div className="layout-left">{left}</div>
      <div className="layout-right">{right}</div>
    </div>
  )
}
