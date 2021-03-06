import { CommonModule } from "@angular/common";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { throwIfAlreadyLoaded } from "../shared/module-import.guard";
import { VacancyDialogComponent } from "./vacancy-dialog/vacancy-dialog.component";
import { VacancyListComponent } from "./vacancy-list.component";
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

const routes: Routes = [
  {
    path: "",
    component: VacancyListComponent,
  },
];

@NgModule({
  declarations: [VacancyListComponent, VacancyDialogComponent],
  imports: [
    RouterModule.forChild(routes),
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinnerModule
  ],

  entryComponents: [VacancyDialogComponent],
})
export class VacancyModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: VacancyModule
  ) {
    throwIfAlreadyLoaded(parentModule, "VacancyModule");
  }
}
