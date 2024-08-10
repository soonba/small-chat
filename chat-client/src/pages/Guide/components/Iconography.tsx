import { Link } from 'react-router-dom';

import {
    ChatBubbleOvalLeftIcon,
    ClipboardIcon,
    EnvelopeIcon,
    FaceSmileIcon,
    InformationCircleIcon,
    LinkIcon,
    MoonIcon,
    PaperAirplaneIcon,
    PlusIcon,
    SunIcon,
    UserIcon,
    XMarkIcon
} from '@heroicons/react/20/solid';

export default function Iconography() {
    return (
        <section id="iconography" className="scroll-m-16 text-primary-900 dark:text-primary-100">
            <div className="mb-10 flex items-center gap-x-2.5">
                <h2 className="text-30-B-36">Iconography</h2>
                <Link title="Heroicons" to="https://heroicons.com/" target="_blank" rel="noopener noreferrer">
                    <LinkIcon className="h-5 w-5" />
                </Link>
            </div>
            <div className="flex items-start gap-x-20 rounded bg-layout-light p-5 shadow-md shadow-primary-100 dark:bg-layout-dark dark:shadow-primary-950">
                <div className="space-y-2.5">
                    <h3 className="text-16-B-24 text-gray-900 dark:text-gray-100">16 x 16</h3>
                    <div className="flex items-center gap-x-2.5">
                        <InformationCircleIcon className="h-4 w-4" />
                    </div>
                </div>
                <div className="space-y-2.5">
                    <h3 className="text-16-B-24 text-gray-900 dark:text-gray-100">20 x 20</h3>
                    <div className="flex items-center gap-x-2.5">
                        <MoonIcon className="h-5 w-5 text-primary-900 hover:opacity-80 dark:text-primary-100" />
                        <SunIcon className="h-5 w-5 text-primary-900 hover:opacity-80 dark:text-primary-100" />
                        <ClipboardIcon className="h-5 w-5 text-primary-900 hover:opacity-80 dark:text-primary-100" />
                        <FaceSmileIcon className="h-5 w-5 text-primary-900 hover:opacity-80 dark:text-primary-100" />
                        <PaperAirplaneIcon className="h-5 w-5 text-primary-900 hover:opacity-80 dark:text-primary-100" />
                    </div>
                </div>
                <div className="space-y-2.5">
                    <h3 className="text-16-B-24 text-gray-900 dark:text-gray-100">20 x 20</h3>
                    <div className="flex items-center gap-x-2.5">
                        <UserIcon className="h-6 w-6 text-primary-100 dark:text-primary-900" />
                    </div>
                </div>
                <div className="space-y-2.5">
                    <h3 className="text-16-B-24 text-gray-900 dark:text-gray-100">32 x 32</h3>
                    <div className="flex items-center gap-x-2.5">
                        <XMarkIcon className="h-8 w-8 text-primary-900 hover:opacity-80 dark:text-primary-100" />
                        <ChatBubbleOvalLeftIcon className="h-8 w-8 text-primary-900 dark:text-primary-100" />
                        <EnvelopeIcon className="h-8 w-8 text-primary-900 dark:text-primary-100" />
                    </div>
                </div>
                <div className="space-y-2.5">
                    <h3 className="text-16-B-24 text-gray-900 dark:text-gray-100">40 x 40</h3>
                    <div className="flex items-center gap-x-2.5">
                        <PlusIcon className="h-10 w-10 text-primary-100 dark:text-primary-900" />
                    </div>
                </div>
            </div>
        </section>
    );
}
