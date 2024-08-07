import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import { Button, IconButton } from 'components';

import { useMode } from 'hooks';

const HEADINGS = ['typography', 'color', 'iconography', 'component', 'chat'];

export default function GuideHeader() {
    const { mode, onModeChange } = useMode();
    const [selected, setSelected] = useState('');

    const handleScrollIntoView = useCallback(
        (id: string) => {
            const element = document.getElementById(id);
            const button = document.getElementById(`button-${id}`);
            const prevButton = document.getElementById(`button-${selected}`);
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
        [selected]
    );

    return (
        <header className="dark:bg-layout-dark bg-layout-light fixed left-0 right-0 top-0 z-10 rounded-b-md shadow-sm shadow-primary-100 dark:shadow-primary-950">
            <div className="mx-auto flex h-14 w-full items-center justify-between rounded-b-md p-5">
                <Link reloadDocument to="/">
                    <h1 className="font-jua text-24-R-32 text-center text-primary-900 dark:text-primary-100">
                        작은 대화
                    </h1>
                </Link>
                <div className="ml-auto flex items-center gap-5">
                    <nav className="w-auto">
                        <ul className="flex items-center gap-x-2.5">
                            {HEADINGS.map((heading) => (
                                <li key={heading}>
                                    <Button
                                        id={`button-${heading}`}
                                        variant="text"
                                        size="medium"
                                        text={heading.toUpperCase()}
                                        onClick={() => handleScrollIntoView(heading)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <IconButton
                        aria-label={`change to ${mode === 'light' ? 'dark' : 'light'} mode`}
                        title={`${mode === 'light' ? '다크' : '라이트'} 모드로 변경하기`}
                        variant="text"
                        size="small"
                        onClick={onModeChange}
                        icon={mode === 'light' ? <MoonIcon /> : <SunIcon />}
                    />
                </div>
            </div>
        </header>
    );
}
