import {
    Component,
    Injector,
    OnInit,
    EventEmitter,
    Output,
  } from '@angular/core';
  import { finalize } from 'rxjs/operators';
  import { BsModalRef } from 'ngx-bootstrap/modal';
  import { forEach as _forEach, map as _map } from 'lodash-es';
  import { AppComponentBase } from '@shared/app-component-base';  
  import {
    GenderServiceProxy,
    CreateGenderDto,
    GenderDto,
  } from '@shared/service-proxies/service-proxies';
  
  
  @Component({
    templateUrl: './create-gender-dialog.component.html',
  })
  export class CreateGenderDialogComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    gender = new CreateGenderDto();
  
    @Output() onSave = new EventEmitter<any>();
  
    constructor(
      injector: Injector,
      public _genderService: GenderServiceProxy,
      public bsModalRef: BsModalRef,
    ) {
      super(injector);
    }
  
    ngOnInit(): void {    

    }
    
    save(): void {
      this.saving = true;
  
      this._genderService
      .create(this.gender)
      .pipe(
          finalize(() => {
              this.saving = true;
          })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      })      
    }
  }
  
  
  
  
  
  
  
  
  
  