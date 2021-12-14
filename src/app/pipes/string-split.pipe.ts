import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringSplit'
})
export class StringSplitPipe implements PipeTransform {
  transform(value: string): string {
    return value.split(' ')[0].trim();
  }

}
