import type { CSSProperties, ReactNode } from 'react'

/** Light grey used for the "back" folder tab that sits behind the front tab. */
export const TAB_BACK = '#e4e4df'

/** Curved folder-tab edge. `h` is the visible tab height; `total` lets the shape run on behind the folder body. */
export function TabShoulder({ color, h, total = h }: { color: string; h: number; total?: number }) {
  return (
    <svg aria-hidden viewBox={`0 0 44 ${total}`} className="-ml-px block w-11 shrink-0" style={{ height: total }}>
      <path fill={color} className="transition-[fill] duration-500" d={`M0 0H6C13 0 16 4 19 10L25 ${h - 10}C28 ${h - 3} 32 ${h} 40 ${h}H44V${total}H0Z`} />
    </svg>
  )
}

type Props = {
  tab: ReactNode
  /** Optional back tab (e.g. a status or client mark); lifts when a parent `.group` is hovered. */
  back?: ReactNode
  bg: string
  ink?: string
  className?: string
  bodyClassName?: string
  style?: CSSProperties
  children: ReactNode
}

/** Folder-shaped card matching the landing page project cards, sized for in-page content. */
export default function Folder({ tab, back, bg, ink = '#0d0d0d', className = '', bodyClassName = 'p-6 md:p-7', style, children }: Props) {
  return (
    <div className={`flex flex-col ${className}`} style={style}>
      <div className="relative flex items-end pt-2">
        <div className="relative z-20 -mb-px flex" style={{ color: ink }}>
          <span className="flex h-9 items-center gap-2 whitespace-nowrap rounded-tl-[14px] pl-4 pr-1 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-500" style={{ background: bg }}>{tab}</span>
          <TabShoulder color={bg} h={36} />
        </div>
        {back && (
          <div className="relative z-0 -mb-3 -ml-8 flex text-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1.5">
            <span className="flex h-11 items-start whitespace-nowrap rounded-tl-[12px] pl-10 pr-1 pt-2 text-[13px] font-medium tracking-[-0.01em]" style={{ background: TAB_BACK }}>{back}</span>
            <TabShoulder color={TAB_BACK} h={32} total={44} />
          </div>
        )}
      </div>
      <div className={`relative z-10 flex-1 rounded-[20px] rounded-tl-none transition-colors duration-500 ${bodyClassName}`} style={{ background: bg, color: ink }}>{children}</div>
    </div>
  )
}
