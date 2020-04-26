export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5ea61220d0093b3d9d2f07b7',
                  title: 'Sanity Studio',
                  name: 'family-blog-studio',
                  apiId: '17a531c8-1532-4753-b8f5-49387a5f53c7'
                },
                {
                  buildHookId: '5ea6122003d6d4a77f082e8c',
                  title: 'Blog Website',
                  name: 'family-blog',
                  apiId: '29468119-c497-40e6-90a8-1a68de26bd62'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/dkgitdev/family-blog',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://family-blog.netlify.app', category: 'apps' }
        ]
      }
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: { title: 'Recent blog posts', order: '_createdAt desc', types: ['post'] },
      layout: { width: 'medium' }
    }
  ]
}
