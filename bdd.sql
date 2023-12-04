drop database if exists projectTS;
create database projectTS;
	use projectTS;

create table client
(
	id_cli int(5) not null auto_increment,
	email varchar(60) not null UNIQUE,
	nom varchar(100) not null,
	prenom varchar(100) not null,
    mdp varchar(50) not null,
	date_naiss date not null,
	ville varchar(50) not null,
	cp varchar(20) not null,
	rue varchar(50) not null,
	numrue int(5) not null,
	complement varchar(50) not null,
    primary key (id_cli)
)engine=innodb;

create table administrateur
(
	id_adm int(5) not null auto_increment,
	email varchar(60) not null UNIQUE,
	nom varchar(100) not null,
	prenom varchar(100) not null,
    mdp varchar(50) not null,
	droits int(1) not null,
    primary key (id_adm)
)engine=innodb; 

create table categorie_produit
(
	id_cat int(5) not null auto_increment,
	libelle varchar(100) not null,
	description varchar(255),
    primary key (id_cat)
)engine=innodb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

create table produit
(
	id_pro int(5) not null auto_increment,
	libelle varchar(100) not null,
	description varchar(255),
	prix decimal(5, 2) not null,
	date_achat date not null,
	date_peremption date,
	url_image varchar(100),
	id_cat int(5) not null,
    primary key (id_pro),
	foreign key (id_cat) references categorie_produit(id_cat)
)engine=innodb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

create table commande
(
	id_com int(5) not null auto_increment,
	prix_total decimal(7, 2),
    primary key (id_com)
)engine=innodb;

create table ligne_commande
(
	id_lco int(5) not null auto_increment,
	quantite int(3) not null,
	id_cli int(5) not null,
	id_pro int(5) not null,
	id_com int(5) not null,
    primary key (id_lco),
	foreign key (id_cli) references client(id_cli),
	foreign key (id_pro) references produit(id_pro),
	foreign key (id_com) references commande(id_com)
)engine=innodb;

insert into categorie_produit values(null, "Produits laitiers", "Des super produits a base de lait !");
insert into categorie_produit values(null, "Fruits et legumes", "Des fruits et legumes pour bien manger !");
insert into categorie_produit values(null, "Viandes", "Pour les carnivores !");

insert into produit values(null,"yaourt a la fraise","yaourt 0% de matieres grasses avec de la fraise",1.89,"2023-11-04","2023-12-04","produit_1",1);
insert into produit values(null,"yaourt a la mangue","yaourt 0% de matieres grasses avec de la mangue",1.89,"2023-11-02","2023-12-02","produit_2",1);
insert into produit values(null,"fromage blanc","fromage blanc 0%",1.50,"2023-11-01","2023-11-25","produit_3",1);

insert into produit values(null,"fraise","Gariguettes",1.75,"2023-11-04","2023-11-14","produit_4",2);
insert into produit values(null,"haricots verts","extra fins",1,"2023-11-07","2023-11-08","produit_5",2);
insert into produit values(null,"choux","degueux",0.50,"2023-11-05","2023-12-01","produit_6",2);

insert into produit values(null,"steack hache","steack hache pur boeuf",3,"2023-11-04","2023-11-12","produit_7",3);
insert into produit values(null,"blanc de poulet","bio",5,"2023-11-07","2023-11-15","produit_8",3);





