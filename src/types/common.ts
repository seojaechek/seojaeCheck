export interface Book {
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
}

export type bookInfo = {
  authors: string[],
  contents: string,
  publisher: string,
  title: string,
  translators: string[],
  url: string,
  isbn: string,
  thumbnail: string
}
