import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISettingSig } from '../setting-sig.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'sigma-setting-sig-detail',
  templateUrl: './setting-sig-detail.component.html',
})
export class SettingSigDetailComponent implements OnInit {
  setting: ISettingSig | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ setting }) => {
      this.setting = setting;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
