import { PRODUCTS, formatPrice } from '../data/products'
import type { ProductId } from '../types'
import { MerchPreview } from './MerchPreview'

interface CatalogProps {
  selectedId: ProductId
  onSelect: (id: ProductId) => void
}

export function Catalog({ selectedId, onSelect }: CatalogProps) {
  return (
    <section className="catalog" id="catalog">
      <div className="section-head">
        <h2 className="section-title">Каталог</h2>
        <p className="section-lead">Выбери вещь — ник и номер добавим при заказе.</p>
      </div>

      <ul className="catalog__grid">
        {PRODUCTS.map((product) => {
          const color = product.colors[0]
          const active = product.id === selectedId

          return (
            <li key={product.id}>
              <button
                type="button"
                className={`catalog-card ${active ? 'is-active' : ''}`}
                onClick={() => onSelect(product.id)}
                aria-pressed={active}
              >
                <MerchPreview
                  productId={product.id}
                  color={color}
                  nickname="PLAYER"
                  withNumber={product.supportsNumber}
                  number="7"
                  className="catalog-card__preview"
                />
                <div className="catalog-card__meta">
                  <span className="catalog-card__name">{product.name}</span>
                  <span className="catalog-card__price">{formatPrice(product.price)}</span>
                </div>
                <p className="catalog-card__desc">{product.description}</p>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
