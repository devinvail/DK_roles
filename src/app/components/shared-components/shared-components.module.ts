import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlideContentComponent } from '../slide-content/slide-content.component';
import { HeaderComponent } from '../header/header.component';
import { MenuModalComponent } from '../menu-modal/menu-modal.component';
import { MysearchComponent } from '../mysearch/mysearch.component';
import { PipesModules } from 'src/app/pipes/pipes.module';
import { HelpComponent } from '../help/help.component';
import { AboutComponent } from '../about/about.component';
import { ModalHeaderComponent } from '../modal-header/modal-header.component';
import { SavedSearchesComponent } from '../saved-searches/saved-searches.component';

@NgModule({
  declarations: [SlideContentComponent, HeaderComponent, MenuModalComponent, MysearchComponent, HelpComponent, AboutComponent, ModalHeaderComponent, SavedSearchesComponent],
  imports: [CommonModule, IonicModule, PipesModules],
  exports: [SlideContentComponent, HeaderComponent, MenuModalComponent, MysearchComponent, HelpComponent, AboutComponent, SavedSearchesComponent],
  entryComponents: [HelpComponent],
})
export class SharedComponentsModule {}
