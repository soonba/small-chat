import { GuideHeader } from 'layout';

import { Chat, Color, Component, Iconography, Typography } from './components';

export default function Guide() {
    return (
        <div className="min-w-laptop min-h-full w-full">
            <GuideHeader />
            <main className="bg-grid dark:bg-grid-light relative mx-auto mt-14 min-h-screen w-full bg-primary-50/10 p-5 dark:bg-black/10">
                <div className="space-y-10">
                    <Typography />
                    <Color />
                    <Iconography />
                    <Component />
                    <Chat />
                </div>
            </main>
        </div>
    );
}
