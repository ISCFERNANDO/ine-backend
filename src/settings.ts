import * as config from '../environments';
import * as _ from 'lodash';
import * as path from 'path';

const defaultConfig = config.default;
const environment = process.env.NODE_ENV || 'dev';
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);

export const APP = {
    NAME: finalConfig.app_name,
    VERSION: finalConfig.app_version,
    DESCRIPTION: finalConfig.app_description,
    DEFAULT_LANG: finalConfig.app_default_lang,
    MEDIA: finalConfig.host_media
}

export const JWT = {
    AUTH: finalConfig.jwt_auth,
    LIFE_TIME: finalConfig.jwt_life_time,
    KEY: finalConfig.jwt_key
}

export const DB = {
    MYSQL: {
        DATABASE: finalConfig.db_mysql_database,
		HOST: finalConfig.db_mysql_host,
		PORT: finalConfig.db_mysql_port,
		USERNAME: finalConfig.db_mysql_username,
		PASSWORD: finalConfig.db_mysql_password
    }
}
