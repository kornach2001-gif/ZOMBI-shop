export type ProductId = 'tee' | 'zip' | 'hoodie' | 'cap' | 'case'

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

export interface Product {
  id: ProductId
  name: string
  description: string
  price: number
  supportsNumber: boolean
  colors: ProductColor[]
}

export interface ProductColor {
  id: string
  name: string
  base: string
  accent: string
  text: string
}

export interface OrderDraft {
  productId: ProductId
  colorId: string
  size: Size
  withNickname: boolean
  nickname: string
  withNumber: boolean
  number: string
  contact: string
  comment: string
}

export interface Order extends OrderDraft {
  id: string
  productName: string
  colorName: string
  price: number
  createdAt: string
}
