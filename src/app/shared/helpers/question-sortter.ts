import { QuestionItemModel } from '@app/modules/papers/question-list-items/question-item.model';
import { Question } from '@models/entities';

export function sortQuestions(questions: Array<Question>) {
  const join = groups => groups.join('.');
  const split = number => number.match(/(\d{1,}|[a-zA-Z]{1,})/g);
  const padNumber = (n, pad) => (isNaN(+n) ? n : +n + pad);

  const questionMap = new Map(
    questions.map(question => {
      return [question.idCode, question];
    }),
  );

  const paddedNumber = questions.map(question => {
    const questionGroups = split(question.questionNumber);
    const questionNumber = join(questionGroups.map(n => padNumber(n, 10000)));
    return { idCode: question.idCode, questionNumber };
  });

  return paddedNumber
    .sort((a, b) => {
      return a.questionNumber > b.questionNumber
        ? 1
        : a.questionNumber === b.questionNumber
          ? 0
          : -1;
    })
    .map(question => {
      return questionMap.get(question.idCode);
    });
}

export function sortQuestionItems(questions: Array<QuestionItemModel>) {
  const join = groups => groups.join('.');
  const split = number => number.match(/(\d{1,}|[a-zA-Z]{1,})/g);
  const padNumber = (n, pad) => (isNaN(+n) ? n : +n + pad);

  const questionMap = new Map(
    questions.map(question => {
      return [question.idCode, question];
    }),
  );

  const paddedNumber = questions.map(question => {
    const questionGroups = split(question.questionNumber);
    const questionNumber = join(questionGroups.map(n => padNumber(n, 10000)));
    return { idCode: question.idCode, questionNumber };
  });

  return paddedNumber
    .sort((a, b) => {
      return a.questionNumber > b.questionNumber
        ? 1
        : a.questionNumber === b.questionNumber
          ? 0
          : -1;
    })
    .map(question => {
      return questionMap.get(question.idCode);
    });
}
