const button = document.getElementsByTagName("button")[0];
const inputs = document.getElementsByTagName("input");
const dayResult = document.querySelector("#day-result");
const monthResult = document.querySelector("#month-result");
const yearResult = document.querySelector("#year-result");
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const gene = document.querySelector(".gene");

// checking the length of the input value
const handleCheckInputVal = (input) => {
  if (input.value.length === 1) {
    return `0${input.value}`;
  } else {
    return input.value;
  }
};
// function to calculate the inputed age
const handleCalculateAge = () => {
  const inputedAge = `${handleCheckInputVal(yearInput)}-${handleCheckInputVal(
    monthInput
  )}-${handleCheckInputVal(dayInput)}`;
  const diff = new Date().getTime() - new Date(inputedAge).getTime();
  const totalMilSecInYear = 31556952000;
  const totalMilSecInMonth = 2629746000;
  const totalMilSecInDay = 86400000;
  const years = Math.floor(diff / totalMilSecInYear);
  const month = Math.floor((diff % totalMilSecInYear) / totalMilSecInMonth);
  const day = Math.floor(
    ((diff % totalMilSecInYear) % totalMilSecInMonth) / totalMilSecInDay
  );
  dayResult.innerText = `${day}`;
  monthResult.innerText = `${month}`;
  yearResult.innerText = `${years}`;
  if (yearInput && dayInput && monthInput) {
    gene.style.opacity = 1;
    if(+yearInput.value < 1945) {
      gene.innerText = "HEYY YOU'RE FROM THE SILENT GENERATION";
      // gene.style.backgroundColor = "gray";
      // gene.style.color = "white";
    } else if(+yearInput.value <= 1964 && +yearInput.value > 1945) {
      gene.innerText = "HEYY YOU'RE A BABY BOOMER"
      // gene.style.backgroundColor = "hsl(259, 100%, 65%)";
      // gene.style.color = "white";
    } else if(+yearInput.value <= 1980 && +yearInput.value > 1964) {
      gene.innerText = "HEYY THERE GOES A GEN X"
      // gene.style.backgroundColor = "hsl(259, 100%, 65%)";
      // gene.style.color = "white";
    }else if(+yearInput.value <= 1996 && +yearInput.value > 1980) {
      gene.innerText = "HEYY YOU'RE A MILLENNIALS"
      // gene.style.backgroundColor = "hsl(0, 100%, 67%)";
      // gene.style.color = "white";
    }else if(+yearInput.value <= 2012 && +yearInput.value > 1996) {
      gene.innerText = "HEYY YOU'RE A GEN Z (“Zoomers”)"
      // gene.style.backgroundColor = "hsl(259, 100%, 65%)";
      // gene.style.color = "white";
    } else {
      gene.innerText = "HEYY GEN ALPHA THE WORLD IS YOURS FOR THE TAKING!!!"
      // gene.style.backgroundColor = "hsl(0, 1%, 44%)";
      // gene.style.color = "hsl(0, 0%, 100%)";
    }
  } else {
    gene.style.opacity = 0
  }
  
  
};

const months = [
  {
    name: "January",
    id: 0,
    days: 31,
  },
  {
    name: "February",
    id: 1,
    days: 28,
  },
  {
    name: "March",
    id: 2,
    days: 31,
  },
  {
    name: "April",
    id: 3,
    days: 30,
  },
  {
    name: "May",
    id: 4,
    days: 31,
  },
  {
    name: "June",
    id: 5,
    days: 30,
  },
  {
    name: "July",
    id: 6,
    days: 31,
  },
  {
    name: "August",
    id: 7,
    days: 31,
  },
  {
    name: "September",
    id: 8,
    days: 30,
  },
  {
    name: "October",
    id: 9,
    days: 31,
  },
  {
    name: "November",
    id: 10,
    days: 30,
  },
  {
    name: "December",
    id: 11,
    days: 31,
  },
];
// validation for day input
dayInput.addEventListener("keyup", (e) => {
  let errorTag = dayInput.nextElementSibling;
  let label = dayInput.parentElement.firstElementChild;
  gene.style.opacity = 0;
  if (e.target.value.length > 2) {
    e.target.value = e.target.value.slice(0, 2);
  }
  if (+e.target.value > 31 || +e.target.value < 1) {
    errorTag.style.display = "block";
    label.style.color = "hsl(0, 100%, 67%)";
    dayInput.style.outline = "1px solid hsl(0, 100%, 67%)";
    errorTag.innerText = "Must be a valid day";
  } else {
    if (monthInput.value) {
      const inputedMonth = months.filter(
        (month) => month.id === +monthInput.value - 1
      )[0];
      if (+e.target.value > inputedMonth.days) {
        errorTag.style.display = "block";
        label.style.color = "hsl(0, 100%, 67%)";
        dayInput.style.outline = "1px solid hsl(0, 100%, 67%)";
        errorTag.innerText = "Must be a valid day";
      } else {
        errorTag.style.display = "none";
      label.style.color = "hsl(0, 1%, 44%)";
      dayInput.style.outline = "1px solid hsl(0, 0%, 86%)";
      }
    } else {
      errorTag.style.display = "none";
      label.style.color = "hsl(0, 1%, 44%)";
      dayInput.style.outline = "1px solid hsl(0, 0%, 86%)";
    }
  }
});

// validation for month input
monthInput.addEventListener("keyup", (e) => {
  let errorTag = monthInput.nextElementSibling;
  let label = monthInput.parentElement.firstElementChild;
  gene.style.opacity = 0;
  if (e.target.value.length > 2) {
    e.target.value = e.target.value.slice(0, 2);
    // monthInput.setAttribute("disabled", true)
  }
  if (+e.target.value > 12 || +e.target.value < 1) {
    errorTag.style.display = "block";
    label.style.color = "hsl(0, 100%, 67%)";
    monthInput.style.outline = "1px solid hsl(0, 100%, 67%)";
    errorTag.innerText = "Must be a valid month";
  } else {
    const inputedMonth = months.filter(
      (month) => month.id === +e.target.value - 1
    )[0];
    let dayinputError = dayInput.nextElementSibling;
    let dayinputLabel = dayInput.parentElement.firstElementChild;
    if (dayInput.value && +dayInput.value > inputedMonth.days) {
      dayinputError.style.display = "block";
      dayinputError.innerText = "Must be a valid day";
      dayinputLabel.style.color = "hsl(0, 100%, 67%)";
      dayInput.style.outline = "1px solid hsl(0, 100%, 67%)";
    } else {
      dayinputError.style.display = "none";
      dayinputLabel.style.color = "hsl(0, 1%, 44%)";
      dayInput.style.outline = "1px solid hsl(0, 0%, 86%)";
    }
    errorTag.style.display = "none";
    label.style.color = "hsl(0, 1%, 44%)";
    monthInput.style.outline = "1px solid hsl(0, 0%, 86%)";
  }
});

// validation for year input
yearInput.addEventListener("keyup", (e) => {
  let errorTag = yearInput.nextElementSibling;
  let label = yearInput.parentElement.firstElementChild;
  gene.style.opacity = 0;
  if (e.target.value.length >= 4) {
    e.target.value = e.target.value.slice(0, 4);
    // check if year is in the past
    if (+e.target.value > new Date().getFullYear()) {
      errorTag.style.display = "block";
      label.style.color = "hsl(0, 100%, 67%)";
      yearInput.style.outline = "1px solid hsl(0, 100%, 67%)";
      errorTag.innerText = "Must be in the past";
    } else {
      errorTag.style.display = "none";
      label.style.color = "hsl(0, 1%, 44%)";
      yearInput.style.outline = "1px solid hsl(0, 0%, 86%)";
    }
  }

  if (e.target.value.length < 4) {
    errorTag.style.display = "block";
    label.style.color = "hsl(0, 100%, 67%)";
    yearInput.style.outline = "1px solid hsl(0, 100%, 67%)";
    errorTag.innerText = "Must be a valid year";
  }
});

const checkEmptyInputValue = () => {
  let inputs = Array.from(document.getElementsByTagName("input"));
  if (
    dayInput.value === "" ||
    monthInput.value === "" ||
    yearInput.value === ""
  ) {
    inputs.slice(0, 3).forEach((input) => {
      if (input.value === "") {
        let inputError = input.nextElementSibling;
        let label = input.parentElement.firstElementChild;
        label.style.color = "hsl(0, 100%, 67%)";
        inputError.innerText = "This field is required";
        inputError.style.display = "block";
        input.style.outline = "1px solid hsl(0, 100%, 67%)";
      }
    });
    return true;
  } else {
    inputs.forEach((input) => {
      let inputError = input.nextElementSibling;
      let label = input.parentElement.firstElementChild;
      label.style.color = "hsl(0, 1%, 44%)";
      inputError.style.display = "none";
      input.style.outline = "1px solid hsl(0, 0%, 86%)";
    });
    return false;
  }
};

button.addEventListener("click", () => {
  if (!checkEmptyInputValue() && yearInput.value.length === 4) {
    handleCalculateAge();
  }
});
