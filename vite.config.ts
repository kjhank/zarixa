import { defineConfig } from 'vite';
import postcssPresetEnv from 'postcss-preset-env';
import postcssRelativeColorSyntax from '@csstools/postcss-relative-color-syntax';
import postcssLogical from 'postcss-logical';
import postcssNesting from 'postcss-nesting';
import { faviconsPlugin } from '@darkobits/vite-plugin-favicons';

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        postcssLogical({
          blockDirection: 'top-to-bottom',
          inlineDirection: 'left-to-right',
        }),
        postcssNesting({
          edition: '2024-02',
        }),
        postcssPresetEnv({
          browsers: 'last 2 versions',
        }),
        postcssRelativeColorSyntax({ preserve: true }),
      ],
    },
  },
  plugins: [
    faviconsPlugin({ icons: { favicons: { source: './src/assets/favicon.svg' } } }),
  ],
});
