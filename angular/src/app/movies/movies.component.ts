import { Component, OnInit, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import { MovieDto, MovieDtoPagedResultDto, MovieServiceProxy } from '@shared/service-proxies/service-proxies';
import { result } from 'lodash-es';

class PagedMoviesRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  animations: [appModuleAnimation]
})
export class MoviesComponent extends PagedListingComponentBase<MovieDto>{
  // protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
  //   throw new Error('Method not implemented.');
  // }
  movies: MovieDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _moviesService: MovieServiceProxy,
    private _modalService: BsModalService
  ) { 
    super(injector);
  }

  ngOnInit(): void {
  }

  clearFilters(): void{
    this.keyword = '';
    //this.isActive = undefined,
    this.getDataPage(1);
  }

  protected list(
    request: PagedMoviesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive =  this.isActive;

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
      this.showPaging(result,pageNumber);
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

}
