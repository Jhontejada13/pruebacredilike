import {
    Component,
    Injector,
    OnInit,
    EventEmitter,
    Output,
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
    GenderServiceProxy,
    GenderDto,
} from '@shared/service-proxies/service-proxies';


@Component({
    templateUrl: './edit-gender-dialog.component.html',
})

export class EditGenderDialogComponent extends AppComponentBase implements OnInit {
    saving = false;
    gender = new GenderDto();
    id: number;

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        public _genderService: GenderServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._genderService.get(this.id).subscribe((result) => {
            this.gender = result
        });
    }

    save(): void {
        this.saving = true;

        this._genderService
        .update(this.gender)
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