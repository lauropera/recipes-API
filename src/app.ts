import cors from 'cors';
import express from 'express';
import authRoutes from './routes/authRoutes';
import recipeRoutes from './routes/recipeRoutes';
import categoryRoutes from './routes/categoryRoutes';
import httpErrorMiddleware from './middlewares/httpErrorMiddleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.use(cors());
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH',
      );
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.use('/auth', authRoutes);
    this.app.use('/recipe', recipeRoutes);
    this.app.use('/category', categoryRoutes);

    this.app.use(httpErrorMiddleware);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
