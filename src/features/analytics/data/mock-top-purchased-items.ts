export type PurchaseTrend = 'up' | 'down' | 'stable'

export type TopPurchasedItem = {
  id: string
  item: string
  timesPurchased: number
  totalSpent: number
  category: string
  trend: PurchaseTrend
}

export const TOP_PURCHASED_ITEMS: TopPurchasedItem[] = [
  {
    id: '1',
    item: 'Amul Taaza Milk 1L',
    timesPurchased: 18,
    totalSpent: 1080,
    category: 'Dairy',
    trend: 'up',
  },
  {
    id: '2',
    item: 'Brown Bread',
    timesPurchased: 14,
    totalSpent: 700,
    category: 'Snacks',
    trend: 'stable',
  },
  {
    id: '3',
    item: 'Bananas (1 dozen)',
    timesPurchased: 12,
    totalSpent: 480,
    category: 'Fruits',
    trend: 'up',
  },
  {
    id: '4',
    item: 'Chicken Breast 500g',
    timesPurchased: 10,
    totalSpent: 2200,
    category: 'Meat',
    trend: 'down',
  },
  {
    id: '5',
    item: 'Onions (1 kg)',
    timesPurchased: 9,
    totalSpent: 270,
    category: 'Vegetables',
    trend: 'stable',
  },
  {
    id: '6',
    item: 'Tata Tea Gold 500g',
    timesPurchased: 8,
    totalSpent: 960,
    category: 'Beverages',
    trend: 'up',
  },
  {
    id: '7',
    item: 'Surf Excel 1kg',
    timesPurchased: 6,
    totalSpent: 720,
    category: 'Household',
    trend: 'stable',
  },
  {
    id: '8',
    item: 'Tomatoes (1 kg)',
    timesPurchased: 11,
    totalSpent: 440,
    category: 'Vegetables',
    trend: 'up',
  },
]
