import {Env} from '../../shared/models';
import {DeploymentEnv} from '../logger/models';

export function getEnv() {
    return (process.env.APP_ENV as Env) || (process.env.DEV_MODE || false ? Env.Preprod : Env.Prod);
}

export function checkIsDev() {
    return process.env.NODE_ENV === 'development';
}

export function getDeploymentEnv() {
    return (process.env.DEPLOYMENT_ENV?.toLowerCase() as DeploymentEnv) ?? DeploymentEnv.DEFAULT;
}
