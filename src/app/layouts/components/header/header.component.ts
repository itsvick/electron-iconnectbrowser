import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@api/services/auth.service';
import { UiHelperService } from '@app/services/ui-helper.service';
import { AbstractBaseComponent } from '@shared/abstracts/abstract-base-component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends AbstractBaseComponent implements OnInit {

  @Input() $simpleHeader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  paperIds: number[];

  navItems: any[];
  hasSearch = false;
  searchPhrase = null;
  searchItems = null;
  searchTags = null;
  paperItems = null;

  profileImage = null;
  profileName = '';
  headerTitle = 'My subjects';
  headerSubtitle = {
    text: 'Standard plan',
    status: 'pink'
  };

  viewingPaper = true;

  selectItems = [
    {
      viewValue: 'Content',
      value: 'Content'
    },
    {
      viewValue: 'Difficulty',
      value: 'Difficulty'
    },
    {
      viewValue: 'Questions',
      value: 'Questions'
    },
  ];

  defaultValue1 = 'Content';
  defaultValue2 = 'Difficulty';
  defaultValue3 = 'Questions';

  contentSelection = {
    title: 'Content',
    options: [
      {
        value: '1',
        name: 'Exam papers',
      },
      {
        value: '2',
        name: 'Lessons',
      }
    ]
  };
  difficultySelection = {
    title: 'Difficulty',
    options: [
      {
        value: '1',
        name: 'Difficulty 1',
      },
      {
        value: '2',
        name: 'Difficulty 1',
      },
      {
        value: '3',
        name: 'Difficulty 3',
      }
    ]
  };
  questionsSelection = {
    title: 'Questions',
    options: [
      {
        value: '1',
        name: 'Question 1',
      },
      {
        value: '2',
        name: 'Question 2',
      }
    ]
  };
  simpleHeader: boolean;

  get myPaperIds(): number[] {
    if (this.uiHelper && this.uiHelper.$myPapers && this.uiHelper.$myPapers.value) {
      return this.uiHelper.$myPapers.value.map(p => p.paperId)
    }

    return null;
  }

  constructor(
    private authService: AuthService,
    private uiHelper: UiHelperService,
    private http: HttpClient
  ) {
    super(http)
    if (this.authService.token) {
      this.profileName = `${this.authService.token.firstName} ${this.authService.token.lastName}`;
      // set prfile image if implemented
      // profileImage = './../../../assets/images/Group-817@2x.png';
    }
  }

  ngOnInit() {
    this.$simpleHeader.subscribe(sh => {
      this.simpleHeader = sh;
    });

    this.authService.isOnline.subscribe(online => {
      this.isOnline = online;
    })
    // this.fakeSearchActived();

    this.navItems = [{
      icon: 'insert_drive_file',
      title: 'My subjects',
      path: ''
    },
    {
      icon: 'crop_free',
      title: 'Resources',
      path: ''
    },
    {
      icon: 'person',
      title: 'Account',
      path: ''
    },
    {
      icon: 'info',
      title: 'About Papervideo',
      path: ''
    },
    {
      icon: 'help',
      title: 'FAQ',
      path: ''
    }];

    if (this.hasSearch && !this.simpleHeader) {
      this.constructPageData('search');
    }

    if (this.viewingPaper && !this.simpleHeader) {
      this.constructPageData('paper');
    }
  }

  constructPageData(page) {
    if (page === 'search') {
      this.headerTitle = 'Search results for "' + this.searchPhrase + '"';
      this.headerSubtitle = {
        text: '7 Questions found',
        status: 'pink'
      };

      this.searchItems = [
        {
          id: 0,
          title: 'Question title',
          description: 'lorem ipsum a whole lot of dummy data here bro how you like them apples?'
        },
        {
          id: 1,
          title: 'Question title',
          description: 'lorem ipsum a whole lot of dummy data here bro how you like them apples?'
        },
        {
          id: 2,
          title: 'Question title',
          description: 'lorem ipsum a whole lot of dummy data here bro how you like them apples?'
        },
        {
          id: 3,
          title: 'Question title',
          description: 'lorem ipsum a whole lot of dummy data here bro how you like them apples?'
        },
        {
          id: 4,
          title: 'Question title',
          description: 'lorem ipsum a whole lot of dummy data here bro how you like them apples?'
        },
        {
          id: 5,
          title: 'Question title',
          description: 'lorem ipsum a whole lot of dummy data here bro how you like them apples?'
        }
      ];
    }

    if (page === 'paper') {
      this.headerTitle = 'Paper 2';
      this.headerSubtitle = {
        text: 'Estimated time: 3 hours',
        status: 'standard'
      };

      this.paperItems = [
        {
          id: 0,
          title: 'Question title',
          description: 'Exam paper 2'
        },
        {
          id: 1,
          title: 'Question title',
          description: 'Exam paper 2'
        },
        {
          id: 2,
          title: 'Question title',
          description: 'Exam paper 2'
        },
        {
          id: 3,
          title: 'Question title',
          description: 'Exam paper 2'
        },
        {
          id: 4,
          title: 'Question title',
          description: 'Exam paper 2'
        },
        {
          id: 5,
          title: 'Question title',
          description: 'Exam paper 2'
        }
      ];
    }
  }

  killSession() {
    console.log('He\'s dead, jim!');
  }

  fakeSearchActived() {
    this.hasSearch = true;
    this.searchPhrase = 'Algebra';

    if (this.searchPhrase.length > 0) {
      this.populateSearchTags(this.searchPhrase);
    }
  }

  populateSearchTags(searchPhrase) {
    const listOfTags = ['Graphs', 'Equations'];

    this.searchTags = listOfTags.map(newTag => {
      return searchPhrase + ' ' + newTag;
    });
  }

  removeTagFromSearch(tag) {
    const index = this.searchTags.indexOf(tag);
    if (index > -1) {
      this.searchTags.splice(index, 1);
    }

    if (this.searchTags.length === 0) {
      this.clearSearch();
    }
  }

  clearSearch() {
    this.hasSearch = false;
    this.searchPhrase = null;
    this.searchItems = null;

    this.headerTitle = 'My subjects';
    this.headerSubtitle = {
      text: 'Standard plan',
      status: 'pink'
    };
  }

  profileSettings(): void {
    // const dialogRef = this.dialog.open(ProfileSettingsComponent, {
    //   width: '636px',
    //   height: '766px',
    //   data: { name: this.profileName }
    // });
  }
}
