import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    category: z.enum(['anime', 'training', 'nutrition', 'mindset']),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const workouts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    character: z.string(),
    anime: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    duration: z.string(),
    goal: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    pubDate: z.coerce.date(),
  }),
});

export const collections = { blog, workouts };
