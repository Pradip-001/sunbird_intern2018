/**
 * index
 *
 * @module      ::js-utils
 * @description :: Represent utility functions for config requests and acts as entry file for config utility package
 * @author      :: Anuj Gupta
 */

var config_data = {
  LEARNER_SERVICE_BASE_URL: 'https://dev.open-sunbird.org/api',
  LEARNER_SERVICE_AUTHORIZATION_TOKEN: '',
  LS_SEND_EMAIL: '/user/v1/notification/email',
  LS_HEALTH_CHECK: '/health',
  LS_FORM_READ: '/v1/org/preferences/read',
  LS_FORM_CREATE: '/v1/org/preferences/create',
  LS_FORM_UPDATE: '/v1/org/preferences/update'
}

setConfig = function (name, value) {
  config_data[name] = value
}

getConfig = function (configuration_name) {
  return config_data[configuration_name]
}

setContentProviderApi = function (api) {
  Object.assign(config_data, api)
}

module.exports = {
  setConfig: setConfig,
  getConfig: getConfig,
  setContentProviderApi: setContentProviderApi
}
