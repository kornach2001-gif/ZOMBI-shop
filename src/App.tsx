import { useEffect, useState } from 'react'
import { asset } from './asset'
import { BrandMark } from './components/BrandMark'
import { Catalog } from './components/Catalog'
import { OrderPanel } from './components/OrderPanel'
import { formatPrice } from './data/products'
import type { Order, ProductId } from './types'
import './App.css'

export default function App() {
  const [selectedId, setSelectedId] = useState<ProductId>('tee')
  const [lastOrder, setLastOrder] = useState<Order | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="page">
      <div className="page__noise" aria-hidden="true" />

      <header className={`topbar ${scrolled ? 'is-scrolled' : ''}`}>
        <a
          className="topbar__brand"
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <BrandMark size="sm" withWordmark />
        </a>
        <nav className="topbar__nav" aria-label="Основная навигация">
          <button type="button" onClick={() => scrollTo('catalog')}>
            Каталог
          </button>
          <button type="button" onClick={() => scrollTo('order')}>
            Заказ
          </button>
        </nav>
        <button type="button" className="btn btn--small" onClick={() => scrollTo('order')}>
          Заказать
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero__stage">
            <img
              className="hero__photo"
              src={asset('hero.jpg')}
              alt="Команда ZOMBI на сцене"
              width={1600}
              height={827}
              decoding="async"
              fetchPriority="high"
            />
          </div>

          <div className="hero__banner">
            <img
              className="hero__banner-img"
              src={asset('hero-banner.png')}
              alt="ZOMBI"
              width={1024}
              height={576}
              decoding="async"
              fetchPriority="high"
            />
          </div>

          <div className="hero__copy">
            <h1 className="hero__title">Твой ник. Твой номер. Твой мерч.</h1>
            <p className="hero__lead">
              Выбери вещь, укажи никнейм и номер — или закажи без номера.
            </p>
            <div className="hero__actions">
              <button type="button" className="btn btn--primary" onClick={() => scrollTo('catalog')}>
                Смотреть мерч
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => scrollTo('order')}>
                Оформить заказ
              </button>
            </div>
          </div>
        </section>

        <Catalog
          selectedId={selectedId}
          onSelect={(id) => {
            setSelectedId(id)
            scrollTo('order')
          }}
        />

        <OrderPanel
          productId={selectedId}
          onProductChange={setSelectedId}
          onOrderPlaced={setLastOrder}
        />

        <section className="howto">
          <div className="section-head">
            <h2 className="section-title">Как это работает</h2>
            <p className="section-lead">Три шага от выбора до печати.</p>
          </div>
          <ol className="howto__list">
            <li>
              <strong>Выбери мерч</strong>
              <span>Футболка, кофта на зипке, худи, кепка или чехол.</span>
            </li>
            <li>
              <strong>Укажи ник и номер</strong>
              <span>Можно без ника, без номера — или оба сразу.</span>
            </li>
            <li>
              <strong>Оставь контакт</strong>
              <span>Мы свяжемся и подтвердим заказ.</span>
            </li>
          </ol>
        </section>
      </main>

      <footer className="footer">
        <BrandMark size="sm" withWordmark className="footer__brand" />
        <p>Мерч под заказ · ник + номер</p>
      </footer>

      {lastOrder && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="order-success-title">
          <div className="modal__backdrop" onClick={() => setLastOrder(null)} />
          <div className="modal__panel">
            <BrandMark size="md" className="modal__logo" />
            <p className="modal__eyebrow">Заказ принят</p>
            <h2 id="order-success-title" className="modal__title">
              {lastOrder.withNickname ? lastOrder.nickname : 'Без никнейма'}
              {lastOrder.withNumber ? ` · #${lastOrder.number}` : ' · без номера'}
            </h2>
            <p className="modal__text">
              {lastOrder.productName}, размер {lastOrder.size}. Сумма{' '}
              {formatPrice(lastOrder.price)}. Мы напишем на {lastOrder.contact}.
            </p>
            <button type="button" className="btn btn--primary" onClick={() => setLastOrder(null)}>
              Отлично
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
