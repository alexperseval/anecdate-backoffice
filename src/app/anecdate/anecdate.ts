import { Quiz } from "./quiz";

export interface Anecdate {
    id: number;
    status: string;
    title: string;
    date: string;
    idCategory: number;
    description: string;
    sources: string;
    idQuiz: number;
    creation_date: string;
    likes: number;
    dislikes: number;
    idAuthor: number;
    image: string;
    year: string;
    quiz: Quiz;
}