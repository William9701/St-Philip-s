document.addEventListener("DOMContentLoaded", function () {
  // Fetch the 'Create Bulletin' button
  const createBulletinButton = document.querySelector(
    "#step-6 button[type='submit']"
  );

  createBulletinButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    // Function to get form data by id
    function getInputValue(id) {
      const element = document.getElementById(id);
      return element ? element.value : "";
    }

    // Collect data from each step
    const bulletinData = {
      step1: {
        sundayName: getInputValue("sundayName"),
        liturgicalColor: getInputValue("litColor"),
        sundayDate: getInputValue("sundayDate"),
        sundayTime: getInputValue("sundayTime"),
        specialEvent: getInputValue("specialEvent"),
        processionalHymn: getInputValue("processionalHymn"),
        epistle: getInputValue("epistle"),
        gradualHymn: getInputValue("gradualHymn"),
        gospel: getInputValue("gospel"),
        communionHymn: getInputValue("communionHymn"),
        specialThanksgiving: getInputValue("specialThanksgiving"),
        aob: getInputValue("aob"),
        recessionalHymn: getInputValue("recessionalHymn"),
      },
      step2: {
        collect: getInputValue("collect"),
        dailyInfo: [],
        buttonInfo: [],
        familyNames: [],
        brideGroomInfo: [],
      },
      step3: {
        meditationTopic: getInputValue("meditationTopic"),
        meditationText: getInputValue("meditationText"),
        message: getInputValue("message"),
      },
    };

    // Step 2 - Collect multiple input fields dynamically added for daily info
    document
      .querySelectorAll("#dailyInfoContainer .row")
      .forEach((row, index) => {
        bulletinData.step2.dailyInfo.push({
          date: getInputValue(`date${index + 1}`),
          info: getInputValue(`dailyInfo${index + 1}`),
        });
      });

    // Step 2 - Collect multiple input fields for button info
    document
      .querySelectorAll("#buttonInfoContainer input[type='text']")
      .forEach((input) => {
        bulletinData.step2.buttonInfo.push(input.value);
      });

    // Step 2 - Collect multiple input fields for family names
    document
      .querySelectorAll("#familyNamesContainer input[type='text']")
      .forEach((input) => {
        bulletinData.step2.familyNames.push(input.value);
      });

    // Step 2 - Collect multiple fields for bride and groom info
    document
      .querySelectorAll("#brideGroomContainer .row")
      .forEach((row, index) => {
        bulletinData.step2.brideGroomInfo.push({
          brideName: getInputValue(`brideName${index + 1}`),
          groomName: getInputValue(`groomName${index + 1}`),
          timeOfAsking: getInputValue(`timeOfAsking${index + 1}`),
        });
      });

    console.log("Bulletin Data Collected:", bulletinData);
    // Send bulletinData to a server or further process it here
  });
});

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
            <input type="date" class="form-control" id="date${dailyInfoCount1}" required />
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

    // Function to get form data by id
    function getInputValue(id) {
      const element = document.getElementById(id);
      return element ? element.value : "";
    }

    // Collect data from each step
    const bulletinData = {
      step1: {
        sundayName: getInputValue("sundayName1"),
        liturlogicalColor: getInputValue("litColor1"),
        sundayDate: getInputValue("sundayDate1"),
        sundayTime: getInputValue("sundayTime1"),
        specialEvent: getInputValue("specialEvent1"),
        processionalHymn: getInputValue("processionalHymn1"),
        epistle: getInputValue("epistle1"),
        gradualHymn: getInputValue("gradualHymn1"),
        gospel: getInputValue("gospel1"),
        communionHymn: getInputValue("communionHymn1"),
        specialThanksgiving: getInputValue("specialThanksgiving1"),
        aob: getInputValue("aob1"),
        recessionalHymn: getInputValue("recessionalHymn1"),
      },
      step2: {
        sundayTime: getInputValue("SecondsundayTime"),
        psalm: getInputValue("psalm1"),
        firstLesson: getInputValue("firstLesson1"),
        secondLesson: getInputValue("secondLesson1"),
        sermonHymn: getInputValue("sermonHymn1"),
        specialThanksgiving1: getInputValue("specialThanksgiving1"),
        aob2: getInputValue("aob1"),
        recessionalHymn: getInputValue("recessionalHymn1"),
      },
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

      createBulletin(bulletinData);
  });
});

async function createBulletin(bulletinData) {
  const servive_info = {
    service_name: "double_service",
    sunday_name: bulletinData.step1.sundayName,
    Csunday_time: bulletinData.step1.sundayTime,
    FirstServiceTime: bulletinData.step1.sundayTime,
    SecondServiceTime: bulletinData.step2.sundayTime,
    service_date: bulletinData.step1.sundayDate,
    special_celebration: bulletinData.step1.specialEvent,
    liturgical_color: bulletinData.step1.liturlogicalColor,
  };

  ServiceResponse = await fetch("/service", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(servive_info),
  });

  if (ServiceResponse.ok) {
    const service = await ServiceResponse.json();
    console.log(service);
    const lessons = {
      service_id: service.id,
      espistle: bulletinData.step1.epistle,
      gospel: bulletinData.step1.gospel,
      second_lesson: bulletinData.step2.secondLesson,
      first_lesson: bulletinData.step2.firstLesson,
    };

    const lessonsResponse = await fetch("/reading_schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lessons),
    });

    const hymns = {
      service_id: service.id,
      processional: bulletinData.step1.processional,
      gradual: bulletinData.step1.gradual,
      communion: bulletinData.step1.communionHymn,
      sermon: bulletinData.step1.sermonHymn,
      Recessional: bulletinData.step1.recessionalHymn,
    };

    const hymnsResponse = await fetch("/hymns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hymns),
    });

    const aobs = {
      service_id: service.id,
      aob1: bulletinData.step2.aob2,
      aob2: bulletinData.step1.aob,
    };

    const aobResponse = await fetch("/aob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aobs),
    });

    const thanksgiving = {
      service_id: service.id,
      text: bulletinData.step1.specialThanksgiving,
      second_service_text: bulletinData.step2.specialThanksgiving1,
    };

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
      bulletinData.step3.dailyInfo.forEach((description) => {
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
      bulletinData.step3.buttonInfo.forEach((info) => {
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

      const brideGroom = [];
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
          brideGroom.push(brideGroomResponse);
      });

      await Promise.all(brideGroom);
    }
  }
}
