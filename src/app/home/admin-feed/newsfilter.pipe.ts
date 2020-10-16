import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newsfilter'
})
export class NewsfilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    // console.log(items)
     if(!items) return [];
     if(!searchText) return items;
     searchText = searchText.toLowerCase();
     console.log(searchText)
     return items.filter( it => {
       return it.Description.toLowerCase().includes(searchText) 
      // console
     });
    }
 

}
