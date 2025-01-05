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

const TITLE = ['text-36-R-40', 'text-28-R-36', 'text-24-R-32'];
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
  'text-14-SB-20',
  'text-14-M-20',
  'text-14-R-20',
];
const CAPTION = ['text-12-B-16', 'text-12-SB-16', 'text-12-M-16', 'text-12-R-16', 'text-12-L-16', 'text-10-L-12'];

export default function Typography() {
  return (
    <section className="scroll-m-16 drop-shadow-lg text-shadow dark:text-shadow-unset" id="typography">
      <h2 className="mb-10 text-30-B-36" id="typography">
        Typography
      </h2>
      <div className="w-full space-y-10 rounded bg-transparent p-5">
        <div className="grid grid-cols-2 gap-y-5">
          <div className="flex items-center gap-x-2.5">
            <h3 className="text-16-B-24 text-gray-50 dark:text-gray-100">System Font</h3>
            <Link
              rel="noopener noreferrer"
              target="_blank"
              title="Pretendard Font"
              to="https://github.com/orioncactus/pretendard"
            >
              <LinkIcon className="size-3" />
            </Link>
          </div>
          <div className="flex items-center gap-x-2.5 font-jua">
            <h3 className="text-16-B-24 text-gray-50 dark:text-gray-100">Title Font</h3>
            <Link rel="noopener noreferrer" target="_blank" title="Jua Font" to="https://fonts.google.com/specimen/Jua">
              <LinkIcon className="size-3" />
            </Link>
          </div>
          <div className="flex items-center">
            <small className="mr-5 mt-auto text-gray-50 dark:text-gray-100">ENG</small>
            <h4 className="w-full text-30-B-36">Pretendard</h4>
            <small className="mr-5 mt-auto text-gray-50 dark:text-gray-100">KOR</small>
            <h4 className="w-full text-30-B-36">프리텐다드</h4>
          </div>
          <div className="flex items-center">
            <small className="mr-5 mt-auto text-gray-50 dark:text-gray-100">ENG</small>
            <h4 className="w-full font-jua text-30-B-36">Jua</h4>
            <small className="mr-5 mt-auto text-gray-50 dark:text-gray-100">KOR</small>
            <h4 className="w-full font-jua text-30-B-36">주아체</h4>
          </div>
          <div className="flex flex-col gap-y-5">
            <p className="flex items-center gap-x-5 text-18-R-28">
              <span className="w-24 font-light text-gray-50 dark:text-gray-100">Light</span>
              <span className="w-28 whitespace-nowrap font-light">가나다라마바사</span>
              <span className="w-20 font-light">ABCDEFG</span>
              <span className="w-20 font-light">abcdefg</span>
              <span className="w-28 font-light">0123456789</span>
            </p>
            <p className="flex items-center gap-x-5 text-18-R-28">
              <span className="w-24 font-inherit text-gray-50 dark:text-gray-100">Regular</span>
              <span className="w-28 whitespace-nowrap font-inherit">가나다라마바사</span>
              <span className="w-20 font-inherit">ABCDEFG</span>
              <span className="w-20 font-inherit">abcdefg</span>
              <span className="w-28 font-inherit">0123456789</span>
            </p>
            <p className="flex items-center gap-x-5 text-18-R-28">
              <span className="w-24 font-medium text-gray-50 dark:text-gray-100">Medium</span>
              <span className="w-28 whitespace-nowrap font-medium">가나다라마바사</span>
              <span className="w-20 font-medium">ABCDEFG</span>
              <span className="w-20 font-medium">abcdefg</span>
              <span className="w-28 font-medium">0123456789</span>
            </p>
            <p className="flex items-center gap-x-5 text-18-R-28">
              <span className="w-24 font-semibold text-gray-50 dark:text-gray-100">Semibold</span>
              <span className="w-28 whitespace-nowrap font-semibold">가나다라마바사</span>
              <span className="w-20 font-semibold">ABCDEFG</span>
              <span className="w-20 font-semibold">abcdefg</span>
              <span className="w-28 font-semibold">0123456789</span>
            </p>
            <p className="flex items-center gap-x-5 text-18-R-28">
              <span className="w-24 font-bold text-gray-50 dark:text-gray-100">Bold</span>
              <span className="w-28 whitespace-nowrap font-bold">가나다라마바사</span>
              <span className="w-20 font-bold">ABCDEFG</span>
              <span className="w-20 font-bold">abcdefg</span>
              <span className="w-28 font-bold">0123456789</span>
            </p>
            <p className="flex items-center gap-x-5 text-18-R-28">
              <span className="w-24 font-black text-gray-50 dark:text-gray-100">Black</span>
              <span className="w-28 whitespace-nowrap font-black">가나다라마바사</span>
              <span className="w-20 font-black">ABCDEFG</span>
              <span className="w-20 font-black">abcdefg</span>
              <span className="w-28 font-black">0123456789</span>
            </p>
          </div>
          <div className="mb-auto flex flex-col gap-y-5">
            <p className="flex items-center gap-x-5 font-jua text-18-R-28">
              <span className="w-24 font-inherit text-gray-50 dark:text-gray-100">Regular</span>
              <span className="whitespace-nowrap font-inherit">가나다라마바사</span>
              <span className="font-inherit">ABCDEFG</span>
              <span className="font-inherit">abcdefg</span>
              <span className="font-inherit">0123456789</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-start justify-between gap-5">
          {[
            { list: TITLE, name: 'Title' },
            { list: HEADING, name: 'Heading' },
            { list: BODY, name: 'Body' },
            { list: CAPTION, name: 'Caption' },
          ].map((data) => (
            <div key={data.name}>
              <h3 className="mb-5 text-16-B-24 text-gray-50 dark:text-gray-100">{data.name}</h3>
              <ul className="space-y-5">
                {data.list.map((variant) => (
                  <li key={variant} className="flex items-center gap-x-10">
                    <p className="flex w-28 shrink-0 flex-col gap-1 text-16-SB-24 text-gray-50 dark:text-gray-100">
                      {`${variant.split('-')[1]}-${variant.split('-')[2]}`}
                      <small className="text-12-B-16">
                        Pretendard&nbsp;
                        {getFontWeight(variant.split('-')[2])}
                      </small>
                      <small className="text-12-L-16">
                        {`${variant.split('-')[1]}px / ${variant.split('-')[3]}px`}
                      </small>
                    </p>
                    <p className={`${variant} whitespace-nowrap`}>
                      가나다라마바사
                      <br /> abcdefg
                      <br /> 0123456789
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
