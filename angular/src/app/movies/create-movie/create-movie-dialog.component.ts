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
      MovieServiceProxy,
      CreateMovieDto
    } from '@shared/service-proxies/service-proxies';
import { isConstructorDeclaration } from 'typescript';



@Component({
    templateUrl: './create-movie-dialog.component.html'
})

export class CreateMovieDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  movie = new CreateMovieDto();
  

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _movieService: MovieServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }


  save(): void {
    this.saving = true;

    this._movieService
      .create(this.movie)
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







