var url = require('url');

/**
 * Utility methods.
 */
module.exports = {
    /**
     * Returns map with the query params from passed URL string.
     * @param urlString {string} URL
     * @returns {object} parsed query params
     */
    getQueryParams: function (urlString) {
        return url.parse(urlString, true).query;
    }
}
