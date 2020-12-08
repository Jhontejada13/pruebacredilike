import {
    Component,
    Injector,
    OnInit,
    EventEmitter,
    Output
  } from '@angular/core';
  import { finalize } from 'rxjs/operators';
  import { BsModalRef } from 'ngx-bootstrap/modal';
  import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
  import { AppComponentBase } from '@shared/app-component-base';
  import {
    MovieServiceProxy,
    MovieDto,
  } from '@shared/service-proxies/service-proxies';

  @Component({
    templateUrl: './edit-movie-dialog.component.html'
  })

  export class EditMovieDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  movie = new MovieDto();
  id: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _movieService: MovieServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._movieService.get(this.id).subscribe((result) => {
      this.movie = result;
    });
  }

  save(): void {
    this.saving = true;

    this._movieService
      .update(this.movie)
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
