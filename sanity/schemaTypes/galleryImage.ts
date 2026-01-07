import {defineField, defineType} from "sanity";

export default defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {hotspot: true},
      fields: [
        defineField({name: "alt", title: "Alt text", type: "string"}),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured in highlights grid",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});


