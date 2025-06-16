import { defineConfig } from 'sanity'

import { schemaTypes } from './schemaTypes'

import { visionTool } from '@sanity/vision'
import { mediaAssetSource } from 'sanity-plugin-media'

const devOnlyPlugins = [visionTool()]

export default defineConfig({
  name: 'default',
  title: 'fasco',

  projectId: 'zxhn84dx',
  dataset: 'production',

  schema: {
    types: schemaTypes,
  },

  form: {
    file: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
      },
    },
    image: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource === mediaAssetSource)
      },
    },
  },

  // studio: {
  //   components: {
  //     navbar: Navbar,
  //   },
  // },
})