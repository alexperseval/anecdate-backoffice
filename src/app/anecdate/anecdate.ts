import { Quiz } from "./quiz";

export interface Anecdate {
    id: number;
    status: string;
    title: string;
    date: string;
    idCategory: number;
    category: string;
    description: string;
    sources: string;
    idQuiz: number;
    creation_date: string;
    likes: number;
    dislikes: number;
    idAuthor: string;
    image: string;
    year: string;
    quiz: Quiz;
}