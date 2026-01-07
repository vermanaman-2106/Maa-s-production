import {defineField, defineType} from "sanity";

export default defineType({
  name: "preWeddingShoot",
  title: "Pre-wedding Shoot",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Shoot title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: {hotspot: true},
      fields: [
        defineField({name: "alt", title: "Alt text", type: "string"}),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        defineField({
          name: "image",
          type: "image",
          options: {hotspot: true},
          fields: [
            defineField({name: "alt", title: "Alt text", type: "string"}),
          ],
        }),
      ],
    }),
    defineField({
      name: "story",
      title: "Story / notes",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "heroImage",
    },
  },
});


