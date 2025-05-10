function generateSchedule() {
  const year = parseInt(document.getElementById("year").value);
    const cycle = [
    "B", "R", "A", "A", "A", "R", "V", "V", "V", "R", "N", "N", "N", "R", "R", "R", "B", "B", "B", "R", "A", 
    "A", "A", "R", "R", "R", "R", "R", "N", "N", "N", "R", "R", "R", "B", "B", "B", "R", "A", "A", "A", "R", 
    "V", "V", "R", "R", "N", "N", "N", "R", "R", "R", "B", "B", "B", "R", "A", "A", "A", "R", "R", "R", "R", 
    "R", "N", "N", "N", "R", "R", "R", "B", "B", "B", "R", "A", "A", "A", "R", "V", "V", "R", "R", "N", "N", 
    "N", "R", "R", "R", "B", "B", "B", "R", "A", "A", "A", "R", "V", "V", "R", "R", "N", "N", "N", "R", "R", 
    "R", "B", "B", "B", "R", "A", "A", "A", "R", "R", "R", "R", "R", "N", "N", "N", "R", "R", "R", "B", "B"
];
  const cycleLength = cycle.length; // 126 jours

  const startDate = new Date(year, 0, 1);
  const baseDate = new Date(2025, 0, 1); // Le cycle commence officiellement le 01/01/2025
  const baseOffset = 43; // Décalage initial : 43 jours = cycle commence sur V

  // Calcul du décalage pour n'importe quelle année
  const daysSinceBase = Math.floor((startDate - baseDate) / (1000 * 60 * 60 * 24));
  const startOffset = (baseOffset + daysSinceBase) % cycleLength;

  const planningContainer = document.getElementById("planning");
  planningContainer.innerHTML = "";

  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const totalDays = isLeapYear ? 366 : 365;

  for (let i = 0; i < totalDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const dayOfCycle = cycle[(i + startOffset + cycleLength) % cycleLength];

    const planningEntry = document.createElement("div");
    planningEntry.classList.add("planning-entry");

    if (dayOfCycle === 'R') {
      planningEntry.classList.add("gray-background");
    }

    const dateElement = document.createElement("span");
    dateElement.classList.add("date");
    dateElement.textContent = currentDate.toLocaleDateString();

    const cycleDayElement = document.createElement("span");
    cycleDayElement.classList.add("cycle-day");
    cycleDayElement.textContent = dayOfCycle;

    planningEntry.appendChild(dateElement);
    planningEntry.appendChild(cycleDayElement);

    planningContainer.appendChild(planningEntry);
  }
}
