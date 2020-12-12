import { Component, OnInit, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
  MovieSeenServiceProxy,
  Movie_SeenDto,
  CreateMovie_SeenDto,
  Movie_SeenDtoPagedResultDto
} from '@shared/service-proxies/service-proxies'

class PagedMovieSeenRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-movies-seen',
  templateUrl: './movies-seen.component.html',
  styleUrls: ['./movies-seen.component.css'],
  animations: [appModuleAnimation()],
})

export class MoviesSeenComponent extends PagedListingComponentBase<Movie_SeenDto> {
  movies_seen: Movie_SeenDto[] = [];
  keyword = '';
  advancedFilterVisible = false;

  constructor(
    injector: Injector,
    private _movieSeenService: MovieSeenServiceProxy,
    private _modalService: BsModalRef,
  ) { 
    super(injector);
  }

  // ngOnInit(): void {
  // }

  clearFilters(): void {
    this.keyword = '';
    this.getDataPage(1);
  }

 protected list(
   request: PagedMovieSeenRequestDto,
   pageNumber: number,
   finishedCallback: Function,
 ): void{
   request.keyword = this.keyword;

   this._movieSeenService
   .getAllMovies()
   .pipe(
     finalize(() => {
       finishedCallback();
     })
   )
   .subscribe((result: Movie_SeenDtoPagedResultDto) => {
     this.movies_seen = result.items,
     this.showPaging(result, pageNumber);
   })
 }

  protected delete(movie: Movie_SeenDto): void {
    abp.message.confirm(
      this.l('MovieDeleteWarningMessage', movie.titleMovie),
      undefined,
      (result: boolean) => {
        if (result) {
          this._movieSeenService.delete(movie.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

}
