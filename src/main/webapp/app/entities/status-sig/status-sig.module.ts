import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { StatusSigComponent } from './list/status-sig.component';
import { StatusSigDetailComponent } from './detail/status-sig-detail.component';
import { StatusSigUpdateComponent } from './update/status-sig-update.component';
import { StatusSigDeleteDialogComponent } from './delete/status-sig-delete-dialog.component';
import { StatusSigRoutingModule } from './route/status-sig-routing.module';

@NgModule({
  imports: [SharedModule, StatusSigRoutingModule],
  declarations: [StatusSigComponent, StatusSigDetailComponent, StatusSigUpdateComponent, StatusSigDeleteDialogComponent],
})
export class StatusSigModule {}
