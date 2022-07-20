import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText',
})
export class CutTextPipe implements PipeTransform {
  transform(text: string, newLen: number): string {
    if (text.length > newLen) {
      return text.substring(0, newLen - 3).concat('...');
    }
    return text;
  }
}
