import { Router } from 'express';
import authorRouter from './author.route.js';
import publisherRouter from './publisher.route.js';
import genreRouter from './genre.route.js';
import bookRouter from './book.route.js';
import authRouter from './auth.route.js';
import saleRouter from './sale.route.js';
import loanRouter from './loan.route.js';
import userRouter from './user.route.js';

const apiRouter = Router();

apiRouter.use('/authors', authorRouter);
apiRouter.use('/publishers', publisherRouter);
apiRouter.use('/genres', genreRouter);
apiRouter.use('/books', bookRouter);
apiRouter.use('/sales', saleRouter);
apiRouter.use('/loans', loanRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);

export default apiRouter;
