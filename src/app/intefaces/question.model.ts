export interface ITask {
  id: string; // систменый id
  tableIndex?: number; // используется в таблицах
  question: string; // основная часть вопроса
  description: string; // описание задачи\вопроса
  prevDifficulty?: {id: string, caption: 'string'}[]; // вопрос по теме, но полегче
  nextDifficulty?: {id: string, caption: 'string'}[]; // вопрос по теме, но потруднее
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
