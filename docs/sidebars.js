export default {
  documentationSidebar: [
    {
      type: 'doc',
      id: 'overview',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Basics',
      collapsed: false,
      items: [
        'basics/a-installation',
        'basics/b-identify-users',
        'basics/c-trackers-and-tags',
      ],
    },
    {
      type: 'category',
      label: 'Advanced',
      collapsed: false,
      items: [
        'advanced/data-collection',
      ],
    },
  ],
  examplesSidebar: [
    'examples',
    {
      type: 'category',
      label: 'Inline Installation',
      collapsed: false,
      items: [
        'examples/inline/out-of-the-box',
        'examples/inline/with-trackers',
        'examples/inline/with-user-only',
        'examples/inline/with-user-session',
        'examples/inline/with-custom-events',
      ],
    },
    {
      type: 'category',
      label: 'Snippet Installation',
      collapsed: false,
      items: [
        'examples/snippet/basic-trackers',
        'examples/snippet/custom-tags',
        'examples/snippet/custom-settings',
      ],
    },
  ],
};

