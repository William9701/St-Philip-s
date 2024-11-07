document.addEventListener("DOMContentLoaded", function () {
  // Toggle forms for toggleCheckbox3
  const toggleCheckbox3 = document.getElementById("dark-mode-toggle3");
  const martinForm3 = document.getElementById("SnMartinForm");
  const eucaruisticForm3 = document.getElementById("SnEucaristicForm");

  if (toggleCheckbox3 && martinForm3 && eucaruisticForm3) {
    function toggleForms3() {
      if (toggleCheckbox3.checked) {
        martinForm3.style.display = "block";
        eucaruisticForm3.style.display = "none";
      } else {
        martinForm3.style.display = "none";
        eucaruisticForm3.style.display = "block";
      }
    }
    toggleCheckbox3.addEventListener("change", toggleForms3);
  }

  // Toggle forms for toggleCheckbox2
  const toggleCheckbox2 = document.getElementById("dark-mode-toggle2");
  const martinForm2 = document.getElementById("ssMartinForm");
  const eucaruisticForm2 = document.getElementById("ssEucaristicForm");

  if (toggleCheckbox2 && martinForm2 && eucaruisticForm2) {
    function toggleForms1() {
      if (toggleCheckbox2.checked) {
        martinForm2.style.display = "none";
        eucaruisticForm2.style.display = "block";
      } else {
        martinForm2.style.display = "block";
        eucaruisticForm2.style.display = "none";
      }
    }
    toggleCheckbox2.addEventListener("change", toggleForms1);
  }

  // Toggle forms for toggleCheckbox
  const toggleCheckbox = document.getElementById("dark-mode-toggle");
  const martinForm = document.getElementById("MartinForm");
  const eucaruisticForm = document.getElementById("EucaristicForm");

  if (toggleCheckbox && martinForm && eucaruisticForm) {
    function toggleForms() {
      if (toggleCheckbox.checked) {
        martinForm.style.display = "block";
        eucaruisticForm.style.display = "none";
      } else {
        martinForm.style.display = "none";
        eucaruisticForm.style.display = "block";
      }
    }
    toggleCheckbox.addEventListener("change", toggleForms);
  }

  let service_check = document
    .getElementById("smartwizard")
    .getAttribute("data-id");

  if (service_check == "double") {
    let dailyInfoCount1 = 10;
    let buttonInfoCount1 = 10;
    let familyNameCount1 = 10;
    let brideGroomCount1 = 10;

    // Add more Daily Info input fields
    document
      .getElementById("addDailyInfo1")
      .addEventListener("click", function () {
        dailyInfoCount1++;

        const newDailyInfo = document.createElement("div");
        newDailyInfo.className = "form-group1 row mb-3";
        newDailyInfo.innerHTML = `
              <div class="col-md-5">
                <label for="1date${dailyInfoCount1}">Date</label>
                <input type="date" class="form-control" id="1date${dailyInfoCount1}" required />
              </div>
              <div class="col-md-7">
                <label for="1dailyInfo${dailyInfoCount1}">Daily Info</label>
                <input type="text" class="form-control" id="1dailyInfo${dailyInfoCount1}" placeholder="Enter daily info" required />
              </div>
            `;

        document
          .getElementById("dailyInfoContainer1")
          .appendChild(newDailyInfo);
      });

    // Add more Button Info input fields
    document
      .getElementById("addButtonInfo1")
      .addEventListener("click", function () {
        buttonInfoCount1++;

        const newButtonInfo = document.createElement("div");
        newButtonInfo.className = "form-group1 mb-3";
        newButtonInfo.innerHTML = `
              <input type="text" class="form-control" id="1buttonInfo${buttonInfoCount1}" placeholder="Enter button info" required />
            `;

        document
          .getElementById("buttonInfoContainer1")
          .appendChild(newButtonInfo);
      });

    // Add more Family Name input fields
    document
      .getElementById("addFamilyName1")
      .addEventListener("click", function () {
        familyNameCount1++;

        const newFamilyName = document.createElement("div");
        newFamilyName.className = "form-group1 mb-3";
        newFamilyName.innerHTML = `
              <input type="text" class="form-control" id="1familyName${familyNameCount1}" placeholder="Enter family name" required />
            `;

        document
          .getElementById("familyNamesContainer1")
          .appendChild(newFamilyName);
      });

    // Add more Bride/Groom Info input fields
    document
      .getElementById("addBrideGroom1")
      .addEventListener("click", function () {
        brideGroomCount1++;

        const newBrideGroom = document.createElement("div");
        newBrideGroom.className = "form-group1 row mb-3";
        newBrideGroom.innerHTML = `
              <div class="col-md-4">
                <label for="1brideName${brideGroomCount1}">Bride's Name</label>
                <input type="text" class="form-control" id="1brideName${brideGroomCount1}" placeholder="Enter bride's name" required />
              </div>
              <div class="col-md-4">
                <label for="1groomName${brideGroomCount1}">Groom's Name</label>
                <input type="text" class="form-control" id="1groomName${brideGroomCount1}" placeholder="Enter groom's name" required />
              </div>
              <div class="col-md-4">
                <label for="1timeOfAsking${brideGroomCount1}">Time of Asking</label>
                <select class="form-control" id="1timeOfAsking${brideGroomCount1}" required>
                  <option value="" disabled selected>Select time of asking</option>
                  <option value="First">First</option>
                  <option value="Second">Second</option>
                  <option value="Third">Third and Final</option>
                </select>
              </div>
            `;

        document
          .getElementById("brideGroomContainer1")
          .appendChild(newBrideGroom);
      });
  } else {
    let dailyInfoCount = 10;
    let buttonInfoCount = 10;
    let familyNameCount = 10;
    let brideGroomCount = 10;

    // Add more Daily Info input fields
    document
      .getElementById("addDailyInfo")
      .addEventListener("click", function () {
        dailyInfoCount++;

        const newDailyInfo = document.createElement("div");
        newDailyInfo.className = "form-group row mb-3";
        newDailyInfo.innerHTML = `
            <div class="col-md-5">
              <label for="date${dailyInfoCount}">Date</label>
              <input type="date" class="form-control" id="date${dailyInfoCount}" required />
            </div>
            <div class="col-md-7">
              <label for="dailyInfo${dailyInfoCount}">Daily Info</label>
              <input type="text" class="form-control" id="dailyInfo${dailyInfoCount}" placeholder="Enter daily info" required />
            </div>
          `;

        document.getElementById("dailyInfoContainer").appendChild(newDailyInfo);
      });

    // Add more Button Info input fields
    document
      .getElementById("addButtonInfo")
      .addEventListener("click", function () {
        buttonInfoCount++;

        const newButtonInfo = document.createElement("div");
        newButtonInfo.className = "form-group mb-3";
        newButtonInfo.innerHTML = `
            <input type="text" class="form-control" id="buttonInfo${buttonInfoCount}" placeholder="Enter button info" required />
          `;

        document
          .getElementById("buttonInfoContainer")
          .appendChild(newButtonInfo);
      });

    // Add more Family Name input fields
    document
      .getElementById("addFamilyName")
      .addEventListener("click", function () {
        familyNameCount++;

        const newFamilyName = document.createElement("div");
        newFamilyName.className = "form-group mb-3";
        newFamilyName.innerHTML = `
            <input type="text" class="form-control" id="familyName${familyNameCount}" placeholder="Enter family name" required />
          `;

        document
          .getElementById("familyNamesContainer")
          .appendChild(newFamilyName);
      });

    // Add more Bride/Groom Info input fields
    document
      .getElementById("addBrideGroom")
      .addEventListener("click", function () {
        brideGroomCount++;

        const newBrideGroom = document.createElement("div");
        newBrideGroom.className = "form-group row mb-3";
        newBrideGroom.innerHTML = `
            <div class="col-md-4">
              <label for="brideName${brideGroomCount}">Bride's Name</label>
              <input type="text" class="form-control" id="brideName${brideGroomCount}" placeholder="Enter bride's name" required />
            </div>
            <div class="col-md-4">
              <label for="groomName${brideGroomCount}">Groom's Name</label>
              <input type="text" class="form-control" id="groomName${brideGroomCount}" placeholder="Enter groom's name" required />
            </div>
            <div class="col-md-4">
              <label for="timeOfAsking${brideGroomCount}">Time of Asking</label>
              <select class="form-control" id="timeOfAsking${brideGroomCount}" required>
                <option value="" disabled selected>Select time of asking</option>
                <option value="First">First</option>
                <option value="Second">Second</option>
                <option value="Third">Third and Final</option>
              </select>
            </div>
          `;

        document
          .getElementById("brideGroomContainer")
          .appendChild(newBrideGroom);
      });
  }
});

async function DeleteData(cls, data) {
  try {
    const response = await fetch(`/${cls}/${data}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    // location.reload();
  } catch (error) {
    console.error("Failed to delete data:", error);
  }
}


let service_check = document
    .getElementById("smartwizard")
    .getAttribute("data-id");

if (service_check == "double") {
  document.addEventListener("DOMContentLoaded", function () {
    // Fetch the 'Create Bulletin' button
    const createBulletinButton = document.querySelector(
      "#meditationForm1 button[type='submit']"
    );

    createBulletinButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent form submission
      createBulletinButton.style.background = "green";
      const isFistServiceEucharisticFormVisible =
        document.getElementById("EucaristicForm").style.display === "block";
      const isFirstServiceMartinFormVisible =
        document.getElementById("MartinForm").style.display === "block";
      const isSecondServiceEucharisticFormVisible =
        document.getElementById("ssEucaristicForm").style.display === "block";
      const isSecondServiceMartinFormVisible =
        document.getElementById("ssMartinForm").style.display === "block";

      // Function to get form data by id
      function getInputValue(id) {
        const element = document.getElementById(id);
        return element ? element.value : "";
      }

      const textarea = document.getElementById("collect1");
      const dataId = textarea.getAttribute("data-id");

      // Collect data from each step
      const bulletinData = {
        step1: {},
        step2: {},
        step3: {
          service_id: dataId,
          collect: getInputValue("collect1"),
          dailyInfo: [],
          buttonInfo: [],
          familyNames: [],
          brideGroom: [],
        },
        step4: {
          meditationTopic: getInputValue("meditationTopic1"),
          meditationText: getInputValue("meditationText1"),
          message: getInputValue("message1"),
        },
      };

      // Step 1 - Collect data from the first service forms
      if (isFistServiceEucharisticFormVisible) {
        bulletinData.step1 = {
          service_type: "Eucharistic",
          sundayName: getInputValue("sundayName1"),
          liturgicalColor: getInputValue("litColor1"),
          sundayDate: getInputValue("sundayDate1"),
          sundayTime: getInputValue("sundayTime1"),
          psalm: getInputValue("psalm1"),
          specialEvent: getInputValue("specialEvent1"),
          processionalHymn: getInputValue("processionalHymn1"),
          oldTestReading: getInputValue("OldReading"),
          espistle: getInputValue("epistle1"),
          gradualHymn: getInputValue("gradualHymn1"),
          gospel: getInputValue("gospel1"),
          communionHymn: getInputValue("communionHymn1"),
          specialThanksgiving: getInputValue("specialThanksgiving1"),
          aob: getInputValue("aob1"),
          recessionalHymn: getInputValue("recessionalHymn1"),
        };
      } else if (isFirstServiceMartinFormVisible) {
        bulletinData.step1 = {
          service_type: "Martin",
          sundayName: getInputValue("sundayName2"),
          liturgicalColor: getInputValue("litColor2"),
          sundayDate: getInputValue("sundayDate2"),
          sundayTime: getInputValue("sundayTime2"),
          psalm: getInputValue("fspsalm"),
          specialEvent: getInputValue("specialEvent2"),
          processionalHymn: getInputValue("processionalHymn2"),
          firstLesson: getInputValue("fSfirstlesson"),
          gradualHymn: getInputValue("gradualHymn2"),
          secondLesson: getInputValue("fsSecondlesson"),
          sermonHymn: getInputValue("fsSermonhymn"),
          specialThanksgiving: getInputValue("specialThanksgiving2"),
          aob: getInputValue("aob2"),
          recessionalHymn: getInputValue("recessionalHymn2"),
        };
      }

      // Step 2 - Collect data from the second service forms
      if (isSecondServiceEucharisticFormVisible) {
        bulletinData.step2 = {
          service_type: "Eucharistic",
          sundayTime: getInputValue("ssSecondsundayTimeEucaristic"),
          oldTestReading: getInputValue("ssOldReadingEucaristic"),
          gradualHymn: getInputValue("ssgradualhymnEucaristic"),
          psalm: getInputValue("sspsalmEucaristic"),
          espistle: getInputValue("ssepistle1Eucaristic"),
          gospel: getInputValue("ssGospel1Eucaristic"),
          communionHymn: getInputValue("sscommunionHymn1Eucaristic"),
          specialThanksgiving2: getInputValue("specialThanksgiving1Eucaristic"),
          aob2: getInputValue("aob1Eucaristic"),
        };
      } else if (isSecondServiceMartinFormVisible) {
        bulletinData.step2 = {
          service_type: "Martin",
          sundayTime: getInputValue("SecondsundayTimeMartin"),
          psalm: getInputValue("psalm1Martin"),
          gradualHymn: getInputValue("gradualhymnMartin1"),
          firstLesson: getInputValue("firstLesson1Martin"),
          secondLesson: getInputValue("secondLesson1Martin"),
          sermonHymn: getInputValue("sermonHymn1Martin"),
          specialThanksgiving2: getInputValue("specialThanksgivingMartin"),
          aob2: getInputValue("aob1Martin"),
        };
      }

      // Step 3 - Collect multiple input fields dynamically added
      document
        .querySelectorAll("#dailyInfoContainer1 .row")
        .forEach((row, index) => {
          bulletinData.step3.dailyInfo.push({
            id: row.getAttribute("data-id"),
            date: row.querySelector("input[type='date']").value,
            dailyInfo: row.querySelector("input[type='text']").value,
          });
        });

      document
        .querySelectorAll("#buttonInfoContainer1 .form-group1 input")
        .forEach((input, index) => {
          const data = {
            id: input.getAttribute("data-id"),
            value: input.value,
          };
          bulletinData.step3.buttonInfo.push(data);
        });

      document
        .querySelectorAll("#familyNamesContainer1 .form-group1 input")
        .forEach((input, index) => {
          const fdata = {
            id: input.getAttribute("data-id"),
            value: input.value,
          };
          bulletinData.step3.familyNames.push(fdata);
        });

      document
        .querySelectorAll("#brideGroomContainer1 .row")
        .forEach((row, index) => {
          bulletinData.step3.brideGroom.push({
            id: row.getAttribute("data-id"),
            brideName: row.querySelector("input[id^='1brideName']").value,
            groomName: row.querySelector("input[id^='1groomName']").value,
            timeOfAsking: row.querySelector("select[id^='1timeOfAsking']")
              .value,
          });
        });

      console.log("Bulletin Data Collected:", bulletinData);
      // Here, you can send bulletinData to a server or further process it

      updateBulletin(bulletinData, "double_service");
    });
  });
} else {
  document.addEventListener("DOMContentLoaded", function () {
    const createBulletinButton = document.querySelector(
      "#meditationForm button[type='submit']"
    );

    createBulletinButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent form submission

      createBulletinButton.style.background = "green";

      // Function to get form data by id
      function getInputValue(id) {
        const element = document.getElementById(id);
        return element ? element.value : "";
      }

      const textarea = document.getElementById("collect");
      const dataId = textarea.getAttribute("data-id");

      // Determine which form is currently displayed based on their display style
      const isEucharisticFormVisible =
        document.getElementById("SnEucaristicForm").style.display === "block";
      const isMartinFormVisible =
        document.getElementById("SnMartinForm").style.display === "block";

      // Initialize an empty object for storing bulletin data
      let bulletinData = {};

      // Collect data from the Eucharistic Form if it is displayed
      if (isEucharisticFormVisible) {
        bulletinData = {
          step1: {
            service_type: "Eucharistic",
            sundayName: getInputValue("sundayNameEucaristic"),
            liturgicalColor: getInputValue("litColorEucaristic"),
            sundayDate: getInputValue("sundayDateEucaristic"),
            sundayTime: getInputValue("sundayTimeEucaristic"),
            specialEvent: getInputValue("specialEventEucaristic"),
            processionalHymn: getInputValue("processionalHymnEucaristic"),
            oldTestReading: getInputValue("OldTestReadingEucaristic"),
            psalm: getInputValue("psalmEucaristic"),
            espistle: getInputValue("epistleEucaristic"),
            gradualHymn: getInputValue("gradualHymnEucaristic"),
            gospel: getInputValue("gospelEucaristic"),
            communionHymn: getInputValue("communionHymnEucaristic"),
            specialThanksgiving: getInputValue("specialThanksgivingEucaristic"),
            aob: getInputValue("aobEucaristic"),
            recessionalHymn: getInputValue("recessionalHymnEucaristic"),
          },
          step3: {
            service_id: dataId,
            collect: getInputValue("collect"),
            dailyInfo: [],
            buttonInfo: [],
            familyNames: [],
            brideGroom: [],
          },
          step4: {
            meditationTopic: getInputValue("meditationTopic"),
            meditationText: getInputValue("meditationText"),
            message: getInputValue("message"),
          },
        };

        // Step 3 - Collect multiple input fields dynamically added
        document
          .querySelectorAll("#dailyInfoContainer .row")
          .forEach((row, index) => {
            bulletinData.step3.dailyInfo.push({
              id: row.getAttribute("data-id"),
              date: row.querySelector("input[type='date']").value,
              dailyInfo: row.querySelector("input[type='text']").value,
            });
          });

        document
          .querySelectorAll("#buttonInfoContainer .form-group input")
          .forEach((input, index) => {
            const data = {
              id: input.getAttribute("data-id"),
              value: input.value,
            };
            bulletinData.step3.buttonInfo.push(data);
          });

        document
          .querySelectorAll("#familyNamesContainer .form-group input")
          .forEach((input, index) => {
            const fdata = {
              id: input.getAttribute("data-id"),
              value: input.value,
            };
            bulletinData.step3.familyNames.push(fdata);
          });

        document
          .querySelectorAll("#brideGroomContainer .row")
          .forEach((row, index) => {
            bulletinData.step3.brideGroom.push({
              id: row.getAttribute("data-id"),
              brideName: row.querySelector("input[id^='brideName']").value,
              groomName: row.querySelector("input[id^='groomName']").value,
              timeOfAsking: row.querySelector("select[id^='timeOfAsking']")
                .value,
            });
          });
      }
      // Collect data from the Martin Form if it is displayed
      else if (isMartinFormVisible) {
        bulletinData = {
          step1: {
            service_type: "Martin",
            sundayName: getInputValue("sundayNameMartin"),
            liturgicalColor: getInputValue("litColorMartin"),
            sundayDate: getInputValue("sundayDateMartin"),
            sundayTime: getInputValue("sundayTimeMartin"),
            specialEvent: getInputValue("specialEventMartin"),
            processionalHymn: getInputValue("processionalHymnMartin"),
            firstLesson: getInputValue("snfirstlessonMartin"),
            gradualHymn: getInputValue("sngradualHymnMartin"),
            psalm: getInputValue("snPsalmnMartin"),
            secondLesson: getInputValue("snSecondlessonMartin"),
            sermonHymn: getInputValue("snSermonMartin"),
            specialThanksgiving: getInputValue("snspecialThanksgivingMartin"),
            aob: getInputValue("snaobMartin"),
            recessionalHymn: getInputValue("snrecessionalHymnMartin"),
          },
          step3: {
            service_id: dataId,
            collect: getInputValue("collect"),
            dailyInfo: [],
            buttonInfo: [],
            familyNames: [],
            brideGroom: [],
          },
          step4: {
            meditationTopic: getInputValue("meditationTopic"),
            meditationText: getInputValue("meditationText"),
            message: getInputValue("message"),
          },
        };
        // Step 3 - Collect multiple input fields dynamically added
        document
          .querySelectorAll("#dailyInfoContainer .row")
          .forEach((row, index) => {
            bulletinData.step3.dailyInfo.push({
              id: row.getAttribute("data-id"),
              date: row.querySelector("input[type='date']").value,
              dailyInfo: row.querySelector("input[type='text']").value,
            });
          });

        document
          .querySelectorAll("#buttonInfoContainer .form-group input")
          .forEach((input, index) => {
            const data = {
              id: input.getAttribute("data-id"),
              value: input.value,
            };
            bulletinData.step3.buttonInfo.push(data);
          });

        document
          .querySelectorAll("#familyNamesContainer .form-group input")
          .forEach((input, index) => {
            const fdata = {
              id: input.getAttribute("data-id"),
              value: input.value,
            };
            bulletinData.step3.familyNames.push(fdata);
          });

        document
          .querySelectorAll("#brideGroomContainer .row")
          .forEach((row, index) => {
            bulletinData.step3.brideGroom.push({
              id: row.getAttribute("data-id"),
              brideName: row.querySelector("input[id^='brideName']").value,
              groomName: row.querySelector("input[id^='groomName']").value,
              timeOfAsking: row.querySelector("select[id^='timeOfAsking']")
                .value,
            });
          });
      }

      // Now you can handle the `bulletinData` object which has formType and form-specific data
      console.log(bulletinData); // Log data or perform further operations
      updateBulletin(bulletinData, "combined_service");
    });
  });
}

async function updateBulletin(bulletinData, sundayType) {
  const service_id = bulletinData.step3.service_id;
  const service_info = {
    service_name: sundayType, // combined_service or double_service
    sunday_name: bulletinData.step1.sundayName,
    Csunday_time: "",
    FirstServiceTime: "",
    SecondServiceTime: "",
    service_date: bulletinData.step1.sundayDate,
    FirstServiceStyle: "",
    SecondServiceStyle: "",
    CombinedServiceStyle: "",
    special_celebration: bulletinData.step1.specialEvent,
    liturgical_color: bulletinData.step1.liturgicalColor,
  };
  if (sundayType === "combined_service") {
    service_info.CombinedServiceStyle = bulletinData.step1.service_type;
    service_info.Csunday_time = bulletinData.step1.sundayTime;
  } else {
    service_info.FirstServiceStyle = bulletinData.step1.service_type;
    service_info.SecondServiceStyle = bulletinData.step2.service_type;
    service_info.SecondServiceTime = bulletinData.step2.sundayTime;
    service_info.FirstServiceTime = bulletinData.step1.sundayTime;
  }

  ServiceResponse = await fetch("/service/" + service_id + "/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service_info),
  });

  if (ServiceResponse.ok) {
    const service = await ServiceResponse.json();
    console.log(service);
    const lessons = {
      espistle: "",
      gospel: "",
      second_lesson: "",
      first_lesson: "",
      OldTestament: "",
      psalm: "",
      SecServicePsalm: "",
    };
    if (sundayType === "combined_service") {
      if (bulletinData.step1.service_type === "Eucharistic") {
        lessons.OldTestament = bulletinData.step1.oldTestReading;
        lessons.espistle = bulletinData.step1.espistle;
        lessons.gospel = bulletinData.step1.gospel;
        lessons.psalm = bulletinData.step1.psalm;
      } else if (bulletinData.step1.service_type === "Martin") {
        lessons.first_lesson = bulletinData.step1.firstLesson;
        lessons.second_lesson = bulletinData.step1.secondLesson;
        lessons.psalm = bulletinData.step1.psalm;
      }
    } else {
      if (bulletinData.step1.service_type === "Eucharistic") {
        lessons.OldTestament = bulletinData.step1.oldTestReading;
        lessons.espistle = bulletinData.step1.espistle;
        lessons.gospel = bulletinData.step1.gospel;
        lessons.psalm = bulletinData.step1.psalm;
      } else if (bulletinData.step1.service_type === "Martin") {
        lessons.first_lesson = bulletinData.step1.firstLesson;
        lessons.second_lesson = bulletinData.step1.secondLesson;
        lessons.psalm = bulletinData.step1.psalm;
      }
      if (bulletinData.step2.service_type === "Eucharistic") {
        lessons.OldTestament = bulletinData.step2.oldTestReading;
        lessons.espistle = bulletinData.step2.espistle;
        lessons.gospel = bulletinData.step2.gospel;
        lessons.SecServicePsalm = bulletinData.step2.psalm;
      } else if (bulletinData.step2.service_type === "Martin") {
        lessons.first_lesson = bulletinData.step2.firstLesson;
        lessons.second_lesson = bulletinData.step2.secondLesson;
        lessons.SecServicePsalm = bulletinData.step2.psalm;
      }
    }

    async function getData(data) {
      const REresponse = await fetch(`/${data}`);
      const response = await REresponse.json();

      for (const item of response) {
        if (item.service_id === service.id) {
          return item.id; // Return immediately if a match is found
        }
      }

      return null; // Return null if no match is found
    }
    const lessonsResponse = await fetch(
      `/reading_schedule/${await getData("reading_schedule")}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lessons),
      }
    );

    const hymns = {
      processional: "",
      gradual: "",
      communion: "",
      sermon: "",
      Recessional: "",
      SecondServicegradual: "",
    };

    if (sundayType === "combined_service") {
      if (bulletinData.step1.service_type === "Eucharistic") {
        hymns.processional = bulletinData.step1.processionalHymn;
        hymns.gradual = bulletinData.step1.gradualHymn;
        hymns.communion = bulletinData.step1.communionHymn;
        hymns.Recessional = bulletinData.step1.recessionalHymn;
      } else if (bulletinData.step1.service_type === "Martin") {
        hymns.processional = bulletinData.step1.processionalHymn;
        hymns.gradual = bulletinData.step1.gradualHymn;
        hymns.sermon = bulletinData.step1.sermonHymn;
        hymns.Recessional = bulletinData.step1.recessionalHymn;
      }
    } else {
      if (bulletinData.step1.service_type === "Eucharistic") {
        hymns.processional = bulletinData.step1.processionalHymn;
        hymns.gradual = bulletinData.step1.gradualHymn;
        hymns.communion = bulletinData.step1.communionHymn;
        hymns.Recessional = bulletinData.step1.recessionalHymn;
      } else if (bulletinData.step1.service_type === "Martin") {
        hymns.processional = bulletinData.step1.processionalHymn;
        hymns.gradual = bulletinData.step1.gradualHymn;
        hymns.sermon = bulletinData.step1.sermonHymn;
        hymns.Recessional = bulletinData.step1.recessionalHymn;
      }
      if (bulletinData.step2.service_type === "Eucharistic") {
        hymns.processional = bulletinData.step1.processionalHymn;
        hymns.SecondServicegradual = bulletinData.step2.gradualHymn;
        hymns.communion = bulletinData.step1.communionHymn;
        hymns.Recessional = bulletinData.step1.recessionalHymn;
      } else if (bulletinData.step2.service_type === "Martin") {
        hymns.processional = bulletinData.step1.processionalHymn;
        hymns.SecondServicegradual = bulletinData.step2.gradualHymn;
        hymns.sermon = bulletinData.step2.sermonHymn;
        hymns.Recessional = bulletinData.step1.recessionalHymn;
      }
    }

    const hymnsResponse = await fetch(`/hymns/${await getData("hymns")}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hymns),
    });

    const aobs = {
      aob1: "",
      aob2: "",
    };

    if (sundayType === "combined_service") {
      aobs.aob1 = bulletinData.step1.aob;
    } else {
      aobs.aob2 = bulletinData.step2.aob2;
      aobs.aob1 = bulletinData.step1.aob;
    }

    const aobResponse = await fetch(`/aob/${await getData("aob")}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aobs),
    });

    const thanksgiving = {
      text: "",
      second_service_text: "",
    };

    if (sundayType === "combined_service") {
      thanksgiving.text = bulletinData.step1.specialThanksgiving;
    } else {
      thanksgiving.text = bulletinData.step1.specialThanksgiving;
      thanksgiving.second_service_text =
        bulletinData.step2.specialThanksgiving2;
    }

    const thanksgivingResponse = await fetch(
      `/thanksgiving/${await getData("thanksgiving")}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(thanksgiving),
      }
    );

    const meditation = {
      text: bulletinData.step4.meditationText,
      topic: bulletinData.step4.meditationTopic,
      note: bulletinData.step4.message,
    };

    const meditationResponse = await fetch(
      `/meditation/${await getData("meditation")}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(meditation),
      }
    );

    const notices = {
      service_id: service.id,
      title: service.sunday_name,
      content: bulletinData.step3.collect,
    };

    noticesResponse = await fetch(`/notices/${await getData("notices")}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notices),
    });

    if (noticesResponse.ok) {
      const notices = await noticesResponse.json();

      const promises = [];
      bulletinData.step3.buttonInfo.forEach((description) => {
        // Create the need object
        const need = {
          description: description.value,
        };

        // Determine the request type and endpoint
        const method = description.id ? "PUT" : "POST";
        const endpoint = description.id
          ? `/church_resources/${description.id}`
          : `/church_resources`;

        // If it's a POST request, add `notice_id` to the need object
        if (method === "POST") {
          need.notice_id = notices.id; // Make sure `notices.id` is defined and contains the correct ID
        }

        const ChurchRescourceResponse = fetch(endpoint, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(need),
        });

        promises.push(ChurchRescourceResponse);
      });

      // Wait for all requests to complete
      await Promise.all(promises);

      const dailyInfoRequests = [];
      bulletinData.step3.dailyInfo.forEach((info) => {
        // Create the dinfo object, initially without `notice_id`
        const dinfo = {
          event_day: info.date,
          event_description: info.dailyInfo,
        };

        // Determine request type and endpoint
        const method = info.id ? "PUT" : "POST";
        const endpoint = info.id
          ? `/notice_schedule/${info.id}`
          : `/notice_schedule`;

        // If it's a POST request, add `notice_id` to dinfo
        if (method === "POST") {
          dinfo.notice_id = notices.id;
        }

        const DilyinfoResponse = fetch(endpoint, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dinfo),
        });

        dailyInfoRequests.push(DilyinfoResponse);
      });

      // Wait for all requests to complete
      await Promise.all(dailyInfoRequests);

      // Handling family names
      const familyNames = [];
      bulletinData.step3.familyNames.forEach((name) => {
        const Names = {
          family_name: name.value,
        };

        // Determine request type and endpoint
        const method = name.id ? "PUT" : "POST";
        const endpoint = name.id ? `/prayerlist/${name.id}` : `/prayerlist`;

        // If it's a POST request, add `notice_id`
        if (method === "POST") {
          Names.notice_id = notices.id; // Ensure `notices.id` has the correct ID
        }

        const NamesResponse = fetch(endpoint, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Names),
        });

        familyNames.push(NamesResponse);
      });

      await Promise.all(familyNames);

      // Handling bride and groom announcements
      const brideGrooms = [];
      bulletinData.step3.brideGroom.forEach((bride) => {
        const brideGroom = {
          bride_name: bride.brideName,
          groom_name: bride.groomName,
          bann_announcement_count: bride.timeOfAsking,
        };

        // Determine request type and endpoint
        const method = bride.id ? "PUT" : "POST";
        const endpoint = bride.id
          ? `/marriagebann/${bride.id}`
          : `/marriagebann`;

        // If it's a POST request, add `notice_id`
        if (method === "POST") {
          brideGroom.notice_id = notices.id; // Ensure `notices.id` has the
          brideGroom.service_id = service.id;
        }

        const brideGroomResponse = fetch(endpoint, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(brideGroom),
        });

        brideGrooms.push(brideGroomResponse);
      });

      await Promise.all(brideGrooms);
    }
    let flash = document.getElementById("flash");
    flash.style.display = "block";
    setTimeout(() => {
      flash.style.display = "none";
      location.reload()
    }, 4000);
  }
}


