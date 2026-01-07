import {defineField, defineType} from "sanity";

export default defineType({
  name: "album",
  title: "Album / Photobook",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Album name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description:
        "Explain the feel, paper, binding and legacy in warm, simple language.",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: {hotspot: true},
      fields: [
        defineField({name: "alt", title: "Alt text", type: "string"}),
      ],
    }),
    defineField({
      name: "detailImages",
      title: "Detail images",
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
  ],
  preview: {
    select: {
      title: "name",
      media: "coverImage",
    },
  },
});


