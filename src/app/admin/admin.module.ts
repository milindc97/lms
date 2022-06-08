import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NotificationComponent } from './notification/notification.component';
import { SupportComponent } from './support/support.component';
import { PolicyComponent } from './policy/policy.component';
import { ProfileComponent } from './profile/profile.component';
import { ActiveWallComponent } from './active-wall/active-wall.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { IonicModule } from '@ionic/angular';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [
    NotificationComponent,
    SupportComponent,
    PolicyComponent,
    ProfileComponent,
    ActiveWallComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      defaultLanguage:'English - EN'
    }),
    NgCircleProgressModule.forRoot({
      radius: 20,
      outerStrokeWidth: 4,
      innerStrokeWidth: 0,
      responsive:true,
      outerStrokeColor: "#049dff",
      animationDuration: 300,
      showBackground:true,
      backgroundPadding:-4,
      showSubtitle:false,
      backgroundColor:'#34495E',
      titleColor:'#ffffff',
      titleFontSize:'10',
      unitsColor:'#ffffff'
    }),
    NgbProgressbarModule,
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
export class AdminModule { }



// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}