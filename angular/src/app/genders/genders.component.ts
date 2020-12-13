import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
  GenderServiceProxy,
  GenderDto,
  GenderDtoPagedResultDto,
} from '@shared/service-proxies/service-proxies';
import { CreateGenderDialogComponent } from "./create-gender/create-gender-dialog.component";
import { EditGenderDialogComponent } from "./edit-gender/edit-gender-dialog.component";

class PagedGendersRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-genders',
  templateUrl: './genders.component.html',
  styleUrls: ['./genders.component.css']
})
export class GendersComponent extends PagedListingComponentBase<GenderDto> {
  genders: GenderDto[] = [];
  keyword = '';
  advancedFiltersVisible = false;


  constructor(
    injector: Injector,
    private _genderService: GenderServiceProxy,
    private _modalService: BsModalService
  ) { 
    super(injector);
  }

  createGender(): void{
    this.showCreateOrEditGenderDialog();
  }

  editGender(gender: GenderDto): void{
    this.showCreateOrEditGenderDialog(gender.id);
  }

  clearFilters(): void {
    this.keyword = '';
    this.getDataPage(1);
  }

  protected list(
    request: PagedGendersRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._genderService
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
    .subscribe((result: GenderDtoPagedResultDto) => {
      this.genders = result.items
      this.showPaging(result, pageNumber)
    })
  }

  protected delete(gender: GenderDto): void {
    abp.message.confirm(
      this.l('MovieDeleteWarningMessage', gender.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._genderService.delete(gender.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditGenderDialog(id?: number) {
    let createOrEditeGenderDialog: BsModalRef;
    if (!id) {
        createOrEditeGenderDialog = this._modalService.show(
          CreateGenderDialogComponent,
          {
            class: 'modal-lg',
          }
        );
    }else{
      createOrEditeGenderDialog = this._modalService.show(
        EditGenderDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          }
        }
      );
    }

    createOrEditeGenderDialog.content.onSave.subscribe(() => {
      this.refresh();
    })
  }


}
