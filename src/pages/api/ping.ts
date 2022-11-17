import {NextApiRequest, NextApiResponse} from 'next';

export default function ping(_req: NextApiRequest, res: NextApiResponse) {
    res.end('pong');
}
