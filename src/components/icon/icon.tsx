import { FC, MouseEvent, useMemo } from 'react'
type Props = {
  name: string
  prefix?: string
  color?: string
  size?: number
  // 是否本地图标
  local?: boolean
  onClick?: (e: MouseEvent) => void
  className?: string
  disabled?: boolean
}
const Icon: FC<Props> = ({
  name = '',
  prefix = 'icon',
  color = 'currentColor',
  size = 16,
  local = true,
  onClick,
  className,
  disabled = false,
  ...props
}) => {
  // const symbolId = `#${prefix}-${name}`
  const symbolId = `#${local ? prefix + '-' : ''}${name}`

  const style = useMemo(() => {
    return {
      width: size + 'px',
      height: size + 'px',
      color: disabled ? 'var(--color-icon-disabled)' : color,
      verticalAlign: '-3px'
    }
  }, [size, disabled, color])
  return (
    <svg
      {...props}
      aria-hidden="true"
      style={style}
      className={className}
      onClick={e => {
        onClick?.(e)
      }}
    >
      <use href={symbolId} fill={color} />
    </svg>
  )
}

export default Icon
