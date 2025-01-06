export type Book = {
  authors: string[];
  contents: string;
  publisher: string;
  title: string;
  translators: string[];
  url: string;
  isbn: string;
  thumbnail: string;
  datetime?: string;
};

export interface likedBook {
  title: string;
  isbn: string;
  thumbnail: string;
}
