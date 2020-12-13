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
    MovieSeenServiceProxy,
    Movie_SeenDto,
} from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { stringify } from '@angular/compiler/src/util';

@Component({
    templateUrl: './edit-movieSeen-dialog.component.html',
})

export class EditMovieSeenDialogComponent extends AppComponentBase implements OnInit {
    saving = false;
    movieSeen = new Movie_SeenDto();
    movieSeenId: number;

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        public _movieSeenService: MovieSeenServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._movieSeenService.get(this.movieSeenId).subscribe((result) => {
            this.movieSeen = result
        });
    }

    save(): void {
        this.saving = true;

        this.movieSeen.viewDate = moment(this.movieSeen.viewDate).toDate()

        this._movieSeenService
            .update(this.movieSeen)
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