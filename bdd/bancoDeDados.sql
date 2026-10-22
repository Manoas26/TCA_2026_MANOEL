drop database if exists chato;

create database chato;

\c chato;

create table usuario (
    Id serial primary key,
    Nome varchar(15) not null
);

create table chat (
    Id serial primary key,
    Nome varchar(15) not null
);

create table mensagem (
    Usuario int not null references usuario(Id),
    Chat int not null references chat(Id),
    Hora char(19), --mudar isso no diagrama
    Texto varchar(100) not null,
    primary key(Usuario, Chat, Hora)
);

insert into usuario(Nome)
    values
        ('PATIENT 0');

insert into chat(Nome)
    values
        ('GERAL');