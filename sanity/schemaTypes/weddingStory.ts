import {defineField, defineType} from "sanity";

export default defineType({
  name: "weddingStory",
  title: "Wedding Story",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Story title",
      type: "string",
      validation: (Rule) => Rule.required().min(4).max(120),
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
      description: "City / venue or a short phrase like ‘Delhi winter wedding’.",
    }),
    defineField({
      name: "weddingDate",
      title: "Wedding date",
      type: "date",
      options: {calendarTodayLabel: "Today"},
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: {hotspot: true},
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description:
            "Describe the emotion or moment for accessibility, e.g. ‘Bride wiping a quiet tear during pheras’.",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Story gallery",
      type: "array",
      of: [
        defineField({
          name: "image",
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
      ],
    }),
    defineField({
      name: "shortIntro",
      title: "Short emotional intro",
      type: "text",
      rows: 4,
      description:
        "2–3 sentences about the couple, family energy and what made this day feel like them.",
    }),
    defineField({
      name: "testimonial",
      title: "Optional testimonial",
      type: "reference",
      to: [{type: "testimonial"}],
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
      subtitle: "location",
      media: "heroImage",
    },
  },
});


