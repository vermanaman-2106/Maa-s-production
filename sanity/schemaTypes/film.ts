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
      name: "videoFile",
      title: "Video File",
      type: "file",
      description:
        "Upload a video file directly. Supported formats: MP4, WebM, MOV. Recommended: MP4 (H.264 codec) for best compatibility.",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "vimeoId",
      title: "Vimeo ID (Optional)",
      type: "string",
      description:
        "Alternative: Paste only the Vimeo video ID (the numbers at the end of the URL). Use this if you prefer hosting on Vimeo instead of uploading directly.",
      validation: (Rule) =>
        Rule.custom((vimeoId, context) => {
          const videoFile = (context.parent as any)?.videoFile;
          if (!videoFile && !vimeoId) {
            return "Either a Video File or Vimeo ID must be provided.";
          }
          return true;
        }),
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
      name: "coupleNames",
      title: "Couple Names",
      type: "string",
      description: "Names of the couple (e.g., 'Priya & Rahul')",
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
      subtitle: "videoFile.asset.originalFilename",
      media: "thumbnail",
    },
  },
});



