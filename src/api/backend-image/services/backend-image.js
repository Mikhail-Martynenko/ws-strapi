'use strict';

/**
 * backend-image service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::backend-image.backend-image');
