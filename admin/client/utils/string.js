/**
 * A few helper methods for strings
 */

import inflect from 'i';
import { compact, size } from 'lodash';

/**
 * Displays the singular or plural of a string based on a number
 * or number of items in an array.
 *
 * If arity is 1, returns the plural form of the word.
 *
 * @param {String} count
 * @param {String} one string
 * @param {String} few string
 * @param {String} many string
 * @return {String} singular or plural, * is replaced with count
 * @api public
 */

exports.plural = function (count, one, few, many) {
	few = few || one;
	many = many || few;

	if (typeof count === 'string') {
		count = Number(count);
	} else if (typeof count !== 'number') {
		count = size(count);
	}

	// singular used for numbers ending in 1, except 11 (1, 21, 31...)
	// special case for numbers ending in 2-4, except 12-14 (2-4, 22-24, 32-34...)
	// numbers ending in 11-14 use plural (11-14, 111-114, 211-214...)
	var form;
	if (count % 10 === 1 && count % 100 !== 11) {
		form = one;
	} else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
		form = few;
	} else {
		form = many;
	}

	return form.replace('*', count);
};


/**
 * Converts the first letter in a string to uppercase
 *
 * @param {String} str
 * @return {String} Str
 * @api public
 */

exports.upcase = function (str) {
	if (str && str.toString) str = str.toString();
	if (typeof str !== 'string' || !str.length) return '';
	return (str.substr(0, 1).toUpperCase() + str.substr(1));
};


/**
 * Converts the first letter in a string to lowercase
 *
 * @param {String} Str
 * @return {String} str
 * @api public
 */

exports.downcase = function (str) {
	if (str && str.toString) str = str.toString();
	if (typeof str !== 'string' || !str.length) return '';
	return (str.substr(0, 1).toLowerCase() + str.substr(1));
};


/**
 * Converts a string to title case
 *
 * @param {String} str
 * @return {String} Title Case form of str
 * @api public
 */

exports.titlecase = function (str) {
	if (str && str.toString) str = str.toString();
	if (typeof str !== 'string' || !str.length) return '';
	str = str.replace(/([a-z])([A-Z])/g, '$1 $2');
	var parts = str.split(/\s|_|\-/);
	for (var i = 0; i < parts.length; i++) {
		if (parts[i] && !/^[A-Z0-9]+$/.test(parts[i])) {
			parts[i] = exports.upcase(parts[i]);
		}
	}
	return compact(parts).join(' ');
};


/**
 * Converts a string to camel case
 *
 * @param {String} str
 * @param {Boolean} lowercaseFirstWord
 * @return {String} camel-case form of str
 * @api public
 */

exports.camelcase = function (str, lc) {
	return inflect.camelize(str, !(lc));
};
