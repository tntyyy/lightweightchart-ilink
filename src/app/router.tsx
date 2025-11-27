import App from '@/app/app.tsx';
import { createBrowserRouter } from 'react-router-dom';
import {ROUTES} from '@/shared/model/routes.ts';

export const router = createBrowserRouter([
    {
        element: <App/>,
        children: [
            {
                path: ROUTES.HOME,
                lazy: () => import("@/features/home/Home.page.tsx"),
            },
        ]
    }
]);