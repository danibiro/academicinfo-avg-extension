//* Checks if language class is present or not

function checkIfIsLanguage(str) {
  const languages = [
    "engleză",
    "germană",
    "spaniolă",
    "italiană",
    "rusă",
    "japoneză",
  ];
  for (const language in languages) {
    if (str.includes(language)) {
      return true;
    }
  }
  return false;
}

//* ID of main table
const table = document.getElementById("ctl00_ContentPlaceHolder1_gvNote");

//* RegEx of grade IDs
const regex = /ctl00_ContentPlaceHolder1_gvNote_ctl[0-9]{2}_lblnota/;

//* Sum of grades
let sum = 0;
let nr_of_credits = 0;

table.querySelector("tbody").childNodes.forEach((tr) => {
  tr.childNodes.forEach((td) => {
    if (td.nodeName === "TD") {
      const span = td.querySelector("b > span");
      if (
        span !== null &&
        regex.test(span.id) &&
        !checkIfIsLanguage(tr.childNodes[5].textContent)
      ) {
        const credit = tr.childNodes[7].textContent;
        const grade = span.textContent;
        const grade_conv = parseInt(grade) || 0;
        const credit_conv = grade_conv === 0 ? 0 : parseInt(credit);
        sum += credit_conv * grade_conv;
        nr_of_credits += credit_conv;
      }
    }
  });
});

//* This part adds the main average element

const h2tags = document.querySelectorAll("h2");

const completed = false;

h2tags.forEach((h2) => {
  if (h2.textContent.includes("Sectia") && h2.textContent.includes("Grupa")) {
    console.log(sum, nr_of_credits);
    h2.insertAdjacentText("afterend", "Average: " + sum / nr_of_credits);
  }
});
