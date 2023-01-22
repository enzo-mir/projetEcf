const express = require("express");
const mysql = require("mysql");
var bodyParser = require("body-parser");
var cors = require("cors");
const PORT = process.env.PORT || 7000;

const app = express();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
/* app.use(express.static(path.join(__dirname, "reactnode/build")));
 */
/* app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./reactnode/build/index.html"));
});
var con = mysql.createConnection({
  host: "mysql-enzmrg.alwaysdata.net",
  user: "enzmrg",
  password: "5()Amg9709",
  database: "enzmrg_db",
}); */
var viergeConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

app.get("/api", (req, res) => {
  viergeConnection.connect((error) => {
    viergeConnection.query(
      "CREATE DATABASE IF NOT EXISTS `ecfprojet`",
      (error, result) => {
        error ? console.log(error) : null;
      }
    );
  });

  /* CREATE A NEW CONNECTION WITH DB : */

  let connectionNew = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecfprojet",
  });

  /* CREATE NEW TABLE FOR AUTH ACCESS AND INSERT DEFAULT VALUE */

  connectionNew.query(
    "CREATE TABLE IF NOT EXISTS `connexion` (`id` INT AUTO_INCREMENT primary key NOT NULL,`userName` varchar(255) NOT NULL,`email` varchar(255) NOT NULL,`password` varchar(255) NOT NULL,`convive` int(10) SIGNED NOT NULL,`alergie` varchar(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
    (error, result) => {
      error ? console.log(error) : null;
    }
  );

  /* CREATE NEW TABLE FOR RESERVATION */

  connectionNew.query(
    "CREATE TABLE IF NOT EXISTS `reserver` (`id` INT AUTO_INCREMENT primary key NOT NULL,`convive` int(10) SIGNED NOT NULL,`date` DATE NOT NULL,`heures` varchar(255) NOT NULL,`nom` varchar(255) NOT NULL,`email` varchar(255) NOT NULL  ,`alergie` varchar(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
    (error, result) => {
      error ? console.log(error) : null;
    }
  );

  /* CREATE NEW TABLE FOR HOURS */

  connectionNew.query(
    "CREATE TABLE IF NOT EXISTS `heures` (`id` INT AUTO_INCREMENT primary key NOT NULL,`day` varchar(255) NOT NULL,`lunch` varchar(255) NOT NULL,`dinner` varchar(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
    (error, result) => {
      error ? console.log(error) : null;
    }
  );

  /* CREATE NEW TABLE FOR CARTE */

  //ENTRÉES
  connectionNew.query(
    "CREATE TABLE IF NOT EXISTS `menu` (`id` INT AUTO_INCREMENT primary key NOT NULL,`nom` varchar(255) NOT NULL,`formule` varchar(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
    (error, result) => {
      error ? console.log(error) : null;
    }
  );

  //ENTRÉES
  connectionNew.query(
    "CREATE TABLE IF NOT EXISTS `entree` (`id` INT AUTO_INCREMENT primary key NOT NULL,`nom` varchar(255) NOT NULL,`description` varchar(255) NOT NULL,`prix` INT,`partage` BOOL NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
    (error, result) => {
      error ? console.log(error) : null;
    }
  );

  //PLATS
  connectionNew.query(
    "CREATE TABLE IF NOT EXISTS `plat` (`id` INT AUTO_INCREMENT primary key NOT NULL,`nom` varchar(255) NOT NULL,`description` varchar(255) NOT NULL,`prix` INT,`partage` BOOL NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
    (error, result) => {
      error ? console.log(error) : null;
    }
  );

  //DESSERTS
  connectionNew.query(
    "CREATE TABLE IF NOT EXISTS `dessert` (`id` INT AUTO_INCREMENT primary key NOT NULL,`nom` varchar(255) NOT NULL,`description` varchar(255) NOT NULL,`prix` INT) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
    (error, result) => {
      error ? console.log(error) : null;
    }
  );

  /* SQL REQUEST INSERTION HOURS */
  connectionNew.query(
    "INSERT IGNORE INTO `heures` (`id`, `day`,`lunch`, `dinner`) VALUES (1,'lundi','12H - 14H','19H - 22H'),(2,'mardi','12H - 14H','19H - 22H'),(3,'mercredi','fermer','fermer'),(4,'jeudi','12H - 14H','19H - 22H'),(5,'vendredi','12H - 14H','19H - 22H'),(6,'samedi','fermer','19H - 23H'),(7,'dimanche','12H - 14H','fermer')",
    (error, result) => {
      error ? console.log(error) : null;
    }
  );

  /* ADMIN ACCESS  */

  connectionNew.query(
    "INSERT IGNORE INTO `connexion` (`id`, `userName`, `email`, `password`, `convive`, `alergie`) VALUES (1,'admin','','admin',0,'')",
    (error, result) => {
      error ? console.log(error) : null;
    }
  );

  /* FINAL RESULT WITH THE 2 TABLE */

  connectionNew.query("SELECT * FROM `connexion`", (error, connexion) => {
    error ? console.log(error) : null;
    connectionNew.query("SELECT * FROM `heures`", (error, heures) => {
      error ? console.log(error) : null;
      connectionNew.query("SELECT * FROM `reserver`", (error, reservation) => {
        error ? console.log(error) : null;
        res.send({ connexion, heures, reservation });
      });
    });
  });
});

/* GET (TYPE :OBJ) reservation  */

app.post("/res", async (req, res) => {
  /* NEW CONNECTION FOR INSERTION IN RESERVATION TABLE */
  let connectionNew = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecfprojet",
  });

  let response = req.body;
  let values = Object.values(response);
  console.log(values);

  connectionNew.query(
    `INSERT INTO reserver (id, convive, date, heures, nom, email, alergie) VALUES (null,${values[0]},"${values[1]}","${values[4]}","${values[3]}","${values[2]}","${values[5]}")`
  );
});

app.listen(PORT, () => {
  console.log("hello " + PORT);
});
