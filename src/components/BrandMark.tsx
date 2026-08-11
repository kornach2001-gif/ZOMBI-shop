interface BrandMarkProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'hero'
  withWordmark?: boolean
}

const SIZE_CLASS = {
  sm: 'brand-mark--sm',
  md: 'brand-mark--md',
  lg: 'brand-mark--lg',
  hero: 'brand-mark--hero',
} as const

export function BrandMark({
  className = '',
  size = 'md',
  withWordmark = false,
}: BrandMarkProps) {
  return (
    <span className={`brand-mark ${SIZE_CLASS[size]} ${className}`}>
      <img
        className="brand-mark__logo"
        src="/logo-skull.png"
        alt={withWordmark ? '' : 'ZOMBI shop'}
        width={512}
        height={512}
        decoding="async"
      />
      {withWordmark && <span className="brand-mark__word">ZOMBI shop</span>}
    </span>
  )
}
