export type MovieStatus = "available" | "unavailable" | "soon";

export enum MovieCertification {
  Everyone = 7,
  Teen = 12,
  Mature = 16,
  Adult = 18,
}

export enum MovieGenre {
  Action = "Action",
  Comedy = "Comedy",
  Drama = "Drama",
  Horror = "Horror",
  Thriller = "Thriller",
  Romance = "Romance",
  SciFi = "SciFi",
  // adicione outros conforme necessidade
}

export interface MovieProps {
  title: string;
  overview: string;
  status: MovieStatus;
  certification: MovieCertification;
  genre: MovieGenre;
  runtime: number;
}

export class Movie {
  public readonly id?: number; // Opcional no construtor
  public title: string;
  public overview: string;
  public status: MovieStatus;
  public certification: MovieCertification;
  public genre: MovieGenre;
  public runtime: number;

  constructor(props: MovieProps, id?: number) {
    this.id = id;
    this.title = props.title;
    this.overview = props.overview;
    this.status = props.status;
    this.certification = props.certification;
    this.genre = props.genre;
    this.runtime = props.runtime;
  }
}
