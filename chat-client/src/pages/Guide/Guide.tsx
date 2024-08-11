import { GuideHeader } from 'layout';

import { Chat, Color, Component, Iconography, Typography } from './components';

export default function Guide() {
    return (
        <div className="min-h-full w-full min-w-laptop">
            <GuideHeader />
            <main className="min-h-screen w-full bg-primary-50/10 p-5 bg-grid dark:bg-black/10 dark:bg-grid-light">
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
