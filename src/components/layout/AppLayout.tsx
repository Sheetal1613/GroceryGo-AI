import { Outlet } from 'react-router-dom'
import { AppHeader } from './AppHeader'
import { AppSidebar } from './AppSidebar'
import { MobileNav } from './MobileNav'
import { PageContainer } from './PageContainer'
import styles from './AppLayout.module.css'

export function AppLayout() {
  return (
    <div className={styles.shell}>
      <AppSidebar />
      <MobileNav />
      <div className={styles.main}>
        <AppHeader />
        <PageContainer>
          <Outlet />
        </PageContainer>
      </div>
    </div>
  )
}
