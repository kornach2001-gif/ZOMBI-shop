import type { CSSProperties } from 'react'
import type { Product, ProductColor, ProductId } from '../types'

interface MerchPreviewProps {
  productId: ProductId
  color: ProductColor
  nickname: string
  withNumber: boolean
  number: string
  className?: string
}

export function MerchPreview({
  productId,
  color,
  nickname,
  withNumber,
  number,
  className = '',
}: MerchPreviewProps) {
  const hasNick = nickname.trim().length > 0
  const nick = hasNick ? nickname.trim() : ''
  const num = withNumber ? number.trim() || '00' : ''
  const isCap = productId === 'cap'
  const isCase = productId === 'case'
  const isHooded = productId === 'hoodie' || productId === 'zip'
  const isTop = productId === 'tee' || isHooded

  return (
    <div
      className={`merch-preview merch-preview--${productId} ${className}`}
      style={
        {
          '--merch-base': color.base,
          '--merch-accent': color.accent,
          '--merch-text': color.text,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <div className="merch-preview__glow" />
      <div className="merch-preview__body">
        {isHooded && <div className="merch-preview__hood" />}
        {isTop && (
          <>
            <div className="merch-preview__sleeve merch-preview__sleeve--left" />
            <div className="merch-preview__sleeve merch-preview__sleeve--right" />
            <div className="merch-preview__collar" />
            {productId === 'zip' && <div className="merch-preview__zipper" />}
          </>
        )}
        {isCap && (
          <>
            <div className="merch-preview__cap-crown" />
            <div className="merch-preview__cap-brim" />
            <div className="merch-preview__cap-panel" />
          </>
        )}
        {isCase && (
          <>
            <div className="merch-preview__case-screen" />
            <div className="merch-preview__case-camera" />
          </>
        )}
        <div className="merch-preview__print">
          {isHooded ? (
            hasNick && <span className="merch-preview__nick merch-preview__nick--chest">{nick}</span>
          ) : isCap ? (
            <>
              {hasNick && <span className="merch-preview__nick merch-preview__nick--cap">{nick}</span>}
              {withNumber && <span className="merch-preview__num merch-preview__num--cap">{num}</span>}
            </>
          ) : isCase ? (
            <>
              {hasNick && <span className="merch-preview__nick merch-preview__nick--case">{nick}</span>}
              {withNumber && <span className="merch-preview__num merch-preview__num--case">{num}</span>}
            </>
          ) : (
            <>
              {withNumber && <span className="merch-preview__num">{num}</span>}
              {hasNick && <span className="merch-preview__nick">{nick}</span>}
            </>
          )}
        </div>
        <div className="merch-preview__brand">
          <img src="/logo-skull.png" alt="" width={48} height={48} />
        </div>
      </div>
    </div>
  )
}

export function productLabel(product: Product): string {
  return product.name
}
