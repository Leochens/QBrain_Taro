import { appConfig } from '../config';

export const getExpiration = () => {
    const timestamp = Date.parse(new Date());
    const expiration = timestamp + appConfig.expiration;
    return expiration;
}

