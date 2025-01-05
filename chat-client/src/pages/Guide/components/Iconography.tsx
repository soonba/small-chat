import { Link } from 'react-router-dom';

import {
  ArrowLeftEndOnRectangleIcon,
  ChatBubbleOvalLeftIcon,
  ChevronLeftIcon,
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
  XMarkIcon,
} from '@heroicons/react/20/solid';

export default function Iconography() {
  return (
    <section className="scroll-m-16 drop-shadow-lg text-shadow dark:text-shadow-unset" id="iconography">
      <div className="mb-10 flex items-center gap-x-2.5">
        <h2 className="text-30-B-36" id="iconography">
          Iconography
        </h2>
        <Link rel="noopener noreferrer" target="_blank" title="Heroicons" to="https://heroicons.com/">
          <LinkIcon className="size-5" />
        </Link>
      </div>
      <div className="flex flex-col items-start gap-y-20 rounded bg-transparent p-5">
        <div className="space-y-2.5">
          <h3 className="text-16-B-24 text-gray-50 dark:text-gray-100">16 x 16</h3>
          <div className="flex items-center gap-x-2.5">
            <InformationCircleIcon className="size-4" />
          </div>
        </div>
        <div className="space-y-2.5">
          <h3 className="text-16-B-24 text-gray-50 dark:text-gray-100">20 x 20</h3>
          <div className="flex items-center gap-x-2.5">
            <MoonIcon className="size-5 text-primary-900 hover:opacity-80 dark:text-primary-100" />
            <SunIcon className="size-5 text-primary-900 hover:opacity-80 dark:text-primary-100" />
            <ArrowLeftEndOnRectangleIcon className="size-5 text-primary-900 hover:opacity-80 dark:text-primary-100" />
            <FaceSmileIcon className="size-5 text-primary-900 hover:opacity-80 dark:text-primary-100" />
            <ClipboardIcon className="size-5 text-primary-900 hover:opacity-80 dark:text-primary-100" />
            <PaperAirplaneIcon className="size-5 text-primary-900 hover:opacity-80 dark:text-primary-100" />
          </div>
        </div>
        <div className="space-y-2.5">
          <h3 className="text-16-B-24 text-gray-50 dark:text-gray-100">24 x 24</h3>
          <div className="flex items-center gap-x-2.5">
            <UserIcon className="size-6 text-primary-100 dark:text-primary-900" />
          </div>
        </div>
        <div className="space-y-2.5">
          <h3 className="text-16-B-24 text-gray-50 dark:text-gray-100">32 x 32</h3>
          <div className="flex items-center gap-x-2.5">
            <ChevronLeftIcon className="size-8 text-primary-900 dark:text-primary-100" />
            <XMarkIcon className="size-8 text-primary-900 hover:opacity-80 dark:text-primary-100" />
            <ChatBubbleOvalLeftIcon className="size-8 text-primary-900 dark:text-primary-100" />
            <EnvelopeIcon className="size-8 text-primary-900 dark:text-primary-100" />
          </div>
        </div>
        <div className="space-y-2.5">
          <h3 className="text-16-B-24 text-gray-50 dark:text-gray-100">40 x 40</h3>
          <div className="flex items-center gap-x-2.5">
            <PlusIcon className="size-10 text-primary-100 dark:text-primary-900" />
          </div>
        </div>
      </div>
    </section>
  );
}
