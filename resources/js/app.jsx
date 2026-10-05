import '../css/app.css';
import './bootstrap';

import PulseLoader from '@/Components/PulseLoader';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <PulseLoader>
                <App {...props} />
            </PulseLoader>,
        );
    },
    // Indikator progres ditangani sendiri oleh <PulseLoader>.
    progress: false,
});
