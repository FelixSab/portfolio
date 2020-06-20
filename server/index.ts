import * as express from 'express';
import render from './renderer';
import healthCheck from './middlewares/healthCheck';
import useStaticCompression from './middlewares/useStaticCompression';

const app = express();

app.use('/health', healthCheck());
app.use(useStaticCompression());
app.use(express.static('dist/public'));

app.get('*', async (req, res) => {
  const html = render();
  res.send(html);
});

const port = 8080;
const server = app.listen(port, () => console.log(`Listening at port ${port}`));

process.on('SIGTERM', () => {
  if (server) {
    server.close();
  }

  console.log('Shutdown service...');
  process.exit(0);
});
