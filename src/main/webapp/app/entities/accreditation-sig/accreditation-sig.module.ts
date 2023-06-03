import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AccreditationSigComponent } from './list/accreditation-sig.component';
import { AccreditationSigDetailComponent } from './detail/accreditation-sig-detail.component';
import { AccreditationSigUpdateComponent } from './update/accreditation-sig-update.component';
import { AccreditationSigDeleteDialogComponent } from './delete/accreditation-sig-delete-dialog.component';
import { AccreditationSigValidateDialogComponent } from './validate/accreditation-sig-validate-dialog.component';
import { AccreditationSigPrintDialogComponent } from './print/accreditation-sig-print-dialog.component';
import { AccreditationSigRoutingModule } from './route/accreditation-sig-routing.module';
import { CameraLaptopDialogComponent } from 'app/camera/laptop/camera-laptop-dialog.component';
import { AccreditationSigSearchDialogComponent } from './search/accreditation-sig-search-dialog.component';

@NgModule({
  imports: [SharedModule, AccreditationSigRoutingModule],
  declarations: [
    AccreditationSigComponent,
    AccreditationSigDetailComponent,
    AccreditationSigUpdateComponent,
    AccreditationSigDeleteDialogComponent,
    AccreditationSigValidateDialogComponent,
    AccreditationSigPrintDialogComponent,
    AccreditationSigSearchDialogComponent,
    CameraLaptopDialogComponent,
  ],
})
export class AccreditationSigModule {}
