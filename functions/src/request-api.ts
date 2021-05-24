import helmet from 'helmet';
import cors from 'cors';
import express from 'express';
import admin from 'firebase-admin';
import {
  Response as IExpressResponse,
  Request as IExpressRequest,
  NextFunction as IExpressNextFunction
} from 'express';

import error from './error';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(
  (req: IExpressRequest, res: IExpressResponse, next: IExpressNextFunction) => {
    const idToken = retreiveTokenFromAuthHeader(req);

    if (idToken) {
      admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
          const uid = decodedToken.uid;
          res.locals._App = { uid };
          next();
        })
        .catch((err) => {
          throw error(err);
        });
    } else {
      throw error({
        code: 'failed-precondition',
        message: 'token id not set, please log in'
      });
    }
  }
);
app.use(routes);

export default app;

function retreiveTokenFromAuthHeader(req: IExpressRequest) {
  const authHeaderVal = <string>req.get('authorization');
  let token;
  if (('' + authHeaderVal).startsWith('Bearer ')) {
    token = authHeaderVal.slice(7, authHeaderVal.length);
  }

  return token;
}
