import { Link } from 'react-router-dom';

import { LinkIcon } from '@heroicons/react/20/solid';

function getFontWeight(weight: string) {
    switch (weight) {
        case 'BL':
            return 'Black';
        case 'B':
            return 'Bold';
        case 'SB':
            return 'Semibold';
        case 'M':
            return 'Medium';
        case 'L':
            return 'Light';
        default:
            return 'Regular';
    }
}

const HEADING = ['text-36-B-40', 'text-30-B-36', 'text-30-M-36', 'text-16-SB-24'];
const BODY = [
    'text-24-BL-32',
    'text-20-B-28',
    'text-18-B-28',
    'text-18-M-28',
    'text-18-R-28',
    'text-16-B-24',
    'text-16-M-24',
    'text-16-R-24',
    'text-14-B-20',
    'text-14-R-20'
];
const CAPTION = ['text-12-B-16', 'text-12-L-16'];

export default function Typography() {
    return (
        <section id="typography" className="scroll-m-16 text-primary-900 dark:text-primary-100">
            <h2 className="text-30-B-36 mb-10">Typography</h2>
            <div className="dark:bg-layout-dark bg-layout-light space-y-10 rounded p-5 shadow-md shadow-primary-100 dark:shadow-primary-950">
                <div className="grid grid-cols-2 gap-y-5">
                    <div className="flex items-center gap-x-2.5">
                        <h3 className="text-16-B-24 text-gray-900 dark:text-gray-100">System Font</h3>
                        <Link
                            title="Pretendard Font"
                            to="https://github.com/orioncactus/pretendard"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <LinkIcon className="h-3 w-3" />
                        </Link>
                    </div>
                    <div className="font-jua flex items-center gap-x-2.5">
                        <h3 className="text-16-B-24 text-gray-900 dark:text-gray-100">Title Font</h3>
                        <Link
                            title="Jua Font"
                            to="https://fonts.google.com/specimen/Jua"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <LinkIcon className="h-3 w-3" />
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <small className="mr-5 mt-auto text-gray-900 dark:text-gray-100">ENG</small>
                        <h4 className="text-30-B-36 w-full">Pretendard</h4>
                        <small className="mr-5 mt-auto text-gray-900 dark:text-gray-100">KOR</small>
                        <h4 className="text-30-B-36 w-full">프리텐다드</h4>
                    </div>
                    <div className="flex items-center">
                        <small className="mr-5 mt-auto text-gray-900 dark:text-gray-100">ENG</small>
                        <h4 className="text-30-B-36 font-jua w-full ">Jua</h4>
                        <small className="mr-5 mt-auto text-gray-900 dark:text-gray-100">KOR</small>
                        <h4 className="text-30-B-36 font-jua w-full ">주아체</h4>
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <p className="text-18-R-28 flex items-center gap-x-5">
                            <span className="w-24 font-light text-gray-900 dark:text-gray-100">Light</span>
                            <span className="w-28 whitespace-nowrap font-light">가나다라마바사</span>
                            <span className="w-20 font-light">ABCDEFG</span>
                            <span className="w-20 font-light">abcdefg</span>
                            <span className="w-28 font-light">0123456789</span>
                        </p>
                        <p className="text-18-R-28 flex items-center gap-x-5">
                            <span className="font-inherit w-24 text-gray-900 dark:text-gray-100">Regular</span>
                            <span className="font-inherit w-28 whitespace-nowrap">가나다라마바사</span>
                            <span className="font-inherit w-20">ABCDEFG</span>
                            <span className="font-inherit w-20">abcdefg</span>
                            <span className="font-inherit w-28">0123456789</span>
                        </p>
                        <p className="text-18-R-28 flex items-center gap-x-5">
                            <span className="w-24 font-medium text-gray-900 dark:text-gray-100">Medium</span>
                            <span className="w-28 whitespace-nowrap font-medium">가나다라마바사</span>
                            <span className="w-20 font-medium">ABCDEFG</span>
                            <span className="w-20 font-medium">abcdefg</span>
                            <span className="w-28 font-medium">0123456789</span>
                        </p>
                        <p className="text-18-R-28 flex items-center gap-x-5">
                            <span className="w-24 font-semibold text-gray-900 dark:text-gray-100">Semibold</span>
                            <span className="w-28 whitespace-nowrap font-semibold">가나다라마바사</span>
                            <span className="w-20 font-semibold">ABCDEFG</span>
                            <span className="w-20 font-semibold">abcdefg</span>
                            <span className="w-28 font-semibold">0123456789</span>
                        </p>
                        <p className="text-18-R-28 flex items-center gap-x-5">
                            <span className="w-24 font-bold text-gray-900 dark:text-gray-100">Bold</span>
                            <span className="w-28 whitespace-nowrap font-bold">가나다라마바사</span>
                            <span className="w-20 font-bold">ABCDEFG</span>
                            <span className="w-20 font-bold">abcdefg</span>
                            <span className="w-28 font-bold">0123456789</span>
                        </p>
                        <p className="text-18-R-28 flex items-center gap-x-5">
                            <span className="w-24 font-black text-gray-900 dark:text-gray-100">Black</span>
                            <span className="w-28 whitespace-nowrap font-black">가나다라마바사</span>
                            <span className="w-20 font-black">ABCDEFG</span>
                            <span className="w-20 font-black">abcdefg</span>
                            <span className="w-28 font-black">0123456789</span>
                        </p>
                    </div>
                    <div className="mb-auto flex flex-col gap-y-5">
                        <p className="text-18-R-28 font-jua flex items-center gap-x-5">
                            <span className="font-inherit w-24 text-gray-900 dark:text-gray-100">Regular</span>
                            <span className="font-inherit whitespace-nowrap">가나다라마바사</span>
                            <span className="font-inherit">ABCDEFG</span>
                            <span className="font-inherit">abcdefg</span>
                            <span className="font-inherit">0123456789</span>
                        </p>
                    </div>
                </div>
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-16-B-24 mb-5 text-gray-900 dark:text-gray-100">Heading</h3>
                        <ul className="space-y-5">
                            {HEADING.map((variant) => (
                                <li key={variant} className="flex items-center gap-x-10">
                                    <p className="text-16-SB-24 flex w-28 flex-col gap-1 text-gray-900 dark:text-gray-100">
                                        {`${variant.split('-')[1]}-${variant.split('-')[2]}`}
                                        <small className="text-12-L-16">
                                            Pretendard&nbsp;
                                            {getFontWeight(variant.split('-')[2])}
                                        </small>
                                        <small className="text-12-L-16">
                                            {`${variant.split('-')[1]}px / ${variant.split('-')[3]}px`}
                                        </small>
                                    </p>
                                    <p className={variant}>가나다라마바사 abcdefg 0123456789</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-16-B-24 mb-5 text-gray-900 dark:text-gray-100">Body</h3>
                        <ul className="space-y-5">
                            {BODY.map((variant) => (
                                <li key={variant} className="flex items-center gap-x-10">
                                    <p className="text-16-SB-24 flex w-28 flex-col gap-1 text-gray-900 dark:text-gray-100">
                                        {`${variant.split('-')[1]}-${variant.split('-')[2]}`}
                                        <small className="text-12-L-16">
                                            Pretendard&nbsp;
                                            {getFontWeight(variant.split('-')[2])}
                                        </small>
                                        <small className="text-12-L-16">
                                            {`${variant.split('-')[1]}px / ${variant.split('-')[3]}px`}
                                        </small>
                                    </p>
                                    <p className={variant}>가나다라마바사 abcdefg 0123456789</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-16-B-24 mb-5 text-gray-900 dark:text-gray-100">Caption</h3>
                        <ul className="space-y-5">
                            {CAPTION.map((variant) => (
                                <li key={variant} className="flex items-center gap-x-10">
                                    <p className="text-16-SB-24 flex w-28 flex-col gap-1 text-gray-900 dark:text-gray-100">
                                        {`${variant.split('-')[1]}-${variant.split('-')[2]}`}
                                        <small className="text-12-L-16">
                                            Pretendard&nbsp;
                                            {getFontWeight(variant.split('-')[2])}
                                        </small>
                                        <small className="text-12-L-16">
                                            {`${variant.split('-')[1]}px / ${variant.split('-')[3]}px`}
                                        </small>
                                    </p>
                                    <p className={variant}>가나다라마바사 abcdefg 0123456789</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
