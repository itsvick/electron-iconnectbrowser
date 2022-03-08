import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@api/services/auth.service';
import { GeneralService } from '@api/services/general.service';
import { GradeService } from '@api/services/grade.service';
import { SchoolService } from '@api/services/school.service';
import { SubjectsService } from '@api/services/subjects.service';
import { UserTypeService } from '@api/services/user-type.service';
import { UserService } from '@api/services/user.service';
import { School, Grade, User, Subject, Class } from '@models/entities';
import { AbstractBaseComponent } from '@shared/abstracts/abstract-base-component';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { PaginatedResult } from '@shared/models/pagination';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent extends AbstractBaseComponent implements OnInit {
  profileForm: FormGroup;
  monitorForm: FormGroup;

  unsupportedUserTypes = [4, 5, 6, 7, 8];
  userTypes: { id: number; name: string; checked: boolean }[];
  schools = new BehaviorSubject<Partial<School>[]>(null);
  subjects = new BehaviorSubject<Partial<Subject>[]>(null);
  grades = new BehaviorSubject<Partial<Grade>[]>(null);
  classes = new BehaviorSubject<Partial<Class>[]>(null);
  $resetGrade = new BehaviorSubject<any>(null);
  $resetClass = new BehaviorSubject<any>(null);

  user: User;
  monitor: User;

  submitting = false;

  get activeUserType() {
    if (this.userTypes) {
      return this.userTypes.find((ut) => ut.checked).id;
    } else {
      return null;
    }
  }

  get shouldHaveSchool() {
    return [1, 3, 6, 7].includes(this.activeUserType);
  }

  constructor(
    private userTypeService: UserTypeService,
    private authService: AuthService,
    private userService: UserService,
    private schoolService: SchoolService,
    private formBuilder: FormBuilder,
    private generalService: GeneralService,
    private subjectService: SubjectsService,
    private gradeService: GradeService,
    private dialog: MatDialog
  ) { 
    super();
  }

  ngOnInit() {
    this.isLoading = true;
    this.userTypeService.getAll().subscribe((userTypes) => {
      const supportedUserTypes = userTypes.filter((ut) => !this.unsupportedUserTypes.includes(ut.id));
      this.userTypes = supportedUserTypes.map((ut) => {
        return {
          id: ut.id,
          name: ut.type,
          checked: false,
        };
      });
      const userID = this.authService.token.id;
      if (userID) {
        this.userService.getById(userID).subscribe((user) => {
          this.user = user;
          this.searchSchools();
          if (user.monitorId) {
            this.userService.getById(user.monitorId).subscribe((monitor) => {
              this.monitor = monitor;
              this.initProfileForm(this.user);
              this.initMonitorForm(this.monitor);
              this.showContent = true;
            });
          } else {
            this.monitor = {} as User;
            this.initProfileForm(this.user);
            this.initMonitorForm(this.monitor);
            this.showContent = true;
          }
        });
      }
    });
  }

  changeUserType(newUserType: number) {
    if (this.userTypes) {
      this.userTypes.forEach((ut) => (ut.id === newUserType ? (ut.checked = true) : (ut.checked = false)));
      if (this.profileForm && this.profileForm.get('userTypeId')) {
        this.profileForm.get('userTypeId').setValue(this.activeUserType);
      }
    }
  }

  initProfileForm(model: User) {
    this.profileForm = this.formBuilder.group({
      firstName: [model.firstName ? model.firstName : null],
      lastName: [model.lastName ? model.lastName : null],
      email: [model.email ? model.email : null,
        [Validators.pattern(this.emailRegex)]],
      phoneNumber: [model.phoneNumber ? model.phoneNumber : null,
        [Validators.pattern(this.mobileRegex)]],
      userTypeId: [model.userTypeId ? model.userTypeId : null],
      dataShare: [model.dataShare ? model.dataShare : false],
      school: [model.school],
      grade: [model.grade],
      class: [model.class],
    });

    if (model.redirectTypeId === 5) {
      this.profileForm.markAllAsTouched();
    }

    this.changeUserType(model.userTypeId);
    this.searchClasses(this.profileForm);
  }

  initMonitorForm(model: User) {
    this.monitorForm = this.formBuilder.group({
      firstName: [{
        value: model.firstName ? model.firstName : null,
        disabled: true
      }],
      email: [{ value: model.email ? model.email : null, disabled: true },
        Validators.pattern(this.emailRegex)],
    });
  }

  setValidator(control, validators: Validators[]) {
    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  update() {
    this.setValidator(this.profileForm.get('firstName'), [Validators.required]);
    this.setValidator(this.profileForm.get('lastName'), [Validators.required]);
    if (this.shouldHaveSchool) {
      this.setValidator(this.profileForm.get('school'), [Validators.required]);
    }
    this.setValidator(this.profileForm.get('email'), [Validators.pattern(this.emailRegex)]);
    this.setValidator(this.profileForm.get('phoneNumber'), [Validators.pattern(this.mobileRegex)]);

    this.profileForm.markAllAsTouched();

    if (!this.profileForm.valid) {
      return;
    }

    this.submitting = true;

    this.userService.update(this.user.id, this.profileForm.getRawValue())
      .subscribe((result) => {
        // this.headerService.loadUser();
        this.generalService.showToast(`Your profile has been updated.`);
        this.submitting = false;
      }, error => this.handleError(error));
  }

  handleError(httpError: any) {
    if (httpError.status >= 400) {
      for (const error of httpError.error.errors) {
        if (error.field === 'email') {
          this.generalService.showToast('A user with this email address is already registered');
        }
        if (error.field === 'phone_number') {
          this.generalService.showToast('A user with this phone number is already registered');
        }
      }
    }
    this.submitting = false;

  }

  getSchools() {
    return this.schools;
  }

  searchSchools(phrase?: string, form?: FormGroup) {
    return this.schoolService
      .getAllPaginated({
        attributes: ['id', 'name'],
        page: 1,
        pageSize: 15,
        sortColumn: 'asc',
        sortDirection: 'asc',
        search: {
          columns: ['name'],
          text: phrase ? phrase.toLowerCase() : null,
          table: 'school',
        },
      })
      .subscribe((result: PaginatedResult<Partial<School>>) => {
        this.schools.next(result.rows);
        if (form) {
          form.get('grade').setValue(null);
          this.$resetGrade.next(true);
          this.searchGrades(form);
        } else {
          this.searchGrades();
        }
      });
  }

  getSubjects() {
    return this.subjects;
  }

  searchSubjects() {
    return this.subjectService.getAllPaginated().subscribe((result: PaginatedResult<Partial<School>>) => {
      this.subjects.next(result.rows);
    });
  }

  getGrades() {
    return this.grades;
  }

  searchGrades(form?: FormGroup) {
    return this.gradeService.getAllPaginated().subscribe((result: PaginatedResult<Partial<Grade>>) => {
      this.grades.next(result.rows);
      if (form) {
        form.get('class').setValue(null);
        this.$resetClass.next(true);
        this.searchClasses(form);
      } else {
        this.searchClasses(this.profileForm);
      }
    });
  }

  getClasses() {
    return this.classes;
  }

  searchClasses(currentForm: FormGroup) {
    const school = currentForm.get('school').value as School;
    if (school && school.classes && school.classes.length > 0) {
      this.classes.next(school.classes);

      const grade = currentForm.get('grade').value as Grade;
      if (grade) {
        const tempClasses = this.getClasses().value;
        const newClasses = tempClasses.filter((c) => c.gradeId === grade.id);
        this.classes.next(newClasses);
      }
    } else {
      this.classes.next([]);
    }
  }

  onDataShareChange(event: MatCheckboxChange): void {
    if (!event.checked && this.user.dataShare && this.user.verified) {
      const dialogResult = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'Are you sure?',
          message: 'Disabling this will cause you to loss access to your schools premium subjects.',
          positiveText: 'Yes',
          negativeText: 'No'
        }
      });

      dialogResult.afterClosed().subscribe(value => {
        if (!value) {
          this.profileForm.get('dataShare').setValue( true);
        }
      });
    }
  }
}

