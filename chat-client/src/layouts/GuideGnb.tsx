import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';

import { Button, IconButton } from '@components/Button';

import { useMode } from '@hooks/utils';

const HEADINGS = ['typography', 'color', 'iconography', 'component', 'chat / message'];

export default function GuideGnb() {
  const { mode, onModeChange } = useMode();
  const [selected, setSelected] = useState('');

  const handleScrollIntoView = useCallback(
    (id: string) => {
      const element = document.getElementById(id);
      const button = document.getElementById(`gnb-${id}`);
      const prevButton = document.getElementById(`gnb-${selected}`);
      if (element && button) {
        button.style.setProperty('font-weight', '900');
        button.style.setProperty('text-decoration', 'underline');
        if (prevButton) {
          prevButton.style.removeProperty('font-weight');
          prevButton.style.removeProperty('text-decoration');
        }
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setSelected(id);
      }
    },
    [selected],
  );

  return (
    <header
      className="sticky inset-x-0 top-0 z-10 shadow-sm shadow-primary-100 backdrop-blur-sm dark:shadow-primary-950"
      id="gnb"
    >
      <div className="mx-auto flex h-14 w-full items-center justify-between rounded-b-md p-5">
        <Link reloadDocument to="/">
          <h1 className="text-center font-jua text-24-R-32 text-white dark:text-primary-100">작은 대화</h1>
        </Link>
        <div className="ml-auto flex items-center gap-5">
          <nav className="w-auto">
            <ul className="flex items-center gap-x-2.5">
              {HEADINGS.map((heading) => (
                <li key={heading} id={`gnb-${heading}`}>
                  <Button
                    size="medium"
                    text={heading.toUpperCase()}
                    variant="text"
                    onClick={() => handleScrollIntoView(heading)}
                  />
                </li>
              ))}
            </ul>
          </nav>
          <IconButton
            aria-label={`change to ${mode === 'light' ? 'dark' : 'light'} mode`}
            icon={mode === 'light' ? <MoonIcon /> : <SunIcon />}
            size="small"
            title={`${mode === 'light' ? '다크' : '라이트'} 모드로 변경하기`}
            variant="text"
            onClick={onModeChange}
          />
        </div>
      </div>
    </header>
  );
}
