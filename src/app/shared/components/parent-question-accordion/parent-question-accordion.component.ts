import { Component, Input, OnInit } from '@angular/core';
import { Question } from '@models/entities';
import { QuestionService } from '@api/services/question.service';

@Component({
  selector: 'app-parent-question-accordion',
  templateUrl: './parent-question-accordion.component.html',
  styleUrls: ['./parent-question-accordion.component.scss']
})
export class ParentQuestionAccordionComponent implements OnInit {

  @Input() parentQuestion: Question;
  @Input() condition = true;

  imageLoaded = false;

  constructor(
    private questionService: QuestionService
  ) {
  }

  ngOnInit() {
    if (typeof this.parentQuestion === 'number') {
      this.questionService.getById(this.parentQuestion).subscribe(value => {
        this.parentQuestion = value;
        this.loadImage();
      }, error => {
        console.log(error);
      });
    } else {
      this.loadImage();
    }


  }

  hasImage(question: Question): boolean {
    return this.imageLoaded && question && question.questionImage && question.questionImage !== '';
  }

  private loadImage() {
    if (typeof this.parentQuestion === 'object' && this.parentQuestion.questionImage) {
      this.questionService.getImage(this.parentQuestion.id).subscribe(value => {
        this.imageLoaded = true;
        // @ts-ignore
        this.parentQuestion.questionImage = value.url;
      });
    }
  }

}
