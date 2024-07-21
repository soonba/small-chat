import { Outlet, ScrollRestoration } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';

export default function BaseLayout() {
    return (
        <div className="min-h-full w-full">
            <Header />
            <main className="relative mx-auto h-full w-full bg-primary-50/10 pb-48 pt-14 dark:bg-black/10">
                <Outlet />
            </main>
            <Footer />
            <ScrollRestoration />
        </div>
    );
}
