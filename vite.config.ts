import { defineConfig } from 'vite';
import postcssPresetEnv from 'postcss-preset-env';
import postcssRelativeColorSyntax from '@csstools/postcss-relative-color-syntax';
import postcssLogical from 'postcss-logical';
import postcssNesting from 'postcss-nesting';
import { faviconsPlugin } from '@darkobits/vite-plugin-favicons';

export default defineConfig({
  base: '',
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (file) => {
          const { name } = file;

          if (name === 'index.css') return 'style.css';

          return '[name].[ext]';
        },
        chunkFileNames: '[name].js',
        entryFileNames: '[name].js',
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssLogical({
          // @ts-expect-error: looks like bugged types
          blockDirection: 'top-to-bottom',
          // @ts-expect-error: looks like bugged types
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
    faviconsPlugin({ icons: { favicons: { source: './public/assets/favicon.svg' } } }),
  ],
});
