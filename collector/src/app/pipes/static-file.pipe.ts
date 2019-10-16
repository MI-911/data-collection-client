import { environment } from './../../environments/environment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'staticFile'
})
export class StaticFilePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return `${environment.staticUrl}/${args[0]}/${value}`;
  }
}
