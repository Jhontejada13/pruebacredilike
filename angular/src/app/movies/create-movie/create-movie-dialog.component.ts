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
  CreateMovieDto,
  GenderDto,
  CreateUserDto
} from '@shared/service-proxies/service-proxies';


@Component({
  templateUrl: './create-movie-dialog.component.html',
})
export class CreateMovieDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  movie = new CreateMovieDto();
  user = new CreateUserDto();
  genders: GenderDto[] = [];
  genderSelected: GenderDto | null;
  checkedGendersMap: { [key: string]: boolean } = {};
  defaultGendersChekedStatus = false;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _movieService: MovieServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngOnInit(): void {    
    this._movieService.getGenders().subscribe((result) => {
      this.genders = result.items;
      console.log(this.genders)
    });
  }

  setInitialGenderStatus(): void {
    _map(this.genders, (item) => {
      this.checkedGendersMap[item.name] = this.isGenderChecked(
        item.name
      );
    });
  }

  isGenderChecked(name: string): boolean {
    return this.defaultGendersChekedStatus;
  }

  onGenderChange(gender: GenderDto, $event) {
    this.checkedGendersMap[gender.name] = $event.target.checked;
  }

  getCheckedGenders(): string[] {
    const genders: string[] = [];
    _forEach(this.checkedGendersMap, function (value, key) {
      if (value) {
        genders.push(key);
      }
    });
    return genders;
  }

  save(): void {
    this.saving = true;

    this.movie.gendersName = this.getCheckedGenders();
    
    this.movie.genderId = this.genderSelected.id;
    console.log(this.genderSelected.id)
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
      console.log(this.movie);
  }
}









