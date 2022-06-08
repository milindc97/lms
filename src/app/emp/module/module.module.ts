import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { ModuleOverviewComponent } from './module-overview/module-overview.component';
import { OverviewComponent } from './overview/overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { YoutubePipePipe } from 'src/app/_helper/pipe/youtube-pipe.pipe';


@NgModule({
  declarations: [
    ModuleOverviewComponent,
    OverviewComponent,
    YoutubePipePipe
  ],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    IonicModule.forRoot(),
    TranslateModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ModuleModule { }
