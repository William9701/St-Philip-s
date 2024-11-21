
$(document).ready(function () {
  $("#smartwizard1").smartWizard({
    selected: 0,
    theme: "arrows",
    autoAdjustHeight: true,
    transitionEffect: "fade",
    showStepURLhash: false,
  });

  $("#smartwizard2").smartWizard({
    selected: 0,
    theme: "arrows",
    autoAdjustHeight: true,
    transitionEffect: "fade",
    showStepURLhash: false,
  });

  // Show create modal based on the selected service type
  $("#combinedServiceBtn").on("click", function () {
    $("#serviceTypeModal").modal("hide");
    $("#combinedServiceModal").modal("show");
    // You can load the combined service form here if needed
  });

  $("#doubleServiceBtn").on("click", function () {
    $("#serviceTypeModal").modal("hide");
    $("#createModal").modal("show");
    // You can load the double service form here if needed
  });
});

function highlightSundays(dateInput) {
  const dateValue = new Date(dateInput.value);
  if (dateValue.getDay() !== 0) {
    alert("Please select a Sunday.");
    dateInput.value = "";
  }
}

let dailyInfoCount = 1;
let buttonInfoCount = 1;
let familyNameCount = 1;
let brideGroomCount = 1;

// Add more Daily Info input fields
document.getElementById("addDailyInfo").addEventListener("click", function () {
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
document.getElementById("addButtonInfo").addEventListener("click", function () {
  buttonInfoCount++;

  const newButtonInfo = document.createElement("div");
  newButtonInfo.className = "form-group mb-3";
  newButtonInfo.innerHTML = `
          <input type="text" class="form-control" id="buttonInfo${buttonInfoCount}" placeholder="Enter button info" required />
        `;

  document.getElementById("buttonInfoContainer").appendChild(newButtonInfo);
});

// Add more Family Name input fields
document.getElementById("addFamilyName").addEventListener("click", function () {
  familyNameCount++;

  const newFamilyName = document.createElement("div");
  newFamilyName.className = "form-group mb-3";
  newFamilyName.innerHTML = `
          <input type="text" class="form-control" id="familyName${familyNameCount}" placeholder="Enter family name" required />
        `;

  document.getElementById("familyNamesContainer").appendChild(newFamilyName);
});

// Add more Bride/Groom Info input fields
document.getElementById("addBrideGroom").addEventListener("click", function () {
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

  document.getElementById("brideGroomContainer").appendChild(newBrideGroom);
});

// ################################################################################
// This section for duplicate form
// ################################################################################
let dailyInfoCount1 = 1;
let buttonInfoCount1 = 1;
let familyNameCount1 = 1;
let brideGroomCount1 = 1;

// Add more Daily Info input fields
document.getElementById("addDailyInfo1").addEventListener("click", function () {
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

  document.getElementById("dailyInfoContainer1").appendChild(newDailyInfo);
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

    document.getElementById("buttonInfoContainer1").appendChild(newButtonInfo);
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

    document.getElementById("familyNamesContainer1").appendChild(newFamilyName);
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

    document.getElementById("brideGroomContainer1").appendChild(newBrideGroom);
  });

  document.addEventListener("DOMContentLoaded", function () {
    // Fetch the 'Create Bulletin' button
    const createBulletinButton = document.querySelector(
      "#meditationForm1 button[type='submit']"
    );
  
    createBulletinButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent form submission
      createBulletinButton.style.background = "green";
  
      const isFistServiceEucharisticFormVisible = document.getElementById("EucaristicForm").style.display === "block";
      const isFirstServiceMartinFormVisible = document.getElementById("MartinForm").style.display === "block";
      const isSecondServiceEucharisticFormVisible = document.getElementById("ssEucaristicForm").style.display === "block";
      const isSecondServiceMartinFormVisible = document.getElementById("ssMartinForm").style.display === "block";
  
      // Function to get form data by id
      function getInputValue(id) {
        const element = document.getElementById(id);
        return element ? element.value : "";
      }
  
      // Collect data from each step
      const bulletinData = {
        step1: {},
        step2: {},
        step3: {
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
            date: getInputValue(`1date${index + 1}`),
            dailyInfo: getInputValue(`1dailyInfo${index + 1}`),
          });
        });
  
      document
        .querySelectorAll("#buttonInfoContainer1 .form-group1 input")
        .forEach((input, index) => {
          bulletinData.step3.buttonInfo.push(input.value);
        });
  
      document
        .querySelectorAll("#familyNamesContainer1 .form-group1 input")
        .forEach((input, index) => {
          bulletinData.step3.familyNames.push(input.value);
        });
  
      document
        .querySelectorAll("#brideGroomContainer1 .row")
        .forEach((row, index) => {
          bulletinData.step3.brideGroom.push({
            brideName: getInputValue(`1brideName${index + 1}`),
            groomName: getInputValue(`1groomName${index + 1}`),
            timeOfAsking: getInputValue(`1timeOfAsking${index + 1}`),
          });
        });
  
      console.log("Bulletin Data Collected:", bulletinData);
      // Here, you can send bulletinData to a server or further process it
  
      createBulletin(bulletinData, "double_service");
    });
  });
  







document.addEventListener("DOMContentLoaded", function () {
  const createBulletinButton = document.querySelector("#meditationForm button[type='submit']");

  createBulletinButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    createBulletinButton.style.background = "green";
    // Function to get form data by id
    function getInputValue(id) {
      const element = document.getElementById(id);
      return element ? element.value : "";
    }

    // Determine which form is currently displayed based on their display style
    const isEucharisticFormVisible = document.getElementById("SnEucaristicForm").style.display === "block";
    const isMartinFormVisible = document.getElementById("SnMartinForm").style.display === "block";

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
      document.querySelectorAll("#dailyInfoContainer .row").forEach((row, index) => {
        bulletinData.step3.dailyInfo.push({
          date: getInputValue(`date${index + 1}`),
          dailyInfo: getInputValue(`dailyInfo${index + 1}`),
        });
      });

      document.querySelectorAll("#buttonInfoContainer .form-group input").forEach((input) => {
        bulletinData.step3.buttonInfo.push(input.value);
      });

      document.querySelectorAll("#familyNamesContainer .form-group input").forEach((input) => {
        bulletinData.step3.familyNames.push(input.value);
      });

      document.querySelectorAll("#brideGroomContainer .row").forEach((row, index) => {
        bulletinData.step3.brideGroom.push({
          brideName: getInputValue(`brideName${index + 1}`),
          groomName: getInputValue(`groomName${index + 1}`),
          timeOfAsking: getInputValue(`timeOfAsking${index + 1}`),
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
      document.querySelectorAll("#dailyInfoContainer .row").forEach((row, index) => {
        bulletinData.step3.dailyInfo.push({
          date: getInputValue(`date${index + 1}`),
          dailyInfo: getInputValue(`dailyInfo${index + 1}`),
        });
      });

      document.querySelectorAll("#buttonInfoContainer .form-group input").forEach((input) => {
        bulletinData.step3.buttonInfo.push(input.value);
      });

      document.querySelectorAll("#familyNamesContainer .form-group input").forEach((input) => {
        bulletinData.step3.familyNames.push(input.value);
      });

      document.querySelectorAll("#brideGroomContainer .row").forEach((row, index) => {
        bulletinData.step3.brideGroom.push({
          brideName: getInputValue(`brideName${index + 1}`),
          groomName: getInputValue(`groomName${index + 1}`),
          timeOfAsking: getInputValue(`timeOfAsking${index + 1}`),
        });
      });
    }

    // Now you can handle the `bulletinData` object which has formType and form-specific data
    console.log(bulletinData); // Log data or perform further operations
    createBulletin(bulletinData, "combined_service");
  });
});





async function createBulletin(bulletinData, sundayType) {
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
    service_info.Csunday_time = bulletinData.step1.sundayTime
  } else {
    service_info.FirstServiceStyle = bulletinData.step1.service_type;
    service_info.SecondServiceStyle = bulletinData.step2.service_type;
    service_info.SecondServiceTime = bulletinData.step2.sundayTime
    service_info.FirstServiceTime = bulletinData.step1.sundayTime
  }

  ServiceResponse = await fetch("/service", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service_info),
  });

  if (ServiceResponse.ok) {
    const service = await ServiceResponse.json();
    console.log(service);
    const lessons = {
      service_id: service.id,
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
          lessons.psalm = bulletinData.step1.psalm
      } else if (bulletinData.step1.service_type === "Martin"){
          lessons.first_lesson = bulletinData.step1.firstLesson;
          lessons.second_lesson = bulletinData.step1.secondLesson;
          lessons.psalm = bulletinData.step1.psalm;
      }
    } else {
      if (bulletinData.step1.service_type === "Eucharistic") {
        lessons.OldTestament = bulletinData.step1.oldTestReading;
        lessons.espistle = bulletinData.step1.espistle;
        lessons.gospel = bulletinData.step1.gospel;
        lessons.psalm = bulletinData.step1.psalm
      } else if (bulletinData.step1.service_type === "Martin"){
        lessons.first_lesson = bulletinData.step1.firstLesson;
        lessons.second_lesson = bulletinData.step1.secondLesson;
        lessons.psalm = bulletinData.step1.psalm;
      }
      if (bulletinData.step2.service_type === "Eucharistic") {
        lessons.OldTestament = bulletinData.step2.oldTestReading;
        lessons.espistle = bulletinData.step2.espistle;
        lessons.gospel = bulletinData.step2.gospel;
        lessons.SecServicePsalm = bulletinData.step2.psalm
      } else if (bulletinData.step2.service_type === "Martin"){
        lessons.first_lesson = bulletinData.step2.firstLesson;
        lessons.second_lesson = bulletinData.step2.secondLesson;
        lessons.SecServicePsalm = bulletinData.step2.psalm;
      }
    }

    const lessonsResponse = await fetch("/reading_schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lessons),
    });

    const hymns = {
      service_id: service.id,
      processional: "",
      gradual: "",
      communion: "",
      sermon: "",
      Recessional: "",
      SecondServicegradual: "",
    };

    if (sundayType === "combined_service") {
      if (bulletinData.step1.service_type === "Eucharistic") {
          hymns.processional = bulletinData.step1.processionalHymn
          hymns.gradual = bulletinData.step1.gradualHymn
          hymns.communion = bulletinData.step1.communionHymn
          hymns.Recessional = bulletinData.step1.recessionalHymn
      } else if (bulletinData.step1.service_type === "Martin"){
        hymns.processional = bulletinData.step1.processionalHymn
        hymns.gradual = bulletinData.step1.gradualHymn
        hymns.sermon= bulletinData.step1.sermonHymn
        hymns.Recessional = bulletinData.step1.recessionalHymn
      }
    } else {
      if (bulletinData.step1.service_type === "Eucharistic") {
        hymns.processional = bulletinData.step1.processionalHymn
        hymns.gradual = bulletinData.step1.gradualHymn
        hymns.communion = bulletinData.step1.communionHymn
        hymns.Recessional = bulletinData.step1.recessionalHymn
      } else if (bulletinData.step1.service_type === "Martin"){
        hymns.processional = bulletinData.step1.processionalHymn
        hymns.gradual = bulletinData.step1.gradualHymn
        hymns.sermon= bulletinData.step1.sermonHymn
        hymns.Recessional = bulletinData.step1.recessionalHymn
      }
      if (bulletinData.step2.service_type === "Eucharistic") {
        hymns.processional = bulletinData.step1.processionalHymn
        hymns.SecondServicegradual = bulletinData.step2.gradualHymn
        hymns.communion = bulletinData.step1.communionHymn
        hymns.Recessional = bulletinData.step1.recessionalHymn
      } else if (bulletinData.step2.service_type === "Martin"){
        hymns.processional = bulletinData.step1.processionalHymn
        hymns.SecondServicegradual = bulletinData.step2.gradualHymn
        hymns.sermon= bulletinData.step2.sermonHymn
        hymns.Recessional = bulletinData.step1.recessionalHymn
      }
    }

    const hymnsResponse = await fetch("/hymns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hymns),
    });

    const aobs = {
      service_id: service.id,
      aob1: "",
      aob2: "",
    };

    if (sundayType === "combined_service"){
      aobs.aob1 = bulletinData.step1.aob
    }
    else{
      aobs.aob2 = bulletinData.step2.aob2
      aobs.aob1 = bulletinData.step1.aob
    }

    const aobResponse = await fetch("/aob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aobs),
    });



    const thanksgiving = {
      service_id: service.id,
      text: "",
      second_service_text: "",
    };

    if (sundayType === "combined_service"){
      thanksgiving.text = bulletinData.step1.specialThanksgiving
    } else {
      thanksgiving.text = bulletinData.step1.specialThanksgiving
      thanksgiving.second_service_text = bulletinData.step2.specialThanksgiving2
    }

    const thanksgivingResponse = await fetch("/thanksgiving", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(thanksgiving),
    });

    const meditation = {
      service_id: service.id,
      text: bulletinData.step4.meditationText,
      topic: bulletinData.step4.meditationTopic,
      note: bulletinData.step4.message,
    };

    const meditationResponse = await fetch("/meditation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meditation),
    });

    const notices = {
      service_id: service.id,
      title: service.sunday_name,
      content: bulletinData.step3.collect,
    };

    noticesResponse = await fetch("/notices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notices),
    });

    if (noticesResponse.ok) {
      const notices = await noticesResponse.json();

      const promises = [];
      bulletinData.step3.buttonInfo.forEach((description) => {
        const need = {
          notice_id: notices.id,
          description: description,
        };
        const ChurchRescourceResponse = fetch("/church_resources", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(need),
        });
        promises.push(ChurchRescourceResponse);
      });

      await Promise.all(promises);

      const dailyInfo = [];
      bulletinData.step3.dailyInfo.forEach((info) => {
        const dinfo = {
          notice_id: notices.id,
          event_day: info.date,
          event_description: info.dailyInfo,
        };
        const DilyinfoResponse = fetch("/notice_schedule", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dinfo),
          });
          dailyInfo.push(DilyinfoResponse);
      });

      await Promise.all(dailyInfo);

      const familyNames = [];
      bulletinData.step3.familyNames.forEach((name) => {
        const Names = {
          notice_id: notices.id,
          family_name: name,
        };
        const NamesResponse = fetch("/prayerlist", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Names),
          });
          familyNames.push(NamesResponse);
      });

      await Promise.all(familyNames);

      const brideGrooms = [];
      bulletinData.step3.brideGroom.forEach((bride) => {
        const brideGroom = {
          service_id: notices.service_id,
          notice_id: notices.id,
          bride_name: bride.brideName,
          groom_name: bride.groomName,
          bann_announcement_count: bride.timeOfAsking,
        };
        const brideGroomResponse = fetch("/marriagebann", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(brideGroom),
          });
          brideGrooms.push(brideGroomResponse);
      });

      await Promise.all(brideGrooms);

      let flash;
      if (sundayType === "double_service"){
        flash = document.getElementById("flashD");
      } else {
        flash = document.getElementById("flash");
      }
      flash.style.display = "block";
      setTimeout(() => {
        flash.style.display = "none";
        location.reload()
      }, 4000);
    }
  }
}





// Select the checkbox and the forms
const toggleCheckbox = document.getElementById("dark-mode-toggle");
const martinForm = document.getElementById("MartinForm");
const eucaruisticForm = document.getElementById("EucaristicForm");

// Function to toggle form visibility
function toggleForms() {
  if (toggleCheckbox.checked) {
    martinForm.style.display = "block";
    eucaruisticForm.style.display = "none";
  } else {
    martinForm.style.display = "none";
    eucaruisticForm.style.display = "block";
  }
}

// Listen for changes to the checkbox state
toggleCheckbox.addEventListener("change", toggleForms);

const toggleCheckbox2 = document.getElementById("dark-mode-toggle2");
const martinForm2 = document.getElementById("ssMartinForm");
const eucaruisticForm2 = document.getElementById("ssEucaristicForm");

// Function to toggle form visibility
function toggleForms1() {
  if (toggleCheckbox2.checked) {
    martinForm2.style.display = "none";
    eucaruisticForm2.style.display = "block";
  } else {
    martinForm2.style.display = "block";
    eucaruisticForm2.style.display = "none";
  }
}

// Listen for changes to the checkbox state
toggleCheckbox2.addEventListener("change", toggleForms1);


const toggleCheckbox3 = document.getElementById("dark-mode-toggle3");
const martinForm3 = document.getElementById("SnMartinForm");
const eucaruisticForm3 = document.getElementById("SnEucaristicForm");

// Function to toggle form visibility
function toggleForms3() {
  if (toggleCheckbox3.checked) {
    martinForm3.style.display = "block";
    eucaruisticForm3.style.display = "none";
  } else {
    martinForm3.style.display = "none";
    eucaruisticForm3.style.display = "block";
  }
}

// Listen for changes to the checkbox state
toggleCheckbox3.addEventListener("change", toggleForms3);


async function DeleteService(serviceId) {
  try {
      const response = await fetch(`/service/${serviceId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Fetch the updated list of services after successful deletion
      await fetchAndUpdateServices();
      console.log('Service deleted successfully');
  } catch (error) {
      console.error('Failed to delete service:', error);
  }
}

async function DeleteEvent(eventId) {
  try {
      const response = await fetch(`/upcoming_event/${eventId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Fetch the updated list of services after successful deletion
      await fetchAndUpdateEvent();
      console.log('Service deleted successfully');
  } catch (error) {
      console.error('Failed to delete service:', error);
  }
}

async function fetchAndUpdateServices() {
  try {
      const response = await fetch('/service');
      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const services = await response.json(); // Assuming the API returns JSON data
      updateServiceTable(services);
  } catch (error) {
      console.error('Failed to fetch services:', error);
  }
}
async function fetchAndUpdateEvent() {
  try {
      const response = await fetch('/upcoming_event');
      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const events = await response.json(); // Assuming the API returns JSON data
      updateEventTable(events);
  } catch (error) {
      console.error('Failed to fetch services:', error);
  }
}

function updateServiceTable(services) {
  const tableBody = document.getElementById('services-table-body'); // Make sure to set this ID in your table body

  // Clear existing table rows
  tableBody.innerHTML = '';

  // Create new rows based on the updated services data
  services.forEach(service => {
      // Format the service date to exclude the time and timezone
      service.service_date = service.service_date.split(' ').slice(0, 4).join(' '); // This gets the first four parts of the date

      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${service.sunday_name}</td>
          <td>${service.service_date}</td>
          <td>${service.liturgical_color}</td>
          <td>${service.service_name}</td>
          <td>
              <button onclick="DeleteService('${service.id}')" class="btn btn-danger btn-sm">Delete</button>
          </td>
          <td>
              <a href="/update/${service.id}"
              <button class="btn btn-secondary mb-3 btn-sm">Update</button></a>
          </td>
      `;
      tableBody.appendChild(row);
  });
}

function updateEventTable(events) {
  const tableBody = document.getElementById('event-table-body'); // Make sure to set this ID in your table body

  // Clear existing table rows
  tableBody.innerHTML = '';

  // Create new rows based on the updated services data
  events.forEach(event => {
      // Format the service date to exclude the time and timezone
      event.event_date = event.event_date.split(' ').slice(0, 4).join(' '); // This gets the first four parts of the date

      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${event.event_name}</td>
          <td>${event.event_date}</td>
          <td>
              <button onclick="DeleteEvent('${event.id}')" class="btn btn-danger btn-sm">Delete</button>
          </td>
      `;
      tableBody.appendChild(row);
  });
}

// Add more members
document.getElementById('addmember').addEventListener('click', function() {
  // Clone the initial member form
  const memberForm = document.querySelector('.addmemberContainer1');
  const newMemberForm = memberForm.cloneNode(true);

  // Reset input fields in the cloned form
  const inputs = newMemberForm.querySelectorAll('input');
  inputs.forEach(input => input.value = '');

  // Append the cloned form to the container
  document.getElementById('memberFormContainer').appendChild(newMemberForm);
});

// Function to handle submission of all forms
async function submitFormData() {
  const memberForms = document.querySelectorAll('#memberFormContainer .addmemberContainer1');
  const allData = [];

  memberForms.forEach(form => {
    const title = form.querySelector('select').value;
    const firstName = form.querySelector('input[placeholder="Enter First Name"]').value;
    const lastName = form.querySelector('input[placeholder="Enter Last Name"]').value;
    const group = form.querySelectorAll('select')[1].value;

    const member = {
      first_name: firstName,
      last_name: lastName,
      group_name: group,
      title: title,
    }
    const memberResponse = fetch("/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
    });

    allData.push(memberResponse);
  });
  try {
    await Promise.all(allData);
    alert("Data submitted successfully."); 
    location.reload();  // Refresh the page to reflect the new data
  } catch (error) {
    console.error("Error submitting data:", error);
  }
}


async function submitEvent() {
  const form = document.getElementById('eventForm');
  const fileInput = document.getElementById('eventImage');

  if (fileInput.files.length === 0) {
      alert("Please select an image.");
      return;
  }

  const imageFile = fileInput.files[0];
  const blob = await imageFile.arrayBuffer(); // Convert file to array buffer
  const formData = new FormData();

  // Append form data
  formData.append("eventImage", new Blob([blob], { type: imageFile.type }), generateFilename(imageFile.name));
  

  try {
      const response = await fetch('/upload-event', {
          method: 'POST',
          body: formData
      });

      if (!response.ok) {
          throw new Error('File upload failed');
      }

      // Get the image path returned from the server
      const result = await response.json();
      const imagePath = `../static/images/upload/${result.filePath}`;

      // Collect event data and add image path to it
      const eventData = {
          event_date: document.getElementById("eventDate").value,
          time: document.getElementById("eventTime").value,
          event_name: document.getElementById("eventName").value,
          event_text: document.getElementById("eventText").value,
          event_img: imagePath  // Include the filename for reference in the database
      };

      // Send event data to /upcoming_event
      const eventResponse = await fetch('/upcoming_event', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(eventData)
      });

      if (!eventResponse.ok) {
          throw new Error('Event creation failed');
      }

      alert('Event created successfully!');
      location.reload();  // Refresh the page to reflect the new data
  } catch (error) {
      console.error('Error:', error);
      alert('Error uploading file');
  }
}

// Helper function to generate a unique filename
function generateFilename(originalName) {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  const fileExtension = originalName.split('.').pop();
  return `image_${timestamp}.${fileExtension}`;
}


function performSearch() {
  const searchInput = document.getElementById("search-input").value;

  fetch(`/search_members?query=${encodeURIComponent(searchInput)}`)
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("member-table-body");
      tableBody.innerHTML = "";

      data.members.forEach((member) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${member.title} ${member.last_name} ${member.first_name}</td>
          <td>${member.group_name}</td>
          <td>
            <button onclick="DeleteMember('${member.id}')" class="btn btn-danger btn-sm">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error:", error));
}


function DeleteMember(memberId) {
  fetch(`/members/${memberId}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (response.ok) {
      // On successful delete, fetch and recreate the table
      fetchMembers();
    } else {
      console.error('Failed to delete member');
    }
  })
  .catch(error => console.error('Error:', error));
}

// Function to fetch all members and recreate the table
function fetchMembers() {
  fetch('/members')
    .then(response => response.json())
    .then(members => {
      const tableBody = document.getElementById("member-table-body");
      tableBody.innerHTML = "";  // Clear existing rows

      // Loop through each member in the response and create a table row
      members.forEach(member => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${member.title} ${member.last_name} ${member.first_name}</td>
          <td>${member.group_name}</td>
          <td>
            <button onclick="DeleteMember('${member.id}')" class="btn btn-danger btn-sm">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching members:', error));
}

