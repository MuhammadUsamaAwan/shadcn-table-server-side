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
        title: 'Advanced Shadcn Table',
      },
      {
        name: 'description',
        content: 'Shadcn Table with server-side pagination, filtering & sorting',
      },
    ],
    links: [{ rel: 'stylesheet', href: globalCss }],
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
