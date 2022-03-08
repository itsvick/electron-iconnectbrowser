import { Component, OnInit } from '@angular/core';
import { indexOf } from 'lodash';

@Component({
  selector: 'app-side-panel-layout',
  templateUrl: './side-panel-layout.component.html',
  styleUrls: ['./side-panel-layout.component.scss']
})
export class SidePanelLayoutComponent implements OnInit {

  navItems: any[];
  hasSearch = false;
  searchPhrase = null;
  searchItems = null;
  searchTags = null;
  paperItems = null;
  headerSubtitle: any;

  profileImage = 'assets/images/Group-817@2x.png';
  profileName = 'Leo Phakati';
  headerTitle = 'My subjects';
  viewingVideo = true;

  profileHasSubjects: boolean;

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
    {
      viewValue: 'abc',
      value: 'abc'
    },
    {
      viewValue: 'def',
      value: 'def'
    },
    {
      viewValue: 'ghi',
      value: 'ghi'
    }
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

  // simpleHeader = true;
  simpleHeader = false;
  // headerSubtitle: { text: string; status: string; };

  constructor() { }

  ngOnInit() {
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
    this.viewingPaper = true;
    this.constructPageData('paper');

    this.headerTitle = 'My subjects';
    this.headerSubtitle = {
      text: 'Standard plan',
      status: 'pink'
    };
  }
}
