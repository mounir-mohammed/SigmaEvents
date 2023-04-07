import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AreaSigFormService, AreaSigFormGroup } from './area-sig-form.service';
import { IAreaSig } from '../area-sig.model';
import { AreaSigService } from '../service/area-sig.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IEventSig } from 'app/entities/event-sig/event-sig.model';
import { EventSigService } from 'app/entities/event-sig/service/event-sig.service';

@Component({
  selector: 'sigma-area-sig-update',
  templateUrl: './area-sig-update.component.html',
})
export class AreaSigUpdateComponent implements OnInit {
  isSaving = false;
  area: IAreaSig | null = null;

  eventsSharedCollection: IEventSig[] = [];

  editForm: AreaSigFormGroup = this.areaFormService.createAreaSigFormGroup();
  public color = '#cccccc';

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected areaService: AreaSigService,
    protected areaFormService: AreaSigFormService,
    protected eventService: EventSigService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareEventSig = (o1: IEventSig | null, o2: IEventSig | null): boolean => this.eventService.compareEventSig(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ area }) => {
      this.area = area;
      if (area) {
        this.color = this.area?.areaColor!;
        this.updateForm(area);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('sigmaEventsApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const area = this.areaFormService.getAreaSig(this.editForm);
    if (area.areaId !== null) {
      this.subscribeToSaveResponse(this.areaService.update(area));
    } else {
      this.subscribeToSaveResponse(this.areaService.create(area));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAreaSig>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(area: IAreaSig): void {
    this.area = area;
    this.areaFormService.resetForm(this.editForm, area);

    this.eventsSharedCollection = this.eventService.addEventSigToCollectionIfMissing<IEventSig>(this.eventsSharedCollection, area.event);
  }

  protected loadRelationshipsOptions(): void {
    this.eventService
      .query()
      .pipe(map((res: HttpResponse<IEventSig[]>) => res.body ?? []))
      .pipe(map((events: IEventSig[]) => this.eventService.addEventSigToCollectionIfMissing<IEventSig>(events, this.area?.event)))
      .subscribe((events: IEventSig[]) => (this.eventsSharedCollection = events));
  }

  public onChangeColor(color: string): void {
    this.color = color;
    this.editForm.patchValue({ areaColor: color });
  }
}
