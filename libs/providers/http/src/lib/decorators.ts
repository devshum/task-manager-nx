
import { HttpProvider } from './providers-http';
import { methodBuilder, paramBuilder } from './utils';

/************************
 *   Class decorators   *
 ************************/

/**
 * Set default headers for every method of the HttpService
 * @param {Object} headers - default headers in a key-value pair
 */
export function DefaultHeaders(headers: { [key: string]: string }) {
  return function <TFunction extends () => void>(Target: TFunction): TFunction {
    Target.prototype.getDefaultHeaders = () => headers;
    return Target;
  };
}

/*************************
 *   Method decorators   *
 *************************/

/**
 * GET method
 * @param {string} url - resource url of the method
 */
export const Get = methodBuilder('GET');

/**
 * POST method
 * @param {string} url - resource url of the method
 */
export const Post = methodBuilder('POST');

/**
 * PUT method
 * @param {string} url - resource url of the method
 */
export const Put = methodBuilder('PUT');

/**
 * PATCH method
 * @param {string} url - resource url of the method
 */
export const Patch = methodBuilder('PATCH');

/**
 * DELETE method
 * @param {string} url - resource url of the method
 */
export const Delete = methodBuilder('DELETE');

/**
 * Set custom headers for a REST method
 * @param {Object} headersDef - custom headers in a key-value pair
 */
export function Headers(headers: { [key: string]: string }) {
  return function (target: any, propertyKey: string, descriptor: any) {
    descriptor.headers = headers;
    return descriptor;
  };
}

/**
 * Set custom response type for angular request method
 * @param string responseType - response type
 */
export function ResponseType(responseType: 'arraybuffer' | 'blob' | 'json' | 'text') {
  return function (target: any, propertyKey: string, descriptor: any) {
    descriptor.responseType = responseType;
    return descriptor;
  };
}

/**
 * Defines the adapter function to modify the API response suitable for the app
 * @param TFunction adapter - function to be called
 */
export function Adapter(adapter: () => void) {
  return function (target: HttpProvider, propertyKey: string, descriptor: any) {
    descriptor.adapter = adapter || null;
    return descriptor;
  };
}

/**
 * Defines the adapter function to modify the API request body
 * @param TFunction adapter - function to be called
 */
export function RequestAdapter(adapter: () => void) {
  return function (target: HttpProvider, propertyKey: string, descriptor: any) {
    descriptor.requestAdapter = adapter || null;
    return descriptor;
  };
}

/****************************
 *   Parameter decorators   *
 ****************************/

/**
 * Path variable of a method's url, type: string
 * @param {string} key - path key to bind value
 */
export const Path = paramBuilder('Path');

/**
 * Query value of a method's url, type: string
 * @param {string} key - query key to bind value
 */
export const Query = paramBuilder('Query');

/**
 * Body of a REST method, type: key-value pair object
 * Only one body per method!
 */
export const Body = paramBuilder('Body')('Body');
