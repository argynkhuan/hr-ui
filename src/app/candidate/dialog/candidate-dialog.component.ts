import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CandidateService } from "src/app/service/candidate.service";
import { Candidate } from "../candidate.model";
import { Vacancy } from 'src/app/vacancy/vacancy.model';

@Component({
  selector: "app-candidate-dialog",
  templateUrl: "./candidate-dialog.component.html",
  styleUrls: ["./candidate-dialog.component.css"],
})
export class CandidateDialogComponent implements OnInit {
  form: FormGroup;
  error = null;
  @Input() model: Candidate;
  @Input() vacancy: Vacancy;

  constructor(
    private candidateService: CandidateService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.form.patchValue(this.model);
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: null,
      fullName: [null, Validators.required],
      email: [null, Validators.required],
      phoneNumber: [null],
      resume: [null, Validators.required],
    });
  }

  doSave() {
    if (this.form.value.id) {
      this.candidateService
        .update(this.form.value.id, this.form.value)
        .subscribe((result) => this.activeModal.close({ action: "save" }));
    } else {
      this.candidateService
        .create(this.form.value)
        .subscribe((result) => this.activeModal.close({ action: "save" }));
    }
  }
}
