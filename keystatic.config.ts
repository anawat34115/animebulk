import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'anawat34115/animebulk',
  },
  ui: {
    brand: {
      name: 'AnimeBulk CMS',
    },
  },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
          slug: { label: 'Slug', description: 'URL-friendly identifier (auto-generated)' },
        }),
        description: fields.text({
          label: 'Description',
          description: 'Short summary shown in cards and meta tags',
          multiline: true,
          validation: { isRequired: true },
        }),
        pubDate: fields.date({
          label: 'Publish Date',
          validation: { isRequired: true },
        }),
        updatedDate: fields.date({
          label: 'Updated Date',
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Anime', value: 'anime' },
            { label: 'Training', value: 'training' },
            { label: 'Nutrition', value: 'nutrition' },
            { label: 'Mindset', value: 'mindset' },
          ],
          defaultValue: 'training',
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.value || 'Tag',
          }
        ),
        featured: fields.checkbox({
          label: 'Featured',
          description: 'Show on homepage featured section',
          defaultValue: false,
        }),
        heroImage: fields.text({
          label: 'Hero Image URL',
          description: 'Optional image URL for the post header',
        }),
        content: fields.markdoc({
          label: 'Content',
          extension: 'md',
        }),
      },
    }),

    workouts: collection({
      label: 'Workout Routines',
      slugField: 'title',
      path: 'src/content/workouts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
          slug: { label: 'Slug', description: 'URL-friendly identifier (auto-generated)' },
        }),
        character: fields.text({
          label: 'Character Name',
          validation: { isRequired: true },
        }),
        anime: fields.text({
          label: 'Anime / Series',
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          validation: { isRequired: true },
        }),
        difficulty: fields.select({
          label: 'Difficulty',
          options: [
            { label: 'Beginner', value: 'beginner' },
            { label: 'Intermediate', value: 'intermediate' },
            { label: 'Advanced', value: 'advanced' },
          ],
          defaultValue: 'intermediate',
        }),
        duration: fields.text({
          label: 'Duration',
          description: 'e.g. "12 weeks · 4 days/week"',
          validation: { isRequired: true },
        }),
        goal: fields.text({
          label: 'Goal',
          description: 'e.g. "Muscle & Strength"',
          validation: { isRequired: true },
        }),
        pubDate: fields.date({
          label: 'Publish Date',
          validation: { isRequired: true },
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.value || 'Tag',
          }
        ),
        featured: fields.checkbox({
          label: 'Featured',
          description: 'Show on homepage featured section',
          defaultValue: false,
        }),
        heroImage: fields.text({
          label: 'Hero Image URL',
          description: 'Optional image URL for the workout header',
        }),
        content: fields.markdoc({
          label: 'Content',
          extension: 'md',
        }),
      },
    }),
  },
});
