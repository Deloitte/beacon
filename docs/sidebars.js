export default {
  documentationSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
  ],
  examplesSidebar: [
    'examples',
    {
      type: 'category',
      label: 'Inline Installation',
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
      items: [
        'examples/snippet/basic-trackers',
        'examples/snippet/custom-tags',
        'examples/snippet/custom-settings',
      ],
    },
  ],
};

