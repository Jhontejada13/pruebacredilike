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
    CreateMovie_SeenDto,
    MovieDto,
} from '@shared/service-proxies/service-proxies';
import { AbpSessionService} from 'abp-ng2-module';
import { stringify } from '@angular/compiler/src/util';
import * as moment from 'moment';

@Component({
    templateUrl: './create-movieSeen-dialog.component.html',
})

export class CreateMovieSeenDialogComponent extends AppComponentBase implements OnInit {
    saving = false;
    movieSeen = new CreateMovie_SeenDto();
    movie = new MovieDto();
    movieId: number;
    

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        public _movieSeenService: MovieSeenServiceProxy,
        public bsModalRef: BsModalRef,
        public _sesionService: AbpSessionService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        console.log(this.movieId);
    }

    save(): void {
        this.saving = true


        this.movieSeen.userId = this._sesionService.userId
        this.movieSeen.view = true;
        this.movieSeen.movieId = this.movieId;        

        this.movieSeen.viewDate = moment(this.movieSeen.viewDate).toDate() /* Este error no interfiere en la creación,
        es más bien una advertencia de pérdida de propiedades del objeto Date frente al objeto 
        Moment, la película se establece como vista sin problemas */

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