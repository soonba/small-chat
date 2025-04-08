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
  PaintBrushIcon,
  PaperAirplaneIcon,
  PlusIcon,
  SunIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';

export default function Iconography() {
  return (
    <div>
      <div className="mb-10 flex items-center gap-x-2.5">
        <h2 className="text-30-B-36" id="iconography">
          Iconography
        </h2>
        <Link rel="noopener noreferrer" target="_blank" title="Heroicons" to="https://heroicons.com/">
          <LinkIcon className="size-5" />
        </Link>
      </div>
      <div className="flex flex-col items-start gap-y-20 rounded bg-transparent">
        <div className="space-y-2.5">
          <h3 className="text-16-B-24 text-black">16 x 16</h3>
          <div className="flex items-center gap-x-2.5">
            <InformationCircleIcon className="size-4 text-gray-900" />
          </div>
        </div>
        <div className="space-y-2.5">
          <h3 className="text-16-B-24 text-black">20 x 20</h3>
          <div className="flex items-center gap-x-2.5">
            <MoonIcon className="size-5 text-gray-900" />
            <SunIcon className="size-5 text-gray-900" />
            <PaintBrushIcon className="size-5 text-gray-900" />
            <ArrowLeftEndOnRectangleIcon className="size-5 text-gray-900" />
            <FaceSmileIcon className="size-5 text-gray-900" />
            <ClipboardIcon className="size-5 text-gray-900" />
            <PaperAirplaneIcon className="size-5 text-gray-900" />
          </div>
        </div>
        <div className="space-y-2.5">
          <h3 className="text-16-B-24 text-black">24 x 24</h3>
          <div className="flex items-center gap-x-2.5">
            <UserIcon className="size-6 text-gray-900" />
          </div>
        </div>
        <div className="space-y-2.5">
          <h3 className="text-16-B-24 text-black">32 x 32</h3>
          <div className="flex items-center gap-x-2.5">
            <ChevronLeftIcon className="size-8 text-gray-900" />
            <XMarkIcon className="size-8 text-gray-900" />
            <ChatBubbleOvalLeftIcon className="size-8 text-gray-900" />
            <EnvelopeIcon className="size-8 text-gray-900" />
          </div>
        </div>
        <div className="space-y-2.5">
          <h3 className="text-16-B-24 text-black">40 x 40</h3>
          <div className="flex items-center gap-x-2.5">
            <PlusIcon className="size-10 text-gray-900" />
          </div>
        </div>
      </div>
    </div>
  );
}
