BEGIN;

-- Attention !!! Avant de lancer ce script, créer manuellement 3 utilisateurs en bdd au minimum dont un utilisateur avec le role instructor en id 2 
-- Exemple : créé un user avec un role admin, il aura comme id 1 / puis un avec un role instructor, il aura comme id 2 /puis un avec un role member, il aura comme id 3
-- La solution pour injecter des nouveaux utilisateurs avec ce script serait de faire un bcrypt directement depuis sequelize sur le password du modèle User

INSERT INTO "lesson" ("title",  "description", "user_id") VALUES
('cours1', 'petite description1', 2),
('cours2', 'petite description2', 2),
('cours3', 'petite description3', 2),
('cours4', 'petite description4', 2),
('cours5', 'petite description5', 2);

INSERT INTO "comment" ("content", "lesson_id", "user_id") VALUES
('nul', 1, 3),
('trop bien', 2, 3),
('Au top ce cours', 2, 3);

INSERT INTO "step" ( "content", "lesson_id") VALUES
('content text 1', 1),
('content text 2', 3),
('content text 3', 5),
('content text 4', 5),
('content text 5', 5);

INSERT INTO "category" ("name") VALUES
('reparation'),
('bricolage');

INSERT INTO "rate" ("rate", "lesson_id", "user_id") VALUES
(1, 2, 1),
(2, 3, 2),
(3, 4, 2),
(4, 1, 3),
(5, 5, 3);

COMMIT;