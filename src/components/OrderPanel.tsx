import { useId, useMemo, useState, type FormEvent } from 'react'
import { PRODUCTS, SIZES, formatPrice } from '../data/products'
import type { Order, ProductId, Size } from '../types'

const ORDER_PHOTOS = [
  { src: '/products/tee-1.png', alt: 'Футболка ZOMBI — вид спереди' },
  { src: '/products/tee-2.png', alt: 'Футболка ZOMBI — принт и детали' },
] as const

interface OrderPanelProps {
  productId: ProductId
  onProductChange: (id: ProductId) => void
  onOrderPlaced: (order: Order) => void
}

export function OrderPanel({ productId, onProductChange, onOrderPlaced }: OrderPanelProps) {
  const formId = useId()
  const product = useMemo(
    () => PRODUCTS.find((item) => item.id === productId) ?? PRODUCTS[0],
    [productId],
  )

  const [size, setSize] = useState<Size>('M')
  const [withNickname, setWithNickname] = useState(true)
  const [nickname, setNickname] = useState('')
  const [withNumber, setWithNumber] = useState(true)
  const [number, setNumber] = useState('')
  const [contact, setContact] = useState('')
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const [photoIndex, setPhotoIndex] = useState(0)

  const color = product.colors[0]
  const activePhoto = ORDER_PHOTOS[photoIndex] ?? ORDER_PHOTOS[0]

  function handleProductSwitch(id: ProductId) {
    onProductChange(id)
    const next = PRODUCTS.find((item) => item.id === id)
    if (next) {
      if (!next.supportsNumber) setWithNumber(false)
      else setWithNumber(true)
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')

    const nick = withNickname ? nickname.trim() : ''
    if (withNickname) {
      if (!nick) {
        setError('Укажи никнейм для печати.')
        return
      }
      if (nick.length > 12) {
        setError('Никнейм — максимум 12 символов.')
        return
      }
    }
    if (withNumber) {
      if (!/^\d{1,2}$/.test(number.trim())) {
        setError('Номер — от 0 до 99.')
        return
      }
    }
    if (!withNickname && !withNumber) {
      setError('Выбери никнейм или номер — или оба.')
      return
    }
    if (!contact.trim()) {
      setError('Оставь Telegram или телефон для связи.')
      return
    }

    const order: Order = {
      id: crypto.randomUUID(),
      productId: product.id,
      productName: product.name,
      colorId: color.id,
      colorName: color.name,
      size,
      withNickname,
      nickname: withNickname ? nick.toUpperCase() : '',
      withNumber,
      number: withNumber ? number.trim() : '',
      contact: contact.trim(),
      comment: comment.trim(),
      price: product.price,
      createdAt: new Date().toISOString(),
    }

    const existing = JSON.parse(localStorage.getItem('zombi-orders') ?? '[]') as Order[]
    localStorage.setItem('zombi-orders', JSON.stringify([order, ...existing]))
    onOrderPlaced(order)
  }

  return (
    <section className="order" id="order">
      <div className="section-head">
        <h2 className="section-title">Оформить заказ</h2>
        <p className="section-lead">Укажи ник и номер — или закажи без одного из них.</p>
      </div>

      <div className="order__layout">
        <div className="order__photos">
          <img
            className="order__photos-main"
            src={activePhoto.src}
            alt={activePhoto.alt}
            width={900}
            height={1100}
            decoding="async"
          />
          <div className="order__photos-thumbs" role="tablist" aria-label="Фото товара">
            {ORDER_PHOTOS.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                role="tab"
                aria-selected={index === photoIndex}
                className={`order__photos-thumb ${index === photoIndex ? 'is-active' : ''}`}
                onClick={() => setPhotoIndex(index)}
              >
                <img src={photo.src} alt="" width={160} height={200} decoding="async" />
              </button>
            ))}
          </div>
        </div>

        <form className="order-form" onSubmit={handleSubmit} noValidate>
          <fieldset className="order-form__field">
            <legend>Товар</legend>
            <div className="chip-row">
              {PRODUCTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`chip ${item.id === product.id ? 'is-active' : ''}`}
                  onClick={() => handleProductSwitch(item.id)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="order-form__field">
            <legend>Размер</legend>
            <div className="chip-row">
              {SIZES.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`chip chip--size ${item === size ? 'is-active' : ''}`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="order-form__grid">
            <div className="field">
              <span>Никнейм</span>
              <div className="number-toggle">
                <button
                  type="button"
                  className={`chip ${withNickname ? 'is-active' : ''}`}
                  onClick={() => setWithNickname(true)}
                >
                  С никнеймом
                </button>
                <button
                  type="button"
                  className={`chip ${!withNickname ? 'is-active' : ''}`}
                  onClick={() => setWithNickname(false)}
                >
                  Без никнейма
                </button>
              </div>
              {withNickname && (
                <input
                  id={`${formId}-nick`}
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Например, VOLK"
                  maxLength={12}
                  autoComplete="off"
                  aria-label="Никнейм"
                />
              )}
            </div>

            <div className="field">
              <span>Номер на форме</span>
              <div className="number-toggle">
                <button
                  type="button"
                  className={`chip ${withNumber ? 'is-active' : ''}`}
                  onClick={() => setWithNumber(true)}
                >
                  С номером
                </button>
                <button
                  type="button"
                  className={`chip ${!withNumber ? 'is-active' : ''}`}
                  onClick={() => setWithNumber(false)}
                >
                  Без номера
                </button>
              </div>
              {withNumber && (
                <input
                  id={`${formId}-number`}
                  value={number}
                  onChange={(e) => setNumber(e.target.value.replace(/\D/g, '').slice(0, 2))}
                  placeholder="07"
                  inputMode="numeric"
                  aria-label="Желаемый номер"
                />
              )}
            </div>
          </div>

          <label className="field" htmlFor={`${formId}-contact`}>
            <span>Telegram или телефон</span>
            <input
              id={`${formId}-contact`}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="@username или +7..."
              required
            />
          </label>

          <label className="field" htmlFor={`${formId}-comment`}>
            <span>Комментарий</span>
            <textarea
              id={`${formId}-comment`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Адрес СДЭКа или Почты, город (поселок), ФИО..."
              rows={3}
            />
          </label>

          {error && <p className="form-error" role="alert">{error}</p>}

          <div className="order-form__footer">
            <div className="order-form__total">
              <span>Итого</span>
              <strong>{formatPrice(product.price)}</strong>
            </div>
            <button type="submit" className="btn btn--primary">
              Отправить заказ
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
