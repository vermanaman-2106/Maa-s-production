import {defineField, defineType} from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "coupleNames",
      title: "Names / family",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "locationOrContext",
      title: "Location or context",
      type: "string",
      description: "e.g. ‘Delhi winter wedding’ or ‘Udaipur sundowner sangeet’.",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required().min(40),
    }),
  ],
  preview: {
    select: {
      title: "coupleNames",
      subtitle: "locationOrContext",
    },
  },
});


