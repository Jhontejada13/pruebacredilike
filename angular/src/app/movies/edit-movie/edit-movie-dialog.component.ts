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
    GenderDto
  } from '@shared/service-proxies/service-proxies';

  @Component({
    templateUrl: './edit-movie-dialog.component.html'
  })

  export class EditMovieDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  movie = new MovieDto();
  genders: GenderDto[] = [];
  genderSelected: GenderDto | null;
  chekedGendersMap: { [key: string]: boolean } = {};
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

      this._movieService.getGenders().subscribe((resultTwo) => {
        this.genders = resultTwo.items
        
      });
    });
  }

  setInitialGendersStatus(): void {
    _map(this.genders, (item) => {
      this.chekedGendersMap[item.name] = this.isGenderCheked(
        item.name
      )
    })
  }

  isGenderCheked(name: string): boolean{
    return _includes(this.movie.gendersName, name);
  }

  onGenderChange(gender: GenderDto, $event){
    this.chekedGendersMap[gender.name] = $event.target.checked;
  }

  getChekedGenders(): string[]{
    const genders: string[] = [];
    _forEach(this.chekedGendersMap, function (value, key) {
      if(value){
        genders.push(key);
      }
    });
    return genders;
  }

  save(): void {
    this.saving = true;

    this.movie.gendersName = this.getChekedGenders();

    console.log(this.movie);
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
