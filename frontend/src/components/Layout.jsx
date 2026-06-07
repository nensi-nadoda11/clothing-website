import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { QuickContact } from './QuickContact';

export function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <QuickContact />
    </div>
  );
}
