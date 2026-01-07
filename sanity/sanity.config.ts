import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Maa\'s Production',

  projectId: 'kyg3mmds',
  dataset: 'maaproduction',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
