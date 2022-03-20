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
  ];

  defaultValue1 = 'Content';
  defaultValue2 = 'Difficulty';
  defaultValue3 = 'Questions';

  contentSelection = {
    title: 'Conet',
    options: []
  };
  


  // simpleHeader = true;
  simpleHeader = false;
  // headerSubtitle: { text: string; status: string; };

  constructor() { }

  ngOnInit() {
    // this.fakeSearchActived();



    if (this.hasSearch && !this.simpleHeader) {
      this.constructPageData('search');
    }

    if (this.viewingPaper && !this.simpleHeader) {
      this.constructPageData('paper');
    }
  }

  constructPageData(page) {
  }

  killSession() {
    console.log('He\'s dead, jim!');
  }

  fakeSearchActived() {
  }

  populateSearchTags(searchPhrase) {
    return '';
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

  clearSearch() {}
}
