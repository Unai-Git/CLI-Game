//*Importaciones de terceros
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";
import figlet from "figlet";

//*Variables
let playerName;
let contador = 0;

//Tiempo de espera para mostrar las reglas
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

//Entrada(titulo) del juego
async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "¿SEGURO QUE SABES COMO FUNCIONA EL JUEGO ?"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
  ${chalk.bgBlue("Reglas:")}
  -Si te sabes las preguntas ${chalk.green("ganas")}.
  -Si no te sabes las preguntas ${chalk.red("pierdes")}.
  `);
}

//*Nombre del concursante
async function askName() {
  const answer = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "Introduce el nombre del jugador:",
    default() {
      return "Player 1";
    },
  });

  playerName = answer.player_name;
}

//*Preguntas

async function question1() {
  const answer = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: `${chalk.bgYellow(" ¿Que es chalk? ")}`,
    choices: [
      "Para diseñar el formato del texto y nos permite crear nuestros propios temas.",
      "Una colección de interfaces de usuario de línea de comando interactivas comunes.",
      "Ninguna de las dos.",
    ],
  });

  //Respuesta correcta
  return handleAnswer(
    answer.question_1 ==
      "Para diseñar el formato del texto y nos permite crear nuestros propios temas."
  );
}

async function question2() {
  contador++;
  const answer = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: " ¿Que es inquirer?",
    choices: [
      "Para crear formularios.",
      "Para reiniciar la consola.",
      "Ninguna de las dos.",
    ],
  });

  //Respuesta correcta
  return handleAnswer(answer.question_2 == "Ninguna de las dos.");
}

async function question3() {
  contador++;
  const answer = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: " ¿Finalidad del juego?",
    choices: [
      "Almacenar mas basura en Github.",
      "Repasar conceptos de Node.js.",
      "Las dos son correctas.",
    ],
  });

  //Respuesta correcta
  return handleAnswer(answer.question_3 == "Repasar conceptos de Node.js.");
}

//*Crear suspense con un loading(spinner)
async function handleAnswer(isCorrect) {
  const spinner = createSpinner("checking answer...").start();

  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `${chalk.greenBright(
        "Respuesta correcta, sigue asi " + playerName
      )}`,
    });
  } else {
    spinner.error({
      text: `${
        chalk.redBright(
          "Respuesta incorrecta " + playerName + "tienes que mejorar. "
        ) + chalk.bgRed(" Puntuación:" + contador + " ")
      }`,
    });
    /*
    *Succes = 0
    !Error = 1
    */
    process.exit(1);
  }
}

function winner() {
  contador++;
  console.clear();
  const msg = `Ganador, ${playerName}`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
    console.log(
      gradient.pastel.multiline(
        "----------------------------------------------------------------------------------"
      )
    );
    console.log(
      gradient.pastel.multiline(
        `                          Puntuación = ${contador} 🥳 🏆 🥳`
      )
    );
    console.log(
      gradient.pastel.multiline(
        "----------------------------------------------------------------------------------"
      )
    );
  });
}

//*Limpiar consola
console.clear();

//*Menu Principal
await welcome();

//*Nombre del Jugador
await askName();

//*Preguntas
await question1();
await question2();
await question3();

//*Mostrar Ganador
winner();
sleep();
