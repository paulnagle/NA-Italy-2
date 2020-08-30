import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlenc'
})
export class HtmlencPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace('&#8211;', ' - ');
  }

}
