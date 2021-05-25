export interface ITask {
  id: number;
  question: string;
  description?: string; // описание задачи\вопроса
  prevDifficulty?: number; // вопрос по теме, но полегче
  nextDifficulty?: number; // вопрос по теме, но потруднее
  answer: {
    link?: string[]; // ссылка на ресурс
    text?: string; // самописный ответ + код для задач
    code?: string[]; // код
    wrong?: string[]; // неправильные ответы на вопрос для заданий с селектом
  };
  type: 'question' | 'exercise';
  difficulty: 'beginner' | 'junior' | 'middle' | 'senior'; // сложность вопроса
  competence: string[]; // тема, например Общие вопросы, javascript, react
  popularity: string; // популярность вопроса
}
