CREATE TABLE `cx_schema`.`user` (
userId int(11) unsigned not null auto_increment,
username varchar(20) default null,
password varchar(100) default null,
salt varchar(20) default null,
primary key (userId)
)engine = innodb default charset = latin1;

insert into user(username, password)
	values('Tom','password1234');

insert into user(username, password)
	values('Leo', aes_encrypt('password1234','key'));