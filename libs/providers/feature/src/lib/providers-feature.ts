import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export abstract class HttpProvider {
  protected constructor(protected http: HttpClient) {}

  protected getDefaultHeaders(): { [key: string]: any } {
    return {};
  }

  protected responseInterceptor(
    response: Observable<HttpResponse<any>>,
    adapter: () => void,
  ): Observable<any> {
    return response.pipe(
      map((res) => {
        if (!res.ok) {
          return res;
        }

        try {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return adapter ? adapter.call(undefined, res.body) : res.body;
        } catch (e) {
          console.error('Http adapter error:', e);
          return res;
        }
      }),
    );
  }
}
