BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "genero" (
	"id"	INTEGER,
	"nome"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "filme_genero" (
	"id_filme"	INTEGER,
	"id_genero"	INTEGER,
	PRIMARY KEY("id_filme","id_genero"),
	FOREIGN KEY("id_genero") REFERENCES "genero"("id"),
	FOREIGN KEY("id_filme") REFERENCES "filme"("id")
);
CREATE TABLE IF NOT EXISTS "sala" (
	"num_sala"	INTEGER,
	"capacidade"	INTEGER,
	"status"	TEXT CHECK("status" IN ('INATIVO', 'ATIVO')),
	PRIMARY KEY("num_sala" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "classificacao" (
	"id"	INTEGER,
	"descricao"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "filme" (
	"id"	INTEGER,
	"titulo"	TEXT,
	"sinopse"	TEXT,
	"duracao"	TEXT CHECK("duracao" GLOB '[0-5][0-9]:[0-5][0-9]:[0-5][0-9]'),
	"status"	TEXT CHECK(("status" IN ('EM_CARTAZ', 'EM_BREVE', 'ARQUIVADO'))),
	"id_classificacao"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "exibicao_sala" (
	"id_filme"	INTEGER,
	"numero_sala"	INTEGER,
	"data"	TEXT CHECK("data" GLOB '[0-3][0-9]/[0-1][0-9]/[1-2][0-9][0-9][0-9]'),
	"hora"	INTEGER CHECK("hora" GLOB '[0-2][0-9]:[0-5][0-9]:[0-5][0-9]'),
	FOREIGN KEY("id_filme") REFERENCES "filme"("id"),
	FOREIGN KEY("numero_sala") REFERENCES "sala"("num_sala"),
	PRIMARY KEY("id_filme","numero_sala")
);
INSERT INTO "genero" VALUES (111,'Aventura');
INSERT INTO "genero" VALUES (112,'Ação');
INSERT INTO "genero" VALUES (113,'Comédia');
INSERT INTO "genero" VALUES (114,'Drama');
INSERT INTO "genero" VALUES (115,'Documentário');
INSERT INTO "genero" VALUES (116,'Ficção Científica');
INSERT INTO "genero" VALUES (117,'Animação');
INSERT INTO "genero" VALUES (118,'Fantasia');
INSERT INTO "genero" VALUES (119,'Suspense');
INSERT INTO "genero" VALUES (120,'Faroeste');
INSERT INTO "genero" VALUES (121,'Terror');
INSERT INTO "genero" VALUES (122,'Romance');
INSERT INTO "genero" VALUES (123,'Policial');
INSERT INTO "genero" VALUES (124,'Bollywood');
INSERT INTO "genero" VALUES (125,'Espionagem');
INSERT INTO "genero" VALUES (126,'Indie');
INSERT INTO "genero" VALUES (127,'Musical');
INSERT INTO "genero" VALUES (128,'Erótico');
INSERT INTO "genero" VALUES (129,'Família');
INSERT INTO "genero" VALUES (130,'Mágico');
INSERT INTO "genero" VALUES (131,'Thriller');
INSERT INTO "genero" VALUES (132,'Cult');
INSERT INTO "genero" VALUES (133,'Distopia');
INSERT INTO "filme_genero" VALUES (1,112);
INSERT INTO "filme_genero" VALUES (1,118);
INSERT INTO "filme_genero" VALUES (1,117);
INSERT INTO "filme_genero" VALUES (2,113);
INSERT INTO "filme_genero" VALUES (2,122);
INSERT INTO "sala" VALUES (1,50,'ATIVO');
INSERT INTO "sala" VALUES (2,60,'ATIVO');
INSERT INTO "sala" VALUES (3,60,'ATIVO');
INSERT INTO "sala" VALUES (4,60,'ATIVO');
INSERT INTO "sala" VALUES (5,60,'ATIVO');
INSERT INTO "sala" VALUES (6,60,'ATIVO');
INSERT INTO "sala" VALUES (7,70,'ATIVO');
INSERT INTO "sala" VALUES (8,70,'ATIVO');
INSERT INTO "classificacao" VALUES (1,'Não recomendado para menores de 10 anos');
INSERT INTO "classificacao" VALUES (2,'Livre para todos os públicos');
INSERT INTO "classificacao" VALUES (3,'Não recomendado para menores de 12 anos');
INSERT INTO "classificacao" VALUES (4,'Não recomendado para menores de 14 anos');
INSERT INTO "classificacao" VALUES (5,'Não recomendado para menores de 16 anos');
INSERT INTO "classificacao" VALUES (6,'Não recomendado para menores de 18 anos');
INSERT INTO "filme" VALUES (1,'Demon Slayer - Mugen Train: O Filme','Em Demon Slayer - Mugen Train, durante o período Taisho no Japão, o jovem Tanjiro volta para casa depois de um dia de trabalho e encontra sua família brutalmente assassinada por um demônio. Para pior a situação, sua irmã mais jovem, Nezuko, foi transformada em uma criatura demoníaca. Agora ele precisará lutar para vingar sua família e recuperar a irmã.','02:00:00','EM_CARTAZ',3);
INSERT INTO "filme" VALUES (2,'Legalmente Loira','Elle Woods namora o mais bonito garoto de seu colégio, Warner Huntington III, e planeja casar com ele no futuro. O grande problema é que Warner considera Elle muito fútil. Ele decide estudar Direito na Universidade de Harvard, termina o relacionamento com Elle e começa a namorar uma nova garota. Elle não se dá por vencida e decide estudar a fim de também passar para o curso de Direito e ainda por cima provar sua inteligência.','01:45:00','EM_BREVE',2);
INSERT INTO "exibicao_sala" VALUES (1,NULL,NULL,NULL);
INSERT INTO "exibicao_sala" VALUES (1,3,'22/07/2025','17:45:00');
INSERT INTO "exibicao_sala" VALUES (1,7,'22/07/2025','21:00:00');
CREATE VIEW vw_filmes_em_cartaz AS
SELECT
    f.titulo AS nome_filme,
    GROUP_CONCAT(g.nome, ', ') AS generos,
    f.duracao,
    c.descricao AS classificacao
FROM FILME f
JOIN CLASSIFICACAO c
    ON f.id_classificacao = c.id
LEFT JOIN FILME_GENERO fg
    ON f.id = fg.id_filme
LEFT JOIN GENERO g
    ON fg.id_genero = g.id
WHERE f.status = 'EM_CARTAZ'
GROUP BY f.id, f.titulo, f.duracao, c.descricao;
CREATE VIEW vw_filmes_em_breve AS
SELECT
    f.titulo AS nome_filme,
    GROUP_CONCAT(g.nome, ', ') AS generos,
    f.duracao,
    c.descricao AS classificacao
FROM FILME f
JOIN CLASSIFICACAO c
    ON f.id_classificacao = c.id
LEFT JOIN FILME_GENERO fg
    ON f.id = fg.id_filme
LEFT JOIN GENERO g
    ON fg.id_genero = g.id
WHERE f.status = 'EM_BREVE'
GROUP BY f.id, f.titulo, f.duracao, c.descricao;
COMMIT;
