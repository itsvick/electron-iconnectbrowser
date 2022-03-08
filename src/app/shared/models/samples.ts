export interface SampleQuestion {
  questionNumber: number;
  questionDescription: string;
  videoUrl: string;
  jingleUrl: string;
  paperName: string;
}

export interface SampleLesson {
  name: string;
  completionTime: number;
  pdfUrl: string;
  videoUrl: string;
  jingleUrl: string;
  video: {
    videoBookmarks: [
      {
        videoBookmarkName: string;
        time: string;
      },
    ];
  };
}
