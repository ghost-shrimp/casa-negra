interface MockArtist {
  _type: 'artist'
  name: string
  bio: Array<{
    _type: 'block'
    children: Array<{ _type: 'span'; text: string }>
    style: string
  }>
  image?: {
    _type: 'image'
    asset: {
      _ref: string
      url?: string
    }
    alt: string
  }
}

interface MockArtwork {
  _type: 'artwork'
  title: string
  year: string
  price: number
  technique: string
  materials: string[]
  images: Array<{
    _type: 'image'
    asset: { _ref: string }
  }>
  dimensions: string
  description: Array<{
    _type: 'block'
    children: Array<{ _type: 'span'; text: string }>
    style: string
  }>
  artist: { _type: 'reference'; _ref: string }
}

interface MockProduct {
  _type: 'product'
  title: string
  year: string
  creator: { _type: 'reference'; _ref: string }
  price: number
  images: Array<{
    _type: 'image'
    asset: { _ref: string }
  }>
  dimensions: string
  description: Array<{
    _type: 'block'
    children: Array<{ _type: 'span'; text: string }>
    style: string
  }>
}

interface MockEvent {
  _type: 'event'
  title: string
  startDate: string
  endDate?: string
  startTime: string
  duration: number
  image?: {
    _type: 'image'
    asset: {
      _ref: string
      url?: string
    }
    alt: string
  }
  description: Array<{
    _type: 'block'
    children: Array<{ _type: 'span'; text: string }>
    style: string
  }>
}

export type {
    MockArtist,
    MockArtwork,    
    MockProduct,
    MockEvent,
}