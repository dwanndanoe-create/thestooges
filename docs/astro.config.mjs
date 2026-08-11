// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Microjobs.sr Documentation',

      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/dwanndanoe-create/thestooges',
        },
      ],

      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { slug: 'getting-started' },
          ],
        },
        {
          label: 'Architecture',
          items: [
            { slug: 'architecture' },
          ],
        },
        {
          label: 'Core Features',
          items: [
            { slug: 'authentication' },
            { slug: 'jobs' },
            { slug: 'projects' },
            { slug: 'messaging' },
          ],
        },
        {
          label: 'System',
          items: [
            { slug: 'database' },
            { slug: 'admin' },
            { slug: 'deployment' },
          ],
        },
      ],
    }),
  ],
});