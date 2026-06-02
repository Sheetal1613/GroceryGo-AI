import { PageHeader } from './PageHeader'
import styles from './PlaceholderPage.module.css'

type PlaceholderPageProps = {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <div className={styles.card}>
        <p className={styles.message}>
          This page is ready for feature implementation.
        </p>
      </div>
    </>
  )
}
