import { Question, Paper } from '@models/entities';
export interface PaperItemModel {
  paperId: number;
  month: string;
  year: string;
  paperNo: string;
}
export interface QuestionItemModel {
  id: number;
  idCode: string;
  questionNumber: string;
  questionDescription: string;
  containsFormula: boolean;
  questionImage: string;
  memo: string;
  video1Id: number;
  video2Id: number;
  video3Id: number;
  paperId: number;
  questionCode: string;
  mark: number;
  isCompleted: boolean;
  isParent: boolean;
  isPreReq: boolean;
  subjectId: number;
  children: QuestionItemModel[];
}

export interface PaperListItem {
  paper: PaperItemModel;
  questions: QuestionItemModel[];
}
