import { Outlet, useNavigate } from 'react-router-dom';

import { clearToken } from 'libs/utils/storage';

export default function BaseLayout() {
    const navigate = useNavigate();
    const handleAddRoomClick = () => {
        navigate('/add');
    };

    const handleJoinRoomClick = () => {
        navigate(`/join`);
    };

    const handleLogOut = () => {
        clearToken();
        navigate(`/`);
    };

    return (
        <div className="h-full w-full pt-16">
            <header className="fixed inset-x-0 top-0 z-10 flex h-16 items-center justify-between px-5 shadow-sm">
                <h1 className="text-2xl font-bold uppercase text-blue-gray-900">작은 대화</h1>
                <div className="flex">
                    <div>
                        <button
                            aria-label="참가"
                            type="button"
                            onClick={handleJoinRoomClick}
                            className="mr-20 h-10 w-20 whitespace-nowrap rounded-md bg-blue-gray-900 text-xs font-bold text-blue-gray-50 hover:opacity-80"
                        >
                            방 참여하기
                        </button>
                    </div>
                    <div>
                        <button
                            aria-label="등록"
                            type="button"
                            onClick={handleAddRoomClick}
                            className="h-10 w-20 whitespace-nowrap rounded-md bg-blue-gray-900 text-xs font-bold text-blue-gray-50 hover:opacity-80"
                        >
                            방 생성하기
                        </button>
                    </div>
                </div>
                <button
                    aria-label="로그아웃"
                    type="button"
                    onClick={handleLogOut}
                    className="h-10 w-20 whitespace-nowrap rounded-md bg-blue-gray-900 text-xs font-bold text-blue-gray-50 hover:opacity-80"
                >
                    로그아웃
                </button>
            </header>
            <main className="flex h-full w-full justify-center">
                <Outlet />
            </main>
        </div>
    );
}
