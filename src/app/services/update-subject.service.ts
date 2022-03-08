import { Injectable } from '@angular/core';
import { SubjectsService } from '@api/services/subjects.service';
import { Observable, Subject, EMPTY } from 'rxjs';
import { Subject as SubjectModel } from '@models/entities';
import { AuthService } from '@api/services/auth.service';
import { catchError } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class UpdateSubjectService {
  private readonly _subjects: Subject<SubjectModel[]>;

  get subjects(): Observable<SubjectModel[]> {
    return this._subjects;
  }

  constructor(private authService: AuthService, private subjectService: SubjectsService) {
    this._subjects = new Subject<SubjectModel[]>();
  }

  public loadMySubject() {
    this.subjectService.getMySubjects().subscribe({
      next: (subjects) => {
        this._subjects.next(subjects);
      },
      error: (err) => {
        this._subjects.next(null);
      },
    });
  }
}
