import { HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { last } from 'rxjs/operators';

export function methodBuilder(method: string) {
  return function (url: string) {
    return function (target: any, propertyKey: string, descriptor: any) {
      const path = target[`${propertyKey}_Path_parameters`] || [];
      const body = target[`${propertyKey}_Body_parameters`];
      const query = target[`${propertyKey}_Query_parameters`] || [];

      descriptor.value = function (...args: any[]) {
        const reqUrl: string = createPath(url, path, args);
        const reqBody = createBody(body, descriptor, args);
        const params: HttpParams = createQuery(query, args);
        const headers = createHeaders(target, descriptor, this.getDefaultHeaders());

        let req = new HttpRequest(method, reqUrl, reqBody, { params, headers });

        if (descriptor.responseType) {
          req = req.clone({ responseType: descriptor.responseType });
        }

        const res = this.http.request(req).pipe(last());

        return this.responseInterceptor(res, descriptor.adapter);
      };

      return descriptor;
    };
  };
}

export function paramBuilder(paramName: string) {
  return function (key: string) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
      const metadataKey = `${propertyKey.toString()}_${paramName}_parameters`;
      const paramObj = {
        key: key,
        parameterIndex: parameterIndex,
      };

      if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(paramObj);
      } else {
        target[metadataKey] = [paramObj];
      }
    };
  };
}

function createPath(url: string, path: Array<any>, args: Array<any>): string {
  return path.reduce((s, p) => {
    return s.replace(`{${p.key}}`, args[p.parameterIndex]);
  }, url);
}

function createBody(body: Array<any>, descriptor: any, args: Array<any>) {
  let data = body ? args[body[0].parameterIndex] : null;

  if (descriptor.requestAdapter) {
    data = descriptor.requestAdapter(data);
  }

  return data ? JSON.stringify(data) : null;
}

function createQuery(query: any[], args: Array<any>): HttpParams {
  return query
    .map((p) => ({ key: p.key, value: args[p.parameterIndex] }))
    .filter(({ value }) => value !== null && value !== undefined)
    .reduce((params, p) => {
      const { key, value } = p;

      if (Array.isArray(value)) {
        return value.reduce((acc, val) => acc.append(key, val), params);
      } else {
        const v = value instanceof Object ? JSON.stringify(value) : value;
        return params.set(key, v);
      }
    }, new HttpParams());
}

function createHeaders(target: any, descriptor: any, defaultHeaders: { [key: string]: string }) {
  let headers = new HttpHeaders(defaultHeaders);

  for (const k in descriptor.headers) {
    // eslint-disable-next-line no-prototype-builtins
    if (descriptor.headers.hasOwnProperty(k)) {
      headers = headers.set(k, descriptor.headers[k]);
    }
  }

  return headers;
}
