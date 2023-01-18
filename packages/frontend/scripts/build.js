const { sassPlugin } = require('esbuild-sass-plugin');
const { build } = require('esbuild');
const fs = require('fs-extra');

const isWatchMode = () => {
  if (process.argv.includes('watch')) {
    return true;
  }
  return false;
};

const isMinifyMode = () => {
  if (process.argv.includes('minify')) {
    return true;
  }
  return false;
};

const generateBuild = async () => {
  console.log('starting build..');

  console.log('Clear build folder..');
  fs.rmdirSync('./build', { recursive: true });
  fs.mkdirSync('./build');
  console.log('starting build ');
  try {
    await build({
      entryPoints: ['./src/index.tsx'],
      outfile: 'build/index.js',
      logLevel: 'info',
      minify: isMinifyMode(),
      bundle: true,
      sourcemap: true,
      watch: isWatchMode(),
      target: ['chrome58', 'firefox57', 'safari11', 'edge87'],
      plugins: [sassPlugin()],
      loader: {
        '.svg': 'dataurl',
        '.png': 'dataurl',
        '.eot': 'file',
        '.ttf': 'file',
        '.woff': 'file',
        '.woff2': 'file',
      },
      define: {
        'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'local'}"`,
        'process.env.REACT_APP_FLAGS_CTX_APP_NAME': '""',
        'process.env.REACT_APP_FLAGS_CTX_INSTANCE_ID': '""',
        'process.env.REACT_APP_FLAGS_CTX_HOST': '""',
        'process.env.REACT_APP_FLAGS_CTX_URL': '""',
        'process.env.REACT_APP_FLAGS_CTX_URI': '""',
      },
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  console.log('build finished successfully');
};

const copyAssets = () => {
  fs.copy('public/assets', 'build/assets');
  fs.copy('public/runtime-env.js', 'build/runtime-env.js');
  fs.copy('public/favicon.ico', 'build/favicon.ico');
  fs.copy('public/manifest.json', 'build/manifest.json');
  fs.copy('public/robots.txt', 'build/robots.txt');
  fs.copy('public/index.html', 'build/index.html');
};

generateBuild();
copyAssets();
