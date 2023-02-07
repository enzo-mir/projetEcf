const express = require("express");
const mysql = require("mysql");
var bodyParser = require("body-parser");
let cloudinary = require("cloudinary").v2;
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

cloudinary.config({
  cloud_name: "dbo6hyl8t",
  api_key: "184175781875795",
  api_secret: "VoLvBfRnm-GLW22INeb8eWFnN3g",
  secure: true,
});

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

  //MENUS
  connectionNew.query(
    "CREATE TABLE IF NOT EXISTS `menu` (`id` INT AUTO_INCREMENT primary key NOT NULL,`nom` varchar(255) NOT NULL,`formule` varchar(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
    (error, result) => {
      error ? console.log(error) : null;
      if (result) {
        connectionNew.query(
          "INSERT IGNORE INTO `menu` (`id`, `nom`, `formule`) VALUES (1,'menu du marché','entrée + plat 30€,plat + dessert 26€'),(2,'menu du montagnard (soirs)','entrée + tartiflette(1 pers) 30€,entrée + plat + dessert 34€')",
          (err, result) => {
            err ? console.log(err) : null;
          }
        );
      }
    }
  );

  //ENTRÉES
  connectionNew.query(
    "CREATE TABLE IF NOT EXISTS `entree` (`id` INT AUTO_INCREMENT primary key NOT NULL,`nom` varchar(255) NOT NULL,`description` varchar(255) NOT NULL,`prix` INT,`partage` BOOL NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
    (error, result) => {
      error ? console.log(error) : null;
      if (result) {
        connectionNew.query(
          "INSERT IGNORE INTO `entree` (`id`, `nom`, `description`, `prix`, `partage`) VALUES (1,'la salade Savoyarde','salade traditionnelle au chèvre chaud', '12', FALSE),(2,'assortiment de charcuterie','assortiment de jambon de la région', '13', FALSE),(3,'crousti-camembert','camembert coulant enrobé avec une chapelure', '16', TRUE),(4,'friands savoyards','pate feuilletée au coeur fondant', '15', TRUE)"
        );
      }
    }
  );

  //PLATS
  connectionNew.query(
    "CREATE TABLE IF NOT EXISTS `plat` (`id` INT AUTO_INCREMENT primary key NOT NULL,`nom` varchar(255) NOT NULL,`description` varchar(255) NOT NULL,`prix` INT,`partage` BOOL NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
    (error, result) => {
      error ? console.log(error) : null;
      if (result) {
        connectionNew.query(
          "INSERT IGNORE INTO `plat` (`id`, `nom`, `description`, `prix`, `partage`) VALUES (1,'entrcôte (230 gr)','entrcôte de boeuf avec son beurre fermier', '23', FALSE),(2,'camembert au four','camembert fondant entaillé et cuit au four', '18', FALSE),(3,'raclette party','fromage exceptionnel pour un moment familial', '30', TRUE),(4,'fondue savoyardes','cuve de fromage fondus à déguster entre amis', '28', TRUE)"
        );
      }
    }
  );

  //DESSERTS
  connectionNew.query(
    "CREATE TABLE IF NOT EXISTS `dessert` (`id` INT AUTO_INCREMENT primary key NOT NULL,`nom` varchar(255) NOT NULL,`description` varchar(255) NOT NULL,`prix` INT) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
    (error, result) => {
      error ? console.log(error) : null;
      if (result) {
        connectionNew.query(
          "INSERT IGNORE INTO `dessert` (`id`, `nom`, `description`, `prix`) VALUES (1,'mousse au chocolat','mousse au chocolat praliné des produits locaux', '6'),(2,'café gourmand','café accompagné de une boule de glace a la vanille', '8'),(3,'tarte tatin','tarte tatin aux pommes onctueuses', '7'),(4,'crème brûlée','crème brûlée caramélisée', '8')"
        );
      }
    }
  );

  connectionNew.query(
    "CREATE TABLE IF NOT EXISTS `images` (`id` INT AUTO_INCREMENT primary key NOT NULL,`titre` varchar(255) NOT NULL,`description` varchar(255) NOT NULL,`lien` varchar(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
    (error, result) => {
      error ? console.log(error) : null;
      if (result) {
        cloudinary.api.resources().then((data) => {
          connectionNew.query(
            "SELECT `id`, `titre`, `description`, `lien` FROM `images` WHERE 1",
            (err, success) => {
              if (success.length < 1) {
                let images = data.resources;
                connectionNew.query(
                  `INSERT IGNORE INTO images (id, titre, description, lien) VALUES (1,"fondue savoyarde","cuve de fromage fondus à déguster entre amis",'${images[0].url}'),(2,"raclette party","fromage exceptionnel pour un moment familial",'${images[1].url}')`
                );
              } else if (err) {
                console.log(err);
              }
            }
          );

          app.get("/images", (req, res) => {
            connectionNew.query(
              "SELECT `id`, `titre`, `description`, `lien` FROM `images` WHERE 1",
              (err, results) => {
                if (results) {
                  res.send(results);
                }
              }
            );
          });
        });
      }
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
    "INSERT IGNORE INTO `connexion` (`id`, `userName`, `email`, `password`, `convive`, `alergie`) VALUES (1,'','admin@admin.com','admin',0,'')",
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

app.post("/connectReq", async (request, res) => {
  let connectionNew = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecfprojet",
  });
  if (request) {
    let body = request.body;
    let nom = await request.body.nom;
    let email = await request.body.email;
    let mdp = await request.body.mdp;
    let convives = await request.body.convives;
    let alergies = await request.body.alergies;
    connectionNew.query(
      `SELECT * FROM connexion WHERE email = "${email}"`,
      (error, result) => {
        if (result.length < 1) {
          connectionNew.query(
            `INSERT INTO connexion(id, userName, email, password, convive, alergie) VALUES (null,'${nom}','${email}','${mdp}','${convives}','${alergies}')`,
            (err, success) => {
              if (success) {
                res.send(body);
              }
            }
          );
        } else {
          res.send({ error: "e-mail déjà pris" });
        }
      }
    );
  }
});

app.post("/auth", (req, res) => {
  let connectionNew = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecfprojet",
  });
  connectionNew.query(
    `SELECT * FROM connexion WHERE email = "${req.body.email}" AND password = "${req.body.mdp}"`,
    (error, success) => {
      if (success.length < 1) {
        res.send({ erreur: "adresse e-mail ou mot de passe incorrect" });
      } else {
        if (
          success[0].email == "admin@admin.com" &&
          success[0].password == "admin"
        ) {
          res.send({ admin: "accés au contenus admin" }).status(200);
        } else {
          res.send(success).status(200);
        }
      }
    }
  );
});

app.post("/updateProfil", (req, res) => {
  let connectionNew = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecfprojet",
  });

  connectionNew.query(
    `UPDATE connexion SET userName="${req.body.nom}",email="${req.body.email}",convive=${req.body.convives},alergie="${req.body.alergies}" WHERE email="${req.body.oldEmail}" AND password="${req.body.mdp}"`,
    (error, success) => {
      if (success) {
        connectionNew.query(
          `SELECT * from connexion WHERE email = "${req.body.email}" AND password="${req.body.mdp}"`,
          (err, valid) => {
            if (valid.length < 1) {
              res.send({
                erreur: "Un problème est survenus lors de l'édition du profil",
              });
            } else {
              res.send(valid).status(200);
            }
          }
        );
      }
    }
  );
});
app.post("/adminHours", (req, res) => {
  let connectionNew = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecfprojet",
  });

  let obj = req.body.data;
  obj.forEach((element) => {
    element.time == "lunch"
      ? connectionNew.query(
          `UPDATE heures SET lunch = "${element.target}" WHERE day = "${element.day}"`,
          (err, result) => {
            if (err) console.log(err);
            if (result) console.log(result);
          }
        )
      : connectionNew.query(
          `UPDATE heures SET dinner = "${element.target}" WHERE day = "${element.day}"`,
          (err, result) => {
            if (err) console.log(err);
          }
        );
  });
});
app.post("/updateCarte", (req, res) => {
  let connectionNew = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecfprojet",
  });

  req.body.formule === null
    ? connectionNew.query(
        `SELECT * from entree WHERE nom = "${req.body.oldTitle}" AND description = "${req.body.desc}"`,
        (err, succ) => {
          if (succ) {
            connectionNew.query(
              `UPDATE entree SET nom = "${req.body.title}", description = "${req.body.desc}", prix = ${req.body.price} WHERE  nom = "${req.body.oldTitle}" AND description = "${req.body.desc}"`
            );
          }
          if (succ.length < 1) {
            connectionNew.query(
              `SELECT * from plat WHERE nom = "${req.body.oldTitle}" AND description = "${req.body.desc}"`,
              (err, succ) => {
                if (succ) {
                  connectionNew.query(
                    `UPDATE plat SET nom = "${req.body.title}", description = "${req.body.desc}", prix = ${req.body.price} WHERE  nom = "${req.body.oldTitle}" AND description = "${req.body.desc}"`
                  );
                }
                if (succ.length < 1) {
                  connectionNew.query(
                    `SELECT * from dessert WHERE nom = "${req.body.oldTitle}" AND description = "${req.body.desc}"`,
                    (err, succ) => {
                      if (succ) {
                        connectionNew.query(
                          `UPDATE dessert SET nom = "${req.body.title}", description = "${req.body.desc}", prix = ${req.body.price} WHERE  nom = "${req.body.oldTitle}" AND description = "${req.body.desc}"`
                        );
                      }

                      if (succ.length < 1) {
                        //send error
                      }
                    }
                  );
                }
              }
            );
          }
        }
      )
    : connectionNew.query(
        `UPDATE menu SET nom = "${req.body.title}", formule = "${req.body.formule}" WHERE  nom = "${req.body.oldTitle}"`
      );
});

app.get("/carteapi", (req, res) => {
  let connectionNew = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecfprojet",
  });

  connectionNew.query("SELECT * FROM `entree`", (error, entree) => {
    error ? console.log(error) : null;
    connectionNew.query("SELECT * FROM `plat`", (error, plat) => {
      error ? console.log(error) : null;
      connectionNew.query("SELECT * FROM `dessert`", (error, dessert) => {
        error ? console.log(error) : null;
        connectionNew.query("SELECT * FROM `menu`", (error, menu) => {
          error ? console.log(error) : null;
          res.send({ entree, plat, dessert, menu });
        });
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

  connectionNew.query(
    `INSERT INTO reserver (id, convive, date, heures, nom, email, alergie) VALUES (null,${values[0]},"${values[1]}","${values[4]}","${values[3]}","${values[2]}","${values[5]}")`
  );
});

app.listen(PORT, () => {
  console.log("hello " + PORT);
});
