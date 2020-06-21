import { render } from 'preact-render-to-string';
import { h } from 'preact';
import * as fs from 'fs';
import Favicon from '../src/media/favicon.ico';
import App from '../src/js/components/App';

const publicFiles = function getPublicFiles() {
  const rootdir = process.cwd();
  const publicdir = `${rootdir}/dist/public`;
  return fs.readdirSync(publicdir);
}();

const cssFilepath = function getCssFilepath() {
  const found = publicFiles.find(file => file.match(/main\.?.*\.css$/));
  return found ? `/${found}` : '/main.css';
}();

const Boilerplate = ({ children }) => (
  <html>
    <head>
      <title>Frontend Template</title>
      <link href={Favicon} rel="shortcut icon" type="image/x-icon" />
      <link rel="stylesheet" type="text/css" href={cssFilepath} />
    </head>
    <body>
      <div id="app">
        {children}
      </div>
    </body>
  </html>
);

export default function renderHTML() {
  try {
    return render(<Boilerplate children={<App />} />);
  } catch (err) {
    console.log({ err });
    return render(<Boilerplate children={'Something went wrong :/'} />);
  }
}
