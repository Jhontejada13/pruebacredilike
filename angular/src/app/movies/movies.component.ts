import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
  MovieServiceProxy,
  MovieDto,
  MovieDtoPagedResultDto,
  UserDto
} from '@shared/service-proxies/service-proxies';
import { CreateMovieDialogComponent } from './create-movie/create-movie-dialog.component';
import { EditMovieDialogComponent } from './edit-movie/edit-movie-dialog.component';
import { CreateMovieSeenDialogComponent } from '@app/movies-seen/create-movieSeen/create-movieSeen-dialog.component';

class PagedMoviesRequestDto extends PagedRequestDto {
  keyword: string;

}

@Component({
  //selector: 'app-movies',
  templateUrl: './movies.component.html',
  // styleUrls: ['./movies.component.css'],
  animations: [appModuleAnimation()]
})
export class MoviesComponent extends PagedListingComponentBase<MovieDto>{
  movies: MovieDto[] = [];  
  keyword = '';
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _moviesService: MovieServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createMovie(): void {
    this.showCreateOrEditMovieDialog()
  }

  editMovie(movie: MovieDto): void {
    this.showCreateOrEditMovieDialog(movie.id)
  }

  seeTrailer(movie: MovieDto): void {
    console.log("También funciona esta vuelta!", movie.title)
  }
  
  setAsView(movie: MovieDto){
    console.log("Desde acá debo llamar al elemento movie seen.html")
    this.showSetAsViewMovieDialog(movie.id);
  }

  clearFilters(): void {
    this.keyword = '';
    this.getDataPage(1);
  }

  protected list(
    request: PagedMoviesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._moviesService
      .getAll(
        request.keyword,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: MovieDtoPagedResultDto) => {
        this.movies = result.items,
          this.showPaging(result, pageNumber);
      });
  }

  protected delete(movie: MovieDto): void {
    abp.message.confirm(
      this.l('MovieDeleteWarningMessage', movie.title),
      undefined,
      (result: boolean) => {
        if (result) {
          this._moviesService.delete(movie.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditMovieDialog(id?: number) {
    let createOrEditeMovieDialog: BsModalRef;
    if (!id) {
        createOrEditeMovieDialog = this._modalService.show(
          CreateMovieDialogComponent,
          {
            class: 'modal-lg',
          }
        );
    }else{
      createOrEditeMovieDialog = this._modalService.show(
        EditMovieDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          }
        }
      );
    }

    createOrEditeMovieDialog.content.onSave.subscribe(() => {
      this.refresh();
    })
  }

  private showSetAsViewMovieDialog(id?: number){
    let setAsViewMovie: BsModalRef;
    if (!id) {
      console.log("La película no existe");
      this._modalService.show(alert)
    }else{
      setAsViewMovie = this._modalService.show(
        CreateMovieSeenDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            movieId: id,
          }
        }
      );
    }
    setAsViewMovie.content.onSave.subscribe(() => {
      this.refresh();
    })
  }
}
