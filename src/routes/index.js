import { Router } from 'express';
import authorRouter from './author.route.js';
import publisherRouter from './publisher.route.js';
import genreRouter from './genre.route.js';
import authRouter from './auth.route.js';

const apiRouter = Router();

apiRouter.use('/authors', authorRouter);
apiRouter.use('/publishers', publisherRouter);
apiRouter.use('/genres', genreRouter);
apiRouter.use('/auth', authRouter);

export default apiRouter;
