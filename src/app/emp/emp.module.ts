import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpRoutingModule } from './emp-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { TranslateModule } from '@ngx-translate/core';
import { ActiveWallComponent } from './active-wall/active-wall.component';
import { CalenderComponent } from './calender/calender.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { ProfileComponent } from './profile/profile.component';
import { SupportComponent } from './support/support.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotificationComponent } from './notification/notification.component';

FullCalendarModule.registerPlugins([ 
  interactionPlugin,
  dayGridPlugin
]);

@NgModule({
  declarations: [
    ActiveWallComponent,
    CalenderComponent,
    CertificatesComponent,
    ProfileComponent,
    SupportComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    EmpRoutingModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Underline',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',

        // popups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    }),
    IonicModule.forRoot()
  ]
})
export class EmpModule { }
