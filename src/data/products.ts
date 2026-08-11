import type { Product } from '../types'

export const PRODUCTS: Product[] = [
  {
    id: 'tee',
    name: 'Футболка',
    description: 'Плотный хлопок, ник и номер на спине. Повседневный базовый крой.',
    price: 6500,
    supportsNumber: true,
    colors: [
      { id: 'ink', name: 'Чёрный', base: '#141414', accent: '#E8FF47', text: '#F5F5F0' },
      { id: 'bone', name: 'Молочный', base: '#EDE8DF', accent: '#0A0A0A', text: '#0A0A0A' },
      { id: 'navy', name: 'Индиго', base: '#1B2A4A', accent: '#7EB6FF', text: '#F5F5F0' },
    ],
  },
  {
    id: 'zip',
    name: 'Кофта на зипке',
    description: 'Тёплый флис на молнии. Для улицы и тренировок.',
    price: 9000,
    supportsNumber: true,
    colors: [
      { id: 'ink', name: 'Чёрный', base: '#141414', accent: '#E8FF47', text: '#F5F5F0' },
      { id: 'graphite', name: 'Графит', base: '#2C3038', accent: '#FF6B3D', text: '#F5F5F0' },
      { id: 'bone', name: 'Молочный', base: '#EDE8DF', accent: '#0A0A0A', text: '#0A0A0A' },
    ],
  },
  {
    id: 'hoodie',
    name: 'Худи',
    description: 'Тёплый флис с капюшоном. Для улицы и тренировок.',
    price: 9500,
    supportsNumber: true,
    colors: [
      { id: 'ink', name: 'Чёрный', base: '#141414', accent: '#E8FF47', text: '#F5F5F0' },
      { id: 'graphite', name: 'Графит', base: '#2C3038', accent: '#FF6B3D', text: '#F5F5F0' },
      { id: 'bone', name: 'Молочный', base: '#EDE8DF', accent: '#0A0A0A', text: '#0A0A0A' },
    ],
  },
  {
    id: 'cap',
    name: 'Кепка',
    description: 'Классический козырёк.',
    price: 3500,
    supportsNumber: true,
    colors: [
      { id: 'ink', name: 'Чёрный', base: '#141414', accent: '#E8FF47', text: '#F5F5F0' },
      { id: 'bone', name: 'Молочный', base: '#EDE8DF', accent: '#0A0A0A', text: '#0A0A0A' },
      { id: 'olive', name: 'Олива', base: '#3E4A32', accent: '#E8FF47', text: '#F5F5F0' },
    ],
  },
  {
    id: 'case',
    name: 'Чехол',
    description: 'Плотный чехол с печатью уникального принта.',
    price: 2699,
    supportsNumber: true,
    colors: [
      { id: 'ink', name: 'Чёрный', base: '#141414', accent: '#E8FF47', text: '#F5F5F0' },
      { id: 'bone', name: 'Молочный', base: '#EDE8DF', accent: '#0A0A0A', text: '#0A0A0A' },
      { id: 'clear', name: 'Прозрачный', base: '#d9dce3', accent: '#0A0A0A', text: '#0A0A0A' },
    ],
  },
]

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value)
}
