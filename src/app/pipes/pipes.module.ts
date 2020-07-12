import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TidyDelimiterPipe } from './tidy-delimiter.pipe';
import { HtmlencPipe } from './htmlenc.pipe';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [TidyDelimiterPipe, HtmlencPipe],
  exports: [TidyDelimiterPipe, HtmlencPipe]
})

export class AppPipesModule { }
