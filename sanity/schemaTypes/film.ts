import {defineField, defineType} from "sanity";

export default defineType({
  name: "film",
  title: "Film",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Film title",
      type: "string",
      validation: (Rule) => Rule.required().min(4).max(140),
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
      name: "vimeoId",
      title: "Vimeo ID",
      type: "string",
      description:
        "Paste only the Vimeo video ID (the numbers at the end of the URL).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Poster image",
      type: "image",
      options: {hotspot: true},
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "featured",
      title: "Show as featured on home page",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "vimeoId",
      media: "thumbnail",
    },
  },
});


