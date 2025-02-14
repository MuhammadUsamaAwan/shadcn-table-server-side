import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Meta, Scripts } from '@tanstack/start';

import globalCss from '~/styles/global.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TechNest - High-Quality Computer Parts',
      },
      {
        name: 'description',
        content: 'Buy High-Quality Computer Parts Online - Best Deals & Fast Shipping',
      },
    ],
    links: [
      { rel: 'stylesheet', href: globalCss },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang='en'>
      <head>
        <Meta />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
