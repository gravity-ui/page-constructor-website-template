import {IncomingMessage} from 'http';
import UAParser from 'ua-parser-js';
import {DeviceData, RoutingData} from '../../shared/models';

export function getDeviceData(req: IncomingMessage): DeviceData {
    const ua = new UAParser(req.headers['user-agent']);

    const device = ua.getDevice();

    return {
        isMobile: device.type === 'mobile',
        isTablet: device.type === 'tablet',
    };
}

export default function getRoutingData(req: IncomingMessage): RoutingData {
    const hostname = req.headers['host'] || '';

    return {hostname};
}

export const getStatusCode = (data: PromiseRejectedResult) => {
    return data.reason.statusCode || data.reason.error?.status;
};

export function getErrorCode(statusCode: number) {
    if (statusCode >= 400) {
        return statusCode === 404 ? 404 : 500;
    }

    return null;
}
