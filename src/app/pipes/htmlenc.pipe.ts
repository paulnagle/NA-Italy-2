import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlenc'
})
export class HtmlencPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    const regex = /&#([0-9]{1,4});/g;
    return value.replace(regex, (htmlentity: string) => {
      const txt = document.createElement('textarea');
      txt.innerHTML = htmlentity;
      return value.trustAsHtml(txt.value);
    });
  }

}
