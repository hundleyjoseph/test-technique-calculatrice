import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  var champCalcul = "";
  var nouveauRésultat = false;
  const boutonClick = (event) => {
    if (champCalcul == "Erreur") {
      champCalcul = "";
    }
    // solution de https://stackoverflow.com/questions/42981067/applying-a-function-to-all-buttons
    if (event.target.tagName === 'BUTTON') {
      const buttonText = event.target.textContent;
      const opérateurs = ["+", "-", "×", "÷", "%", "!", "^", "π", "Mod"]
      switch (buttonText) {
        case '\u232B':
          if (champCalcul.length != 0) {
            if (champCalcul.endsWith("Mod")) {
              champCalcul = champCalcul.substring(0, champCalcul.length - 3);
            } else {
              champCalcul = champCalcul.substring(0, champCalcul.length - 1);
            }
          }
          if (champCalcul.length == 1 && champCalcul.valueOf(0) == "-") {
            champCalcul = "";
          }
          break;

        case '=':
          var résultat = calculer(document.getElementById("champCalcul").innerHTML);
          champCalcul = résultat;
          nouveauRésultat = true;
          break;

        case 'AC':
          champCalcul = "";
          break;

        case '+/-':
          if (champCalcul.charAt(0) == '-') {
            champCalcul = champCalcul.slice(1);
          } else {
            champCalcul = "-" + champCalcul
          }
          break;

        default:
          if (nouveauRésultat == true) {
            if (!opérateurs.includes(buttonText)) {
              champCalcul = "";
            }
            nouveauRésultat = false;
          }
          champCalcul += buttonText;
      }

      document.getElementById("champCalcul").innerHTML = champCalcul;
      document.getElementById("champCalcul").classList.add('overflow-y-hidden');
      document.getElementById("champCalcul").classList.add('overflow-auto');

      var équationEnCours = calculer(document.getElementById("champCalcul").innerHTML);
      if (équationEnCours != "Erreur" && champCalcul != équationEnCours) {
        document.getElementById("champRésultat").innerHTML = équationEnCours;
      } else {
        document.getElementById("champRésultat").innerHTML = "";
      }
    }
  };

  //fonction venant de https://www.educative.io/answers/how-to-find-the-factorial-of-a-number-in-javascript
  function factorial(n) {
    if (n < 0) {
      return "number has to be positive."
    }
    //base case
    if (n == 0 || n == 1) {
      return 1;
      //recursive case
    } else {
      return n * factorial(n - 1);
    }
  }

  function calculer(équationChamp) {
    var calculerÉquation = équationChamp;
    const nombres = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "π"]
    calculerÉquation = calculerÉquation.replace(/×/g, "*");
    calculerÉquation = calculerÉquation.replace(/÷/g, "/");
    calculerÉquation = calculerÉquation.replace(/\^/g, "**");

    var listeÉquation = calculerÉquation.split('');
    for (let index = 0; index < listeÉquation.length; index++) {
      const item = listeÉquation[index];
      if (item == "π" && nombres.includes(calculerÉquation[index - 1])) {
        listeÉquation[index] = "*π";
      }
      if (item == "π" && nombres.includes(calculerÉquation[index + 1])) {
        listeÉquation[index] += "*";
      }
      if (item == "√" && nombres.includes(calculerÉquation[index - 1])) {
        listeÉquation[index] = "*√";
      }
      if (item == "!" && nombres.includes(calculerÉquation[index + 1])) {
        listeÉquation[index] = "!*";
      }
      if (item == "(" && nombres.includes(calculerÉquation[index - 1])) {
        listeÉquation[index] = "*(";
      }
      if (item == ")" && nombres.includes(calculerÉquation[index + 1])) {
        listeÉquation[index] = ")*";
      }
      if (item == "%" && nombres.includes(calculerÉquation[index + 1])) {
        listeÉquation[index] = "%*";
      }

    }

    calculerÉquation = listeÉquation.join("");
    calculerÉquation = calculerÉquation.replace(/π/g, "(" + Math.PI + ")");
    var listeRemplacer = calculerÉquation.split('');
    for (let index = 0; index < listeRemplacer.length; index++) {
      const item = listeRemplacer[index];
      if (item == "√") {
        var nombreCalcule = "";
        var parcourirRoot = true;
        for (let sousIndex = index + 1; sousIndex < listeRemplacer.length; sousIndex++) {
          if ((nombres.includes(listeRemplacer[sousIndex])) && parcourirRoot) {
            nombreCalcule += listeRemplacer[sousIndex];
          } else {
            parcourirRoot = false;
          }
        }
        // Pour ne pas afficher simplement √ comme 0
        if (nombreCalcule == "") {
          nombreCalcule = "O"
        }
        calculerÉquation = listeRemplacer.join('')
        calculerÉquation = calculerÉquation.replace("√" + nombreCalcule, Math.sqrt(nombreCalcule))
        listeRemplacer = calculerÉquation.split('');

      }

      if (item == "!") {
        var nombreCalcule = "";
        var parcourirRoot = true;
        for (let sousIndex = index - 1; sousIndex >= 0; sousIndex--) {
          if ((nombres.includes(listeRemplacer[sousIndex])) && parcourirRoot) {
            nombreCalcule = listeRemplacer[sousIndex] + nombreCalcule;
          } else {
            parcourirRoot = false;
          }
        }
        calculerÉquation = listeRemplacer.join('')
        calculerÉquation = calculerÉquation.replace(nombreCalcule + "!", factorial(nombreCalcule))
        listeRemplacer = calculerÉquation.split('');
      }

      if (item == "%") {
        var nombreCalcule = "";
        var parcourirRoot = true;
        for (let sousIndex = index - 1; sousIndex >= 0; sousIndex--) {
          if ((nombres.includes(listeRemplacer[sousIndex])) && parcourirRoot) {
            nombreCalcule = listeRemplacer[sousIndex] + nombreCalcule;
          } else {
            parcourirRoot = false;
          }
        }
        calculerÉquation = listeRemplacer.join('')
        calculerÉquation = calculerÉquation.replace(nombreCalcule + "%", (nombreCalcule / 100))
        listeRemplacer = calculerÉquation.split('');
      }
    }
    calculerÉquation = listeRemplacer.join('')
    calculerÉquation = calculerÉquation.replace(/Mod/g, "%");
    try {
      return eval(calculerÉquation).toString();
    } catch (error) {
      return "Erreur";
    }
  }


  return (
    <main className="h-screen flex justify-center items-center">
      <div className="w-full max-w-full flex justify-center items-center h-full lg:h-4/5">
        <div className="h-full w-full lg:w-2/6">
          <div className="hidden lg:block text-center text-2xl">Test technique - Calculatrice</div>
          <table className="bg-gray-600 border border-gray-400 w-full h-full" style={{ tableLayout: 'fixed' }}>
            <tbody onClick={boutonClick}>
              <tr>
                <td colSpan="4" className="border border-gray-400 w-full h-56 lg:h-38 "><div className="text-6xl " id="champCalcul"></div><div className="text-3xl" id="champRésultat"></div></td>
              </tr>
              <tr>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">AC</button></td>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">π</button></td>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">^</button></td>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">{'\u232B'}</button></td>
              </tr>
              <tr>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">!</button></td>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">(</button></td>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">)</button></td>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">%</button></td>
              </tr>
              <tr>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">√</button></td>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">+/-</button></td>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">Mod</button></td>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">÷</button></td>
              </tr>
              <tr>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">7</button></td>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">8</button></td>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">9</button></td>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">×</button></td>
              </tr>
              <tr>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">4</button></td>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">5</button></td>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">6</button></td>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">-</button></td>
              </tr>
              <tr>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">1</button></td>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">2</button></td>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">3</button></td>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">+</button></td>
              </tr>
              <tr>
                <td colSpan="2"><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">0</button></td>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">.</button></td>
                <td><button className="border border-gray-400 w-full h-full text-xl hover:bg-gray-300 active:bg-gray-400">=</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
