import { Outlet, useNavigate } from 'react-router-dom';

import { PlusIcon } from '@heroicons/react/20/solid';

export default function BaseLayout() {
    const navigate = useNavigate();

    // TODO: 등록
    const handleClick = () => {
        navigate('/add');
    };

    return (
        <div className="h-full w-full pt-16">
            <header className="fixed inset-x-0 top-0 z-10 flex h-16 items-center justify-between px-5 shadow-sm">
                <h1 className="text-blue-gray-900 text-2xl font-bold uppercase">작은 대화</h1>
                <button aria-label="등록" type="button" onClick={handleClick} className="bg-blue-gray-900 text-blue-gray-50 h-10 w-10 whitespace-nowrap rounded-md text-xs font-bold hover:opacity-80">
                    <PlusIcon width={20} height={20} className="m-auto" />
                </button>
            </header>
            <main className="flex h-full w-full justify-center">
                <Outlet />
            </main>
        </div>
    );
}
