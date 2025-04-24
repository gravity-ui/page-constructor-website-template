import csurf from 'csurf';
import {IncomingMessage, ServerResponse} from 'http';
import {NextApiRequest, NextApiResponse} from 'next';

import type {Request, Response} from 'express';

export type ReqWithCSRF = IncomingMessage & {csrfToken: () => string};

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => unknown;

export function csrf(req: IncomingMessage, res: ServerResponse) {
    return new Promise((resolve, reject) => {
        csurf({cookie: true})(req as Request, res as Response, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export const withCSRFCheck = (handler: ApiHandler) =>
    async function (req: NextApiRequest, res: NextApiResponse) {
        try {
            await csrf(req, res);
        } catch {
            return res.status(401).json({error: 'Access denied'});
        }

        return handler(req, res);
    };

export default csrf;
