import {defineField, defineType} from "sanity";

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      description: "Main heading for the About page",
      validation: (Rule) => Rule.required(),
      initialValue: "About Maa's Production",
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 4,
      description: "Brief introduction or tagline",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {hotspot: true},
      description: "Primary image for the About section",
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "story",
      title: "Your Story",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            {title: "Normal", value: "normal"},
            {title: "H2", value: "h2"},
            {title: "H3", value: "h3"},
          ],
          lists: [],
          marks: {
            decorators: [
              {title: "Strong", value: "strong"},
              {title: "Emphasis", value: "em"},
            ],
          },
        },
      ],
      description: "Tell your story, philosophy, and approach to wedding photography",
    }),
    defineField({
      name: "values",
      title: "Values / Philosophy",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Value Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: "title",
            },
          },
        },
      ],
    }),
    defineField({
      name: "awards",
      title: "Awards / Recognition",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Award Title",
              type: "string",
            }),
            defineField({
              name: "year",
              title: "Year",
              type: "string",
            }),
            defineField({
              name: "organization",
              title: "Organization",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Information",
      type: "object",
      fields: [
        defineField({
          name: "email",
          title: "Email",
          type: "string",
        }),
        defineField({
          name: "phone",
          title: "Phone",
          type: "string",
        }),
        defineField({
          name: "location",
          title: "Location",
          type: "string",
          description: "e.g., 'Delhi, India'",
        }),
        defineField({
          name: "socialLinks",
          title: "Social Media Links",
          type: "object",
          fields: [
            defineField({
              name: "instagram",
              title: "Instagram",
              type: "url",
            }),
            defineField({
              name: "vimeo",
              title: "Vimeo",
              type: "url",
            }),
            defineField({
              name: "website",
              title: "Website",
              type: "url",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
});

