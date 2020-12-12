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
    MovieSeenServiceProxy,
    CreateMovie_SeenDto,
} from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: './create-movieSeen-dialog.component.html',
})

export class CreateMovieSeenDialogComponent extends AppComponentBase implements OnInit {
    saving = false;
    movieSeen = new CreateMovie_SeenDto();

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        public _movieSeenService: MovieSeenServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }

    ngOnInit(): void {

    }

    save(): void {
        this.saving = true

        this._movieSeenService
            .create(this.movieSeen)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.bsModalRef.hide();
                this.onSave.emit();
            });
    }
}