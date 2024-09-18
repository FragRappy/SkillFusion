BEGIN;

-- INSERT INTO "user" ( "username", "email", "password") VALUES
--("Jean", "jean@instructor.fr", "Jean12345!")
--("Paul", "paul@instructor.fr", "Paul12345!")
--("Roger", "roger@instructor.fr", "Roger12345!")
--("Anne", "anne@instructor.fr", "Anne12345!")
--("Sophie", "Sophie@instructor.fr", "Sophie12345!")
--("Charles", "charles@instructor.fr", "Charles12345!")
--("Gabriel", "gabriel@instructor.fr", "Gabriel12345!")
--("Cihan", "cihan@instructor.fr", "Cihan12345!")
--("Yannis", "yannis@instructor.fr", "Yannis12345!")
--("Robin", "robin@instructor.fr", "Robin12345!")

INSERT INTO "category" ("name") VALUES
('Exterieur'),
('Intérieur'),
('Rangement'),
('Plomberie'),
('Électricité'),
('Maçonnerie'),
('Menuiserie'),
('Terrassement'),
('Jardinage'),
('Construction'),
('Décoration'),
('Peinture');

INSERT INTO "lesson" ("title", "description", "image", "video", "user_id") VALUES
('Comment peindre un mur comme un pro', 'Apprenez les techniques de base pour peindre vos murs comme un professionnel.', 'https://st.depositphotos.com/1765561/3004/i/600/depositphotos_30042823-stock-photo-painting-on-wall.jpg', 'https://youtu.be/dbPJ7u9ncoo', 2),
('Réparer une fissure dans un mur en plâtre', 'Découvrez comment réparer facilement une fissure dans un mur en plâtre.', 'https://st4.depositphotos.com/39002138/40931/i/600/depositphotos_409314904-stock-photo-plasterer-hand-repair-crack-white.jpg', 'https://youtu.be/zjxTjfFKFNA', 2),
('Installer un robinet de douche', 'Suivez ce tutoriel pour installer vous-même un robinet de douche dans votre salle de bain.', 'https://st2.depositphotos.com/36645990/42394/i/600/depositphotos_423945226-stock-photo-installing-faucet-plumber-fixing-water.jpg', 'https://youtu.be/hGmyJqbC-3c', 2),
('Changer un joint de robinet', "Économisez de l\'eau en remplaçant vous-même un joint défectueux de robinet.", 'https://st3.depositphotos.com/26539336/36337/i/600/depositphotos_363378956-stock-photo-rotary-nozzle-mixer-adjust-flow.jpg', 'https://youtu.be/vv_6a-lz5KE', 2),
('Installer un interrupteur électrique', 'Apprenez à installer un interrupteur électrique en toute sécurité.', 'https://st2.depositphotos.com/2030185/10542/i/600/depositphotos_105421392-stock-photo-wall-mounting-household-light-switch.jpg', 'https://youtu.be/ig3CKObBfJg', 2),
('Remplacer un disjoncteur électrique', 'Suivez ce guide pour remplacer un disjoncteur électrique défectueux dans votre tableau électrique.', 'https://st3.depositphotos.com/10591170/31911/i/600/depositphotos_319116848-stock-photo-large-shield-room-it-has.jpg', 'https://youtu.be/IDvgQRWwKVQ', 2),
('Créer un mur de briques apparentes', "Transformez l\'aspect de votre intérieur en créant un mur de briques apparentes.", 'https://st3.depositphotos.com/1037987/15658/i/600/depositphotos_156586356-stock-photo-open-plan-kitchen.jpg', 'https://youtu.be/YLGQmUSlIR0', 2),
('Poser du carrelage mural dans sa cuisine', 'Découvrez les étapes pour poser du carrelage mural dans votre cuisine comme un professionnel.', 'https://st2.depositphotos.com/4698743/11769/i/600/depositphotos_117695422-stock-photo-laying-ceramic-tiles.jpg', 'https://youtu.be/TCz7LMkqNKE', 2),
("Réparer une fuite d'eau sous l\'évier de la cuisine", "Apprenez à localiser et à réparer une fuite d'eau sous l'évier de votre cuisine.", 'https://st3.depositphotos.com/17499462/35836/i/600/depositphotos_358365256-stock-photo-adjustable-wrench-tap-gaskets-bathroom.jpg', 'https://youtu.be/foIo9dMTY7I', 2),
('Comment fabriquer une étagère en bois', 'Apprenez à fabriquer une étagère en bois pour votre maison.', 'https://st4.depositphotos.com/1022715/41875/i/600/depositphotos_418757016-stock-photo-mature-man-measuring-wooden-shelf.jpg', 'https://youtu.be/Q1gg45YgYIg', 2),
('Construire une table basse en palettes', 'Découvrez comment transformer des palettes en une superbe table basse.', 'https://st3.depositphotos.com/16485876/19160/i/600/depositphotos_191608684-stock-photo-bean-bags-and-pallet-coffee.jpg', 'https://youtu.be/ymrmqlx2yEI', 2),
('Créer une lampe design avec des matériaux recyclés', 'Faites une lampe tendance en recyclant des objets du quotidien.', 'https://st3.depositphotos.com/12548352/16211/i/600/depositphotos_162117482-stock-photo-lamp.jpg', 'https://youtu.be/CKmosM-IK1Q', 2),
('Fabriquer un pot de fleurs en béton', 'Créez un pot de fleurs unique en utilisant du béton comme matériau.', 'https://st4.depositphotos.com/11819680/23941/i/600/depositphotos_239414098-stock-photo-succulent-plant-handmade-concrete-pot.jpg', 'https://youtu.be/AMbPgzWegbA', 2),
('Construire une cabane dans les arbres', 'Offrez-vous une expérience unique en construisant une cabane dans les arbres.', 'https://st2.depositphotos.com/4000849/6142/i/600/depositphotos_61427235-stock-photo-tree-house-cottage-farm.jpg', 'https://youtu.be/7l5LdxfFaKo', 2),
('Créer une terrasse extérieure en palettes', 'Découvrez comment aménager une belle terrasse extérieure pour profiter des beaux jours.', 'https://st.depositphotos.com/3977247/56691/i/600/depositphotos_566910720-stock-photo-wooden-pallets-make-garden-wood.jpg', 'https://youtu.be/ZELGWKcnxHs', 2),
('Créer un potager dans son jardin', 'Suivez ce guide pour créer et entretenir un potager dans votre jardin.', 'https://st4.depositphotos.com/15111000/41758/i/600/depositphotos_417586854-stock-photo-little-boy-harvesting-lettuce-family.jpg', 'https://youtu.be/fIByAzFXs40', 2),
('Construire une cabane en bois pour enfants', 'Apprenez à construire une charmante cabane en bois pour vos enfants dans le jardin.', 'https://st2.depositphotos.com/2150719/42317/i/600/depositphotos_423178896-stock-photo-craftsman-builds-himself-stable-wooden.jpg', 'https://youtu.be/gzH0D71NC6E', 2),
("Installer un système d'irrigation automatique", "Optimisez l'arrosage de votre jardin en installant un système d'irrigation automatique.", 'https://st4.depositphotos.com/13684278/24694/i/600/depositphotos_246944156-stock-photo-automatic-lawn-sprinkler-watering-green.jpg', 'https://youtu.be/gTC8Jk4VlWs', 2),
('Construire une pergola pour votre terrasse', 'Créez une pergola élégante pour ombrager votre terrasse et ajouter du charme à votre extérieur.', 'https://st.depositphotos.com/1041088/4918/i/600/depositphotos_49181519-stock-photo-walkout-deck-with-attached-pergola.jpg', 'https://youtu.be/ecCiK6AietA', 2),
('Poser du papier peint comme un professionnel', 'Apprenez les techniques pour poser du papier peint avec succès et donner du style à votre intérieur.', 'https://st.depositphotos.com/1017986/53462/i/600/depositphotos_534622086-stock-photo-woman-applying-wallpaper-to-wall.jpg', 'https://youtu.be/lZG_TzT9FQU', 2),
('Fabriquer un meuble TV en bois', 'Construisez un meuble TV sur mesure en bois pour votre salon.', 'https://st4.depositphotos.com/26501280/28873/i/600/depositphotos_288732802-stock-photo-mockup-smart-tv-mint-living.jpg', 'https://youtu.be/WMdrlU9Py3U', 2),
('Installer un système de climatisation', 'Découvrez les étapes pour installer un système de climatisation dans votre maison et rester au frais en été.', 'https://st2.depositphotos.com/1010613/7207/i/600/depositphotos_72078729-stock-photo-man-cleaning-air-conditioning-system.jpg', 'https://youtu.be/e4LWcPqmjWY', 2),
('Concevoir et aménager un dressing sur mesure', "Transformez une pièce en un dressing fonctionnel et élégant grâce à ce guide d'aménagement sur mesure.", 'https://st2.depositphotos.com/2018053/11436/i/600/depositphotos_114360508-stock-photo-interior-of-modern-apartment.jpg', 'https://youtu.be/9HL9OjdAJig', 2);


INSERT INTO "step" ( "content", "lesson_id") VALUES

-- Étapes pour la leçon 1 : Comment peindre un mur comme un pro
('Nettoyez le mur à peindre en enlevant la saleté et la poussière.', 1),
('Protégez les zones que vous ne souhaitez pas peindre avec du ruban adhésif et des bâches plastiques.', 1),
('Appliquez une couche d''apprêt sur le mur pour une meilleure adhérence de la peinture.', 1),
('Peignez le mur en utilisant des mouvements réguliers et en veillant à ne pas laisser de traces.', 1),
('Laissez sécher la première couche de peinture, puis appliquez une deuxième couche si nécessaire.', 1),

-- Étapes pour la leçon 2 : Réparer une fissure dans un mur en plâtre
('Nettoyez la fissure en enlevant les morceaux de plâtre lâches et la poussière.', 2),
('Appliquez un enduit de rebouchage dans la fissure en lissant la surface avec une spatule.', 2),
('Laissez sécher l''enduit de rebouchage selon les indications du fabricant.', 2),
('Poncez légèrement la surface pour lisser l''enduit et la rendre uniforme avec le reste du mur.', 2),
('Appliquez une couche de peinture sur la zone réparée pour terminer.', 2),

-- Étapes pour la leçon 3 : Installer un robinet de douche
('Coupez l''arrivée d''eau générale pour éviter les fuites.', 3),
('Retirez l''ancien robinet de douche en dévissant les écrous de fixation.', 3),
('Nettoyez les raccords de plomberie et retirez tout résidu de scellant.', 3),
('Installez le nouveau robinet de douche en fixant fermement les écrous de fixation.', 3),
('Vérifiez qu''il n''y a pas de fuites et remettez l''eau en marche.', 3),

-- Étapes pour la leçon 4 : Changer un joint de robinet
('Fermez l''arrivée d''eau et démontez le robinet en retirant les vis de fixation.', 4),
('Retirez le joint défectueux en le grattant avec un outil adapté.', 4),
('Nettoyez les surfaces de raccordement et retirez les résidus de l''ancien joint.', 4),
('Placez le nouveau joint dans son emplacement et remontez le robinet.', 4),
('Ouvrez l''arrivée d''eau et vérifiez qu''il n''y a pas de fuites.', 4),

-- Étapes pour la leçon 5 : Installer un interrupteur électrique
('Coupez l''alimentation électrique à l''aide du disjoncteur correspondant.', 5),
('Retirez l''ancien interrupteur en dévissant les vis de fixation.', 5),
('Repérez les fils électriques et connectez-les au nouvel interrupteur selon le schéma électrique.', 5),
('Fixez solidement le nouvel interrupteur dans le boîtier mural à l''aide des vis de fixation.', 5),
('Rétablissez l''alimentation électrique et testez le fonctionnement de l''interrupteur.', 5),

-- Étapes pour la leçon 6 : Remplacer un disjoncteur électrique
('Localisez le disjoncteur défectueux dans le tableau électrique.', 6),
('Coupez l''alimentation électrique générale en amont du disjoncteur à remplacer.', 6),
('Déconnectez les fils électriques du disjoncteur défectueux et retirez-le du tableau.', 6),
('Installez le nouveau disjoncteur en connectant les fils électriques selon le schéma.', 6),
('Rétablissez l''alimentation électrique et vérifiez que le disjoncteur fonctionne correctement.', 6),

-- Étapes pour la leçon 7 : Créer un mur de briques apparentes
('Préparez le mur en le nettoyant et en appliquant une sous-couche d''adhérence.', 7),
('Appliquez un mortier-colle sur le mur à l''aide d''une truelle crantée.', 7),
('Posez les briques en les espaçant uniformément et en les pressant fermement contre le mur.', 7),
('Appliquez le mortier de jointoiement entre les briques en veillant à combler tous les espaces.', 7),
('Laissez sécher le mur pendant le temps recommandé avant de poursuivre les finitions.', 7),

-- Étapes pour la leçon 8 : Poser du carrelage mural dans sa cuisine
('Préparez le mur en le nettoyant et en traçant des repères pour le positionnement des carreaux.', 8),
('Appliquez du mortier-colle sur le mur à l''aide d''une truelle crantée.', 8),
('Posez les carreaux en commençant par le bas et en les alignant soigneusement.', 8),
('Utilisez des croisillons pour maintenir des espacements uniformes entre les carreaux.', 8),
('Laissez sécher le carrelage puis appliquez le mortier de jointoiement entre les carreaux.', 8),

-- Étapes pour la leçon 9 : Réparer une fuite d'eau sous l'évier de la cuisine
('Fermez l''arrivée d''eau sous l''évier pour stopper la fuite.', 9),
('Videz le contenu du meuble sous l''évier et placez une bassine pour récupérer l''eau résiduelle.', 9),
('Localisez la source de la fuite et identifiez le composant défectueux (robinet, joint, tuyau, etc.).', 9),
('Remplacez le composant défectueux en dévissant les fixations et en retirant l''ancien élément.', 9),
('Resserrez toutes les connexions et ouvrez l''arrivée d''eau pour vérifier qu''il n''y a plus de fuite.', 9),

-- Étapes pour la leçon 10 : Comment fabriquer une étagère en bois
('Préparez les planches en les découpant aux dimensions souhaitées.', 10),
('Poncez les planches pour éliminer les imperfections et obtenir une surface lisse.', 10),
('Assemblez les planches en utilisant des vis ou de la colle à bois pour former la structure de l''étagère.', 10),
('Fixez l''étagère au mur en utilisant des équerres de fixation pour assurer sa stabilité.', 10),
('Décorez l''étagère selon vos goûts ou appliquez une couche de vernis pour la protéger.', 10),

-- Étapes pour la leçon 11 : Construire une table basse en palettes
('Démontez les palettes en retirant les planches et en les séparant des lattes.', 11),
('Assemblez les planches pour former le plateau de la table en les disposant selon le motif souhaité.', 11),
('Fixez les planches ensemble à l''aide de vis ou de clous pour former le plateau.', 11),
('Utilisez les lattes des palettes pour construire les pieds de la table en les fixant solidement au plateau.', 11),
('Poncez et vernissez la table pour obtenir une finition lisse et protéger le bois.', 11),

-- Étapes pour la leçon 12 : Créer une lampe design avec des matériaux recyclés
('Collectez des matériaux recyclés tels que des bouteilles en plastique, des boîtes de conserve ou des morceaux de bois.', 12),
('Nettoyez et préparez les matériaux en retirant les étiquettes et en les découpant selon les besoins.', 12),
('Assemblez les matériaux pour former la structure de la lampe en les fixant ensemble à l''aide de colle ou de fil de fer.', 12),
('Installez le système d''éclairage à l''intérieur de la structure en utilisant une douille et un câble électrique.', 12),
('Décorez la lampe selon votre style en ajoutant des éléments décoratifs ou en peignant les matériaux.', 12),

-- Étapes pour la leçon 13 : Fabriquer un pot de fleurs en béton
('Préparez le moule du pot en utilisant un récipient en plastique ou en carton de la taille souhaitée.', 13),
('Mélangez le béton avec de l''eau dans un seau selon les instructions du fabricant jusqu''à obtenir une consistance homogène.', 13),
('Versez le béton dans le moule en veillant à le répartir uniformément et à lisser la surface.', 13),
('Insérez un morceau de tube en plastique au centre du pot pour former le trou de drainage.', 13),
('Laissez sécher le pot pendant au moins 24 heures avant de le démouler et de le laisser durcir complètement.', 13),

-- Étapes pour la leçon 14 : Construire une cabane dans les arbres
('Sélectionnez un arbre solide avec des branches adaptées pour supporter la structure de la cabane.', 14),
('Concevez un plan pour la cabane en déterminant sa taille, sa forme et son emplacement sur l''arbre.', 14),
('Assemblez la structure de base de la cabane en fixant des poutres et des planches solides aux branches de l''arbre.', 14),
('Construisez les murs de la cabane en utilisant des panneaux de bois ou d''autres matériaux de construction.', 14),
('Ajoutez des finitions telles que des fenêtres, une porte et un toit pour compléter la cabane.', 14),

-- Étapes pour la leçon 15 : Créer une terrasse extérieure en palettes
('Préparez le sol en nivelant la surface et en retirant les mauvaises herbes et les débris.', 15),
('Disposez les palettes sur le sol en les espaçant uniformément pour former la base de la terrasse.', 15),
('Fixez les palettes ensemble en les vissant ou en les clouant pour renforcer la structure de la terrasse.', 15),
('Installez des poteaux en bois ou en métal pour soutenir les coins de la terrasse et assurer sa stabilité.', 15),
('Décorez la terrasse avec des meubles de jardin, des plantes et des accessoires pour créer un espace accueillant.', 15),

-- Étapes pour la leçon 16 : Créer un potager dans son jardin
('Choisissez un emplacement ensoleillé et bien drainé pour votre potager.', 16),
('Préparez le sol en le labourant pour éliminer les mauvaises herbes et en ajoutant du compost pour enrichir la terre.', 16),
('Planifiez l''aménagement de votre potager en dessinant des parcelles pour chaque type de légume ou de plante.', 16),
('Plantez vos graines ou vos plants en suivant les recommandations de distance et de profondeur pour chaque variété.', 16),
('Arrosez régulièrement votre potager et veillez à le protéger des ravageurs en utilisant des méthodes naturelles ou des produits biologiques.', 16),

-- Étapes pour la leçon 17 : Construire une cabane en bois pour enfants
('Concevez le plan de la cabane en déterminant sa taille, sa forme et ses fonctionnalités.', 17),
('Préparez le terrain en nivelant la surface et en installant une base solide pour soutenir la cabane.', 17),
('Assemblez les murs de la cabane en fixant des planches de bois ensemble pour former la structure.', 17),
('Construisez le toit de la cabane en installant des poutres et des panneaux de bois ou en utilisant des tuiles ou des bardeaux.', 17),
('Ajoutez des finitions telles que des fenêtres, une porte et des accessoires ludiques pour rendre la cabane attrayante pour les enfants.', 17),

-- Étapes pour la leçon 18 : Installer un système d'irrigation automatique
('Planifiez l''emplacement des tuyaux et des arroseurs en fonction de la disposition de votre jardin et de vos besoins en irrigation.', 18),
('Creusez des tranchées pour installer les tuyaux principaux et les lignes d''arroseurs selon le schéma prévu.', 18),
('Assemblez les composants du système d''irrigation en raccordant les tuyaux, les vannes et les arroseurs.', 18),
('Testez le système d''irrigation en le mettant en marche et en vérifiant que tous les arroseurs fonctionnent correctement.', 18),
('Programmez l''horloge d''arrosage selon les besoins de votre jardin et ajustez les réglages au fil du temps.', 18),

-- Étapes pour la leçon 19 : Construire une pergola pour votre terrasse
('Déterminez l''emplacement et les dimensions de la pergola en tenant compte de l''espace disponible et de l''orientation du soleil.', 19),
('Creusez des trous pour les poteaux de la pergola et assurez-vous qu''ils sont de niveau et correctement espacés.', 19),
('Installez les poteaux en les fixant solidement dans les trous à l''aide de béton ou de gravier compacté.', 19),
('Fixez les poutres horizontales de la pergola sur les poteaux en veillant à ce qu''elles soient alignées et solidement fixées.', 19),
('Ajoutez des éléments décoratifs tels que des treillis, des plantes grimpantes ou des guirlandes lumineuses pour personnaliser votre pergola.', 19),

-- Étapes pour la leçon 20 : Poser du papier peint comme un professionnel
('Préparez le mur en le nettoyant et en le lissant pour obtenir une surface propre et uniforme.', 20),
('Découpez les bandes de papier peint en les laissant dépasser de quelques centimètres pour faciliter la découpe et l''ajustement.', 20),
('Appliquez la colle à papier peint sur le mur à l''aide d''un rouleau ou d''un pinceau en suivant les instructions du fabricant.', 20),
('Posez la première bande de papier peint en l''alignant avec le plafond et en lissant les bulles d''air à l''aide d''une spatule.', 20),
('Répétez le processus pour chaque bande de papier peint en veillant à ce qu''elles se chevauchent légèrement et s''alignent correctement.', 20),

-- Étapes pour la leçon 21 : Fabriquer un meuble TV en bois
('Dessinez le plan du meuble TV en tenant compte de ses dimensions, de son agencement et de ses fonctionnalités.', 21),
('Choisissez le bois approprié pour le meuble TV en fonction de son style, de sa durabilité et de son coût.', 21),
('Coupez les planches de bois selon les dimensions du plan en utilisant une scie circulaire ou une scie sauteuse.', 21),
('Assemblez les différentes parties du meuble TV en vissant ou en collant les planches ensemble pour former la structure.', 21),
('Ajoutez des finitions telles que des poignées, des portes et des étagères pour rendre le meuble TV fonctionnel et esthétique.', 21),

-- Étapes pour la leçon 22 : Installer un système de climatisation
('Choisissez le type de système de climatisation adapté à votre maison en tenant compte de sa taille, de son agencement et de vos besoins en refroidissement.', 22),
('Sélectionnez l''emplacement idéal pour l''unité extérieure du système de climatisation en veillant à ce qu''il soit bien ventilé et à l''abri des éléments.', 22),
('Installez les conduites de réfrigérant et d''alimentation électrique entre l''unité extérieure et les unités intérieures du système de climatisation.', 22),
('Montez les unités intérieures dans les différentes pièces de la maison en les fixant solidement au mur ou au plafond selon les instructions du fabricant.', 22),
('Testez le système de climatisation en le mettant en marche et en vérifiant que chaque unité fonctionne correctement et produit de l''air froid.', 22),

-- Étapes pour la leçon 23 : Concevoir et aménager un dressing sur mesure
('Évaluez vos besoins en espace de rangement et en organisation pour déterminer les dimensions et la configuration du dressing.', 23),
('Dessinez le plan du dressing en intégrant des éléments tels que des étagères, des tiroirs, des tringles à vêtements et des accessoires de rangement.', 23),
('Choisissez les matériaux et les finitions pour le dressing en fonction de votre style, de votre budget et de la durabilité des matériaux.', 23),
('Assemblez les différents éléments du dressing en suivant le plan et les instructions d''assemblage du fabricant.', 23),
('Ajoutez des éléments décoratifs et des accessoires fonctionnels pour personnaliser le dressing et maximiser son utilité.', 23),

COMMIT;