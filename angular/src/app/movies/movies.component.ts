import { Component, OnInit, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import { MovieDto, MovieServiceProxy } from '@shared/service-proxies/service-proxies';

class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent extends PagedListingComponentBase<MovieDto>{
  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    throw new Error('Method not implemented.');
  }
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

  protected delete(movie: MovieDto): void {
    abp.message.confirm(
      this.l('MovieDeleteWarningMessage', movie.movieName),
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
