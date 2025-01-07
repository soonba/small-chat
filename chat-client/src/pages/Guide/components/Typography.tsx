import { Link } from 'react-router-dom';

import { LinkIcon } from '@heroicons/react/20/solid';

const getFontWeight = (weight: string) => {
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
};

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

const TypographyExampleText = ({ fontWeight }: { fontWeight: string }) => (
  <span className="flex flex-1 flex-col md:flex-row md:gap-x-2.5">
    <span className={`${fontWeight} whitespace-nowrap`}>가나다라마바사</span>
    <span className={fontWeight}>ABCDEFG</span>
    <span className={fontWeight}>abcdefg</span>
    <span className={fontWeight}>0123456789</span>
  </span>
);

export default function Typography() {
  return (
    <section className="scroll-m-16 drop-shadow-lg text-shadow dark:text-shadow-unset" id="typography">
      <h2 className="mb-10 text-30-B-36" id="typography">
        Typography
      </h2>
      <div className="w-full space-y-10 rounded bg-transparent">
        <div className="flex w-full flex-col items-start justify-between gap-y-10 md:flex-row md:flex-wrap">
          <div className="flex-1 space-y-5">
            <div className="flex flex-1 items-center gap-x-2.5">
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
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex flex-1 items-center gap-2.5">
                <small className="mr-2.5 mt-auto text-gray-50 md:mr-5 dark:text-gray-100">ENG</small>
                <h4 className="flex-1 text-16-B-24 md:text-30-B-36">Pretendard</h4>
              </div>
              <div className="flex flex-1 items-center gap-2.5">
                <small className="mr-2.5 mt-auto text-gray-50 md:mr-5 dark:text-gray-100">KOR</small>
                <h4 className="flex-1 whitespace-nowrap text-16-B-24 md:text-30-B-36">프리텐다드</h4>
              </div>
            </div>
            <div className="flex flex-wrap gap-5">
              {['font-light', 'font-regular', 'font-medium', 'font-semibold', 'font-bold', 'font-black'].map(
                (fontWeight) => (
                  <p key={fontWeight} className="flex items-center gap-5 text-14-R-20 md:text-18-R-28">
                    <span className={`${fontWeight} w-24 capitalize text-gray-50 dark:text-gray-100`}>
                      {fontWeight.split('-')[1]}
                    </span>
                    <TypographyExampleText fontWeight={fontWeight} />
                  </p>
                ),
              )}
            </div>
          </div>
          <div className="flex-1 space-y-5 text-left">
            <div className="flex items-center gap-x-2.5 font-jua">
              <h3 className="text-16-B-24 text-gray-50 dark:text-gray-100">Title Font</h3>
              <Link
                rel="noopener noreferrer"
                target="_blank"
                title="Jua Font"
                to="https://fonts.google.com/specimen/Jua"
              >
                <LinkIcon className="size-3" />
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <small className="mr-2.5 mt-auto text-gray-50 md:mr-5 dark:text-gray-100">ENG</small>
              <h4 className="flex-1 font-jua text-16-B-24 md:text-30-B-36">Jua</h4>
              <small className="mr-2.5 mt-auto text-gray-50 md:mr-5 dark:text-gray-100">KOR</small>
              <h4 className="flex-1 font-jua text-16-B-24 md:text-30-B-36">주아체</h4>
            </div>
            <div className="mb-auto flex flex-col gap-y-5">
              {['font-regular'].map((fontWeight) => (
                <p key={fontWeight} className="flex items-center gap-5 font-jua text-14-R-20 md:text-18-R-28">
                  <span className={`${fontWeight} w-24 capitalize text-gray-50 dark:text-gray-100`}>
                    {fontWeight.split('-')[1]}
                  </span>
                  <TypographyExampleText fontWeight={fontWeight} />
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-start justify-between gap-5">
          {[
            { list: TITLE, name: 'Title' },
            { list: HEADING, name: 'Heading' },
            { list: BODY, name: 'Body' },
            { list: CAPTION, name: 'Caption' },
          ].map((data) => (
            <div key={data.name} className="flex-1 text-left">
              <h3 className="mb-5 text-16-B-24 text-gray-50 dark:text-gray-100">{data.name}</h3>
              <ul className="space-y-5">
                {data.list.map((variant) => (
                  <li
                    key={variant}
                    className="flex flex-col gap-y-2.5 md:flex-row md:items-center md:gap-x-10 md:gap-y-0"
                  >
                    <p className="flex w-full shrink-0 flex-col gap-1 text-16-SB-24 text-gray-50 md:w-28 dark:text-gray-100">
                      <span className="flex-1 whitespace-pre-wrap md:whitespace-nowrap">{`${variant.split('-')[1]}-${variant.split('-')[2]}`}</span>
                      <span className="flex flex-row gap-1 md:flex-col">
                        <small className="text-12-B-16">
                          Pretendard&nbsp;
                          {getFontWeight(variant.split('-')[2])}
                        </small>
                        <small className="text-12-L-16">
                          {`${variant.split('-')[1]}px / ${variant.split('-')[3]}px`}
                        </small>
                      </span>
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
