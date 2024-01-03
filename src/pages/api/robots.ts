import {NextApiRequest, NextApiResponse} from 'next';

const policy = process.env.ALLOW_ROBOTS ? 'Allow' : 'Disallow';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
    const file = ['User-agent: *', `${policy}: /`].join('\n');

    res.end(file);
}
