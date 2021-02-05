CREATE TABLE IF NOT EXISTS member (
    id INT PRIMARY KEY AUTO_INCREMENT,
    signUpBy VARCHAR(255) NOT NULL DEFAULT '',
    username VARCHAR(255) NOT NULL,
    signUpInfo VARCHAR(255) NOT NULL DEFAULT '',
    email VARCHAR(255) NOT NULL ,
    password VARCHAR(255) NOT NULL ,
    emailInfo VARCHAR(255) NOT NULL DEFAULT '',
    phoneNumber VARCHAR(255) NOT NULL DEFAULT '',
    bidYear smallint(4) NOT NULL DEFAULT 0,
    bidMonth smallint(4) NOT NULL DEFAULT 0,
    monIncome VARCHAR(255) NOT NULL DEFAULT '',
    education VARCHAR(255) NOT NULL DEFAULT '',
    gender CHAR(10) NOT NULL DEFAULT '',
    favourites VARCHAR(255) NOT NULL DEFAULT '',
    notification BOOLEAN NOT NULL DEFAULT FALSE,
    realm VARCHAR(255) NOT NULL DEFAULT '',
    emailVerified BOOLEAN NOT NULL DEFAULT FALSE,
    verificationToken VARCHAR(255) DEFAULT NULL,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status smallint(4) NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS favourite (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL  DEFAULT '',
    description VARCHAR(255) DEFAULT '',
    status BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS Role (
  id int(11) NOT NULL AUTO_INCREMENT,
  name char(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  description char(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  created datetime DEFAULT NULL,
  modified datetime DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY Role_id_uindex (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS RoleMapping (
  id int(11) NOT NULL AUTO_INCREMENT,
  principalType char(50) COLLATE utf8_unicode_ci NOT NULL,
  principalId int(11) DEFAULT NULL,
  roleId int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY AppRoleMapping_id_uindex (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
