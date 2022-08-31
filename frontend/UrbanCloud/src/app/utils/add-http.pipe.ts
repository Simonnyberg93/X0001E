import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addHttp',
})
export class AddHttpPipe implements PipeTransform {
  transform(url: string): string {
    let newUrl: string = '';
    if (!/^http[s]?:\/\//.test(url)) {
      newUrl += 'https://';
    }
    return (newUrl += url);
  }
}
