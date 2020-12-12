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
import { CreateMovieSeenDialogComponent } from './create-movieSeen/create-movieSeen-dialog.component';

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
    private _modalService: BsModalService,
  ) { 
    super(injector);
  }

  editMovieSeen(){
    console.log("También funciono, btnEditar")
  }

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

  private showCreateOrEditMovieSeenDialog(id?: number){
    let createOrEditMovieSeeDialog: BsModalRef;
    if (!id) {
      console.log("NO se ha mandalo la película");
    }else{
      createOrEditMovieSeeDialog = this._modalService.show(
        CreateMovieSeenDialogComponent,
        {
          class: 'modal-lg'
        }
      );
    }
    createOrEditMovieSeeDialog.content.onSave.subscribe(() => {
      this.refresh();
    })
  }

}
