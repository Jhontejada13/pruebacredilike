import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
  MovieDto,
  MovieDtoPagedResultDto,
  MovieServiceProxy
} from '@shared/service-proxies/service-proxies';

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

  // ngOnInit(): void {
  // }

  createMovie(): void {
    console.log("Estoy funcionando")
  }

  editMovie(movie: MovieDto): void {
    console.log("También funciono")
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

  private showCreateOrEditMovie(id?: number) {
    let createOrEditeMovieDialog: BsModalRef;
    if (!id) {

    }
  }

}
