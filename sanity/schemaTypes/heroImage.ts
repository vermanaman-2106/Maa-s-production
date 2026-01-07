import {defineField, defineType} from "sanity";

export default defineType({
  name: "heroImage",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Enable this hero section on the home page",
      initialValue: true,
    }),
    defineField({
      name: "leftImage",
      title: "Left Image (Lifestyle / Storytelling)",
      type: "image",
      options: {hotspot: true},
      description:
        "Upload a lifestyle, candid, or storytelling photo. This appears on the left side of the split-screen hero.",
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description:
            "Describe the image for accessibility, e.g. 'Couple sharing an intimate moment during wedding ceremony'",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rightImage",
      title: "Right Image (Intimate / Close-up)",
      type: "image",
      options: {hotspot: true},
      description:
        "Upload an intimate detail or emotional close-up photo. This appears on the right side of the split-screen hero.",
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description:
            "Describe the image for accessibility, e.g. 'Close-up of hands exchanging wedding rings'",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainTagline",
      title: "Main Tagline / Title",
      type: "string",
      description:
        "The main heading text that appears centered over both images",
      validation: (Rule) => Rule.required().max(120),
      placeholder: "e.g., Quiet, timeless wedding stories for families who feel deeply.",
    }),
    defineField({
      name: "secondaryText",
      title: "Secondary Text (Optional)",
      type: "text",
      rows: 3,
      description:
        "Optional smaller text that appears below the main tagline. Keep it brief and emotional.",
      placeholder:
        "e.g., Maa's Production is a Delhi-based wedding photography and filmmaking studio...",
    }),
  ],
  preview: {
    select: {
      title: "mainTagline",
      subtitle: "active",
      media: "leftImage",
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || "Hero Section",
        subtitle: subtitle ? "Active" : "Inactive",
        media,
      };
    },
  },
});

