import { useMemo, useState } from 'react'
import { CheckCircle2, ListChecks, Pencil, Plus, Sparkles, Trash2 } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { EmptyState } from '@/components/data-display/EmptyState'
import { Pagination } from '@/components/data-display/Pagination'
import { Skeleton } from '@/components/feedback/LoadingSkeleton'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Select } from '@/components/ui/Select'
import { useShoppingLists } from '@/features/shopping-list/hooks/use-shopping-lists'
import type { ItemPriority, ShoppingListItem } from '@/features/shopping-list/types'
import styles from '@/features/shopping-list/ShoppingList.module.css'

const PRIORITY_OPTIONS = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

const CATEGORY_OPTIONS = [
  { value: 'Produce', label: 'Produce' },
  { value: 'Dairy & Eggs', label: 'Dairy & Eggs' },
  { value: 'Meat & Seafood', label: 'Meat & Seafood' },
  { value: 'Pantry', label: 'Pantry' },
  { value: 'Frozen', label: 'Frozen' },
  { value: 'Beverages', label: 'Beverages' },
  { value: 'Bakery', label: 'Bakery' },
  { value: 'Snacks', label: 'Snacks' },
]

const PAGE_SIZE = 8

type DraftItemForm = {
  name: string
  category: string
  quantity: string
  unit: string
  priority: ItemPriority
  note: string
}

function defaultForm(): DraftItemForm {
  return {
    name: '',
    category: 'Produce',
    quantity: '1',
    unit: 'units',
    priority: 'medium',
    note: '',
  }
}

export default function ShoppingListPage() {
  const sl = useShoppingLists()
  const [listName, setListName] = useState('')
  const [itemForm, setItemForm] = useState<DraftItemForm>(defaultForm())
  const [page, setPage] = useState(1)

  const items = sl.activeList?.items ?? []
  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return items.slice(start, start + PAGE_SIZE)
  }, [items, page])

  const openItemModal = (mode: 'add-item' | 'edit-item', item?: ShoppingListItem) => {
    if (mode === 'edit-item' && item) {
      setItemForm({
        name: item.name,
        category: item.category,
        quantity: String(item.quantity),
        unit: item.unit,
        priority: item.priority,
        note: item.note ?? '',
      })
      sl.openModal(mode, item.id)
      return
    }
    setItemForm(defaultForm())
    sl.openModal('add-item')
  }

  const submitItem = () => {
    if (!itemForm.name.trim()) return
    const payload = {
      name: itemForm.name.trim(),
      category: itemForm.category as ShoppingListItem['category'],
      quantity: Math.max(1, Number(itemForm.quantity) || 1),
      unit: itemForm.unit.trim() || 'units',
      priority: itemForm.priority,
      note: itemForm.note.trim() || undefined,
    }
    if (sl.modalMode === 'edit-item' && sl.selectedItem) {
      sl.editItem(sl.selectedItem.id, payload)
    } else {
      sl.addItem(payload)
    }
    setItemForm(defaultForm())
  }

  if (sl.isLoading) {
    return (
      <div className={styles.page}>
        <PageHeader title="Shopping List" description="Build and manage multiple grocery lists with smart suggestions." />
        <Skeleton className={styles.skeletonLarge} variant="rounded" />
        <Skeleton className={styles.skeletonLarge} variant="rounded" />
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="Shopping List"
        description="Build and manage multiple grocery lists with smart suggestions."
        actions={
          <Button onClick={() => { setListName(''); sl.openModal('create-list') }}>
            <Plus size={16} /> Create List
          </Button>
        }
      />

      <div className={styles.layout}>
        <Card className={styles.sidebar}>
          <CardHeader title="Lists" description={`${sl.lists.length} total`} />
          {sl.lists.length === 0 ? (
            <EmptyState icon={ListChecks} title="No lists yet" description="Create your first shopping list." compact />
          ) : (
            <ul className={styles.listMenu}>
              {sl.lists.map((l) => {
                const percent = l.items.length ? Math.round((l.items.filter((i) => i.completed).length / l.items.length) * 100) : 0
                return (
                  <li key={l.id}>
                    <button className={`${styles.listBtn} ${sl.activeListId === l.id ? styles.active : ''}`} onClick={() => { sl.setActiveListId(l.id); setPage(1) }}>
                      <span>{l.name}</span>
                      <Badge variant={l.status === 'completed' ? 'success' : 'accent'}>{percent}%</Badge>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
          {sl.activeList && (
            <div className={styles.listActions}>
              <Button size="sm" variant="secondary" onClick={() => { setListName(sl.activeList?.name ?? ''); sl.openModal('rename-list') }}>
                <Pencil size={14} /> Rename
              </Button>
              <Button size="sm" variant="danger" onClick={() => sl.openModal('delete-list')}>
                <Trash2 size={14} /> Delete
              </Button>
            </div>
          )}
        </Card>

        <div className={styles.main}>
          <Card>
            <CardHeader
              title={sl.activeList?.name ?? 'No active list'}
              description={sl.activeList ? `${sl.activeList.items.filter((i) => i.completed).length} of ${sl.activeList.items.length} completed` : 'Create or choose a list'}
              action={sl.activeList ? <Button size="sm" onClick={() => openItemModal('add-item')}><Plus size={14} /> Add Item</Button> : null}
            />
            {sl.activeList ? (
              <>
                <div className={styles.progressTrack}><div className={styles.progressFill} style={{ width: `${sl.activeCompletion}%` }} /></div>
                <p className={styles.progressText}>Completion: {sl.activeCompletion}%</p>
                {sl.activeList.items.length === 0 ? (
                  <EmptyState icon={CheckCircle2} title="No items in this list" description="Add items or use smart suggestions." compact />
                ) : (
                  <>
                    <ul className={styles.items}>
                      {paged.map((item) => (
                        <li key={item.id} className={styles.itemRow}>
                          <label className={styles.itemCheck}>
                            <input type="checkbox" checked={item.completed} onChange={() => sl.toggleComplete(item.id)} />
                            <span className={item.completed ? styles.done : ''}>{item.name}</span>
                          </label>
                          <div className={styles.meta}>
                            <Badge variant={item.priority === 'high' ? 'danger' : item.priority === 'medium' ? 'warning' : 'neutral'}>{item.priority}</Badge>
                            <span>{item.quantity} {item.unit}</span>
                            <Button size="sm" variant="ghost" onClick={() => openItemModal('edit-item', item)}><Pencil size={14} /></Button>
                            <Button size="sm" variant="ghost" onClick={() => sl.openModal('delete-item', item.id)}><Trash2 size={14} /></Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <Pagination page={page} pageSize={PAGE_SIZE} totalItems={items.length} onPageChange={setPage} />
                  </>
                )}
              </>
            ) : (
              <EmptyState icon={ListChecks} title="No active list" description="Create a list to begin planning groceries." />
            )}
          </Card>

          <div className={styles.panels}>
            <Card>
              <CardHeader title="Smart Suggestions" description="Based on inventory trends" action={<Sparkles size={16} />} />
              <ul className={styles.suggestions}>
                {sl.suggestions.map((s) => (
                  <li key={s.id} className={styles.suggestionRow}>
                    <div>
                      <p>{s.name}</p>
                      <small>{s.reason}</small>
                    </div>
                    <Button size="sm" variant="secondary" onClick={() => sl.addSuggestion(s)}>Add</Button>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <CardHeader title="Recent Lists" />
              {sl.recentLists.length === 0 ? (
                <EmptyState icon={ListChecks} title="No recent activity" description="Your recent lists will show here." compact />
              ) : (
                <ul className={styles.recent}>
                  {sl.recentLists.map((l) => (
                    <li key={l.id}>
                      <button className={styles.recentBtn} onClick={() => sl.setActiveListId(l.id)}>
                        <span>{l.name}</span>
                        <small>{new Date(l.updatedAt).toLocaleDateString()}</small>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </div>
      </div>

      <Modal
        open={sl.modalMode === 'create-list'}
        onClose={sl.closeModal}
        title="Create List"
        footer={<><Button variant="secondary" onClick={sl.closeModal}>Cancel</Button><Button onClick={() => sl.createList(listName)}>Create</Button></>}
      >
        <Input label="List Name" value={listName} onChange={(e) => setListName(e.target.value)} placeholder="e.g. Weekend Groceries" />
      </Modal>

      <Modal
        open={sl.modalMode === 'rename-list'}
        onClose={sl.closeModal}
        title="Rename List"
        footer={<><Button variant="secondary" onClick={sl.closeModal}>Cancel</Button><Button onClick={() => sl.renameActiveList(listName)}>Save</Button></>}
      >
        <Input label="List Name" value={listName} onChange={(e) => setListName(e.target.value)} />
      </Modal>

      <Modal
        open={sl.modalMode === 'delete-list'}
        onClose={sl.closeModal}
        title="Delete List?"
        description="This action cannot be undone."
        footer={<><Button variant="secondary" onClick={sl.closeModal}>Cancel</Button><Button variant="danger" onClick={sl.deleteActiveList}>Delete</Button></>}
      >
        <p>Delete <strong>{sl.activeList?.name}</strong> and all its items?</p>
      </Modal>

      <Modal
        open={sl.modalMode === 'add-item' || sl.modalMode === 'edit-item'}
        onClose={sl.closeModal}
        title={sl.modalMode === 'edit-item' ? 'Edit Item' : 'Add Item'}
        footer={<><Button variant="secondary" onClick={sl.closeModal}>Cancel</Button><Button onClick={submitItem}>{sl.modalMode === 'edit-item' ? 'Save' : 'Add'}</Button></>}
      >
        <div className={styles.formGrid}>
          <Input label="Item Name" value={itemForm.name} onChange={(e) => setItemForm((p) => ({ ...p, name: e.target.value }))} />
          <Select label="Category" options={CATEGORY_OPTIONS} value={itemForm.category} onChange={(e) => setItemForm((p) => ({ ...p, category: e.target.value }))} />
          <Input label="Quantity" type="number" min={1} value={itemForm.quantity} onChange={(e) => setItemForm((p) => ({ ...p, quantity: e.target.value }))} />
          <Input label="Unit" value={itemForm.unit} onChange={(e) => setItemForm((p) => ({ ...p, unit: e.target.value }))} />
          <Select label="Priority" options={PRIORITY_OPTIONS} value={itemForm.priority} onChange={(e) => setItemForm((p) => ({ ...p, priority: e.target.value as ItemPriority }))} />
          <Input label="Note" value={itemForm.note} onChange={(e) => setItemForm((p) => ({ ...p, note: e.target.value }))} />
        </div>
      </Modal>

      <Modal
        open={sl.modalMode === 'delete-item'}
        onClose={sl.closeModal}
        title="Delete Item?"
        footer={<><Button variant="secondary" onClick={sl.closeModal}>Cancel</Button><Button variant="danger" onClick={() => sl.selectedItem && sl.deleteItem(sl.selectedItem.id)}>Delete</Button></>}
      >
        <p>Remove <strong>{sl.selectedItem?.name}</strong> from this list?</p>
      </Modal>
    </div>
  )
}
