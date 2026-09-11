import type { InventoryItem } from '../types'

const API_URL = 'http://localhost:5000/api/inventory'

export async function getInventoryItems(): Promise<InventoryItem[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch inventory items')
  }

  return response.json()
}

export async function createInventoryItem(
  data: Omit<InventoryItem, 'id'>
): Promise<InventoryItem> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create inventory item')
  }

  return response.json()
}

export async function updateInventoryItem(
  id: string,
  data: Partial<Omit<InventoryItem, 'id'>>
): Promise<InventoryItem> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to update inventory item')
  }

  return response.json()
}

export async function deleteInventoryItem(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete inventory item')
  }
}