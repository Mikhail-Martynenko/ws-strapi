'use strict';

/**
 * frontend-image service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::frontend-image.frontend-image');
