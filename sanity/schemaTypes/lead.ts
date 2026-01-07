import {defineField, defineType} from "sanity";

export default defineType({
  name: "lead",
  title: "Wedding Lead",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp number",
      type: "string",
    }),
    defineField({
      name: "weddingDate",
      title: "Wedding date",
      type: "date",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "e.g. Website form, Instagram DM, referral.",
    }),
    defineField({
      name: "notes",
      title: "Team notes",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "city",
    },
  },
});


