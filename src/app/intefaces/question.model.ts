export interface ITask {
  id: number;
  question: string;
  description: string; // описание задачи\вопроса
  prevDifficulty?: number[]; // вопрос по теме, но полегче
  nextDifficulty?: number[]; // вопрос по теме, но потруднее
  answer: {
    link?: string[]; // ссылка на ресурс
    text: string[]; // самописный ответ
    code?: string[]; // код
  };
  type: 'question' | 'exercise';
  difficulty: 'beginner' | 'junior' | 'middle' | 'senior'; // сложность вопроса
  competence: string[]; // тема, например Общие вопросы, javascript, react
  popularity: string; // популярность вопроса
}
