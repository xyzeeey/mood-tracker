const body = document.querySelector('body');
const warpperElem = document.querySelector('.wrapper');
const appNameElem = document.querySelector('.app-name');
const themeBubbleElem = document.querySelector('.theme-bubble');
const toastElem = document.querySelector('.toast');
const dimmedElem = document.querySelector('.dimmed');

const nameFormElem = document.querySelector('.name-form');
const nameInputElem = document.querySelector('.name-form input');
const displayName = document.querySelector('.user-name');
const moodWrapperElem = document.querySelector('.mood-wrapper');
const monthElem = document.querySelector('.month');

const btnMood = document.querySelector('.btn-mood');
const moodSlcWrapperElem = document.querySelector('.mood-slc-wrapper');
const btnMoodSlcElems = document.querySelectorAll('.btn-mood-slc');


const btnToggleDateElem = document.querySelector('.toggle-date');
const btnToggleDateSpanElem = document.querySelector('.toggle-date span');
const btnShareElem = document.querySelector('.share');
const btnStatElem = document.querySelector('.stat-btn');


const btnQuestionElem = document.querySelector('.question');
const btnQuestionSpanElem = btnQuestionElem.querySelector('span');
const questionWrapperElem = document.querySelector('.question-wrapper');


const oneLineResultElem = document.querySelector('.share-result');

const savedUsername = localStorage.getItem('username');

const scoreEmoji = ['⚫️', '🔴', '🟠', '🟡', '🔵', '🟢'];
const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


const datePickerWrapperElem = document.querySelector('.date-picker-wrapper');
const datePickerYearElem = document.querySelector('.date-picker-year');
const datePickerYearSpanElem = document.querySelector('.date-picker-year span');
const btnYearPrevElem = document.querySelector('.year-prev');
const btnYearNextElem = document.querySelector('.year-next');

const datePickerMonthElem = document.querySelector('.date-picker-month');
const datePickerMonthCircleElems = document.querySelectorAll('.date-picker-month .month-circle');
const dimmedBlackElem = document.querySelector('.dimmed-black');

const savedDarkMode = localStorage.getItem('darkmode');


let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜
let padMonth = String(month).padStart(2, '0');
let padDate = String(date).padStart(2, '0');
let lastdate = new Date(year, month, 0).getDate();
let yesterday = new Date(year, month - 1, date - 1);
let monthNameShort = today.toLocaleString('en-US', { month: 'short' });

let todayString = today.toString();
let week = todayString.slice(0, 3);



let moods = [];
let filteredMoods = [];
let unfilteredMoods = [];
let currentPageInfo = {
  year,
  month,
};

let moodCircleElems;
let todayInfo;





function setDate() {
  today = new Date();
  year = today.getFullYear(); // 년도
  month = today.getMonth() + 1;  // 월
  date = today.getDate();  // 날짜
  padMonth = String(month).padStart(2, '0');
  padDate = String(date).padStart(2, '0');
  lastdate = new Date(year, month, 0).getDate();
  monthNameShort = today.toLocaleString('en-US', { month: 'short' });
}


function onSubmit(e) {
  e.preventDefault()
  const username = nameInputElem.value;
  nameFormElem.classList.add('hidden');
  localStorage.setItem('username', username);
  renderUsername(username);
  btnMood.classList.remove('hidden');
  if (localStorage.getItem('darkmode') === null) {
    themeBubbleElem.classList.remove('hidden');
  } else {
    themeBubbleElem.classList.add('hidden');
  }
}

function focusOut() {
  const username = nameInputElem.value;
  nameFormElem.classList.add('hidden');
  localStorage.setItem('username', username);
  renderUsername(username);
  btnMood.classList.remove('hidden');
  if (localStorage.getItem('darkmode') === null) {
    themeBubbleElem.classList.remove('hidden');
  } else {
    themeBubbleElem.classList.add('hidden');
  }
}


function renderUsername(username) {
  displayName.textContent = `${username}`
  displayName.classList.remove('hidden')
}


function modUsername() {
  displayName.classList.add('hidden');
  nameFormElem.classList.remove('hidden');
  nameFormElem.addEventListener('submit', onSubmit);
  nameFormElem.addEventListener('focusout', () => {
    const username = nameInputElem.value;
    if (username !== '' & username !== ' ') {
      focusOut();
    }
  });
}


if (savedUsername === null) {
  nameFormElem.classList.remove('hidden');
  nameFormElem.addEventListener('submit', onSubmit);
  nameFormElem.addEventListener('focusout', () => {
    const username = nameInputElem.value;
    if (username !== '') {
      focusOut();
    }
  });
} else {
  renderUsername(savedUsername);
  btnMood.classList.remove('hidden');
}



displayName.addEventListener('touchend', modUsername);
displayName.addEventListener('click', modUsername);



btnToggleDateSpanElem.textContent = `${date} ${week}`
monthElem.textContent = `${year}${padMonth}`;




function saveData() {
  localStorage.setItem('moods', JSON.stringify(moods));
}


// function setDateDay1() {
//   moods = [];
//   setData();
//   saveData();
// }



function setData() {
  let dateNum = 1;
  for (let i = 0; i < lastdate; i++) {
    let setMoods =  {
      year: year,
      month: month,
      date: dateNum,
    };
    if (dateNum < date) {
      setMoods.score = 0; // 까만동그라미
      moods.push(setMoods);
    } else {
      setMoods.score = 6; // 빈 동그라미
      moods.push(setMoods);
    }
    dateNum++;
  }
}


function changeDate(currentY, currentM) {
  currentPageInfo.year = currentY;
  currentPageInfo.month = currentM;
}


function filterMood() {
  filteredMoods = moods.filter((item) => {
    return item.year == currentPageInfo.year && item.month == currentPageInfo.month;
  });
}



function render() {
  filterMood();
  let renderMoods = filteredMoods;
  moodWrapperElem.innerHTML = '';
  renderMoods.forEach((item, i) => {
    const moodCircleDiv = document.createElement('div');
    const circleDateSpan = document.createElement('span');
    circleDateSpan.classList.add('circle-date');
    circleDateSpan.classList.add('opa-0');
    moodCircleDiv.classList.add('mood-circle');
    // moodCircleDiv.setAttribute('onclick', 'changeMood(this)');
    // moodCircleDiv.setAttribute('ontouchend', 'javascript:changeMood(this)');
    moodCircleDiv.dataset.year = currentPageInfo.year;
    moodCircleDiv.dataset.month = currentPageInfo.month;
    moodCircleDiv.dataset.date = i + 1;
    moodCircleDiv.dataset.score = item.score;
    if (item.year != year && item.score == 6) {
      moodCircleDiv.dataset.score = 0;
    } else if (item.month < month && item.score == 6) {
      moodCircleDiv.dataset.score = 0;
    }
    circleDateSpan.innerText = i + 1;
    moodWrapperElem.appendChild(moodCircleDiv);
    moodCircleDiv.appendChild(circleDateSpan);
  });
  moodCircleEvent();
}


function moodCircleEvent() {
  let moodCircleElems = document.querySelectorAll('.mood-circle');
  Array.from(moodCircleElems).forEach((item) => {
    item.addEventListener('click', (e) => {
      changeMood(e.target);
    });
  });
}



btnMoodSlcElems.forEach((item) => {
  item.addEventListener('click', submitMood);
});



function circleAnimation() {
  let moodCircleElems = document.querySelectorAll('.mood-circle');
  moodCircleElems = Array.from(moodCircleElems);
  moodCircleElems.forEach((item) => {
    if (item.dataset.year == year && item.dataset.month == month && item.dataset.date == date) {
      item.classList.remove('rotate');
      item.offsetWidth = item.offsetWidth;
      item.classList.add('rotate');
    }
  });
}


function submitMood(e) {
  currentPageInfo.year = year;
  currentPageInfo.month = month;
  const ratedScore = e.currentTarget.dataset.score;
  moods.forEach((item) => {
    if (item.year == year && item.month == month && item.date == date) {
      item.score = ratedScore;
    }
  });
  saveData();
  render(moods);
  circleAnimation();
  moodSlcWrapperElem.classList.remove('open');
  moodSlcWrapperElem.classList.add('close');
  btnShareElem.classList.remove('hidden');
  dimmedElem.classList.add('hidden');
  monthElem.textContent = `${year}${padMonth}`;
}



const savedMoods = localStorage.getItem('moods');

if (savedMoods === null) {
  setData();
  saveData();
  render(moods);
} else {
  let parseMoods = JSON.parse(savedMoods);
  moods = parseMoods;
  filterMood();
  if (filteredMoods[0] == null) {
    setData();
  }
  filteredMoods.forEach((item) => {
    if (item.date < date && item.score == 6) {
      item.score = 0;
    }
  });
  saveData();
  render(moods);
}



function changeMood(clickedElem) {
  const clickedYear = parseInt(clickedElem.dataset.year);
  const clickedMonth = parseInt(clickedElem.dataset.month - 1);
  const clickedDate = parseInt(clickedElem.dataset.date);
  const clickedNow = new Date(clickedYear, clickedMonth, clickedDate);
  let clickedScore = clickedElem.dataset.score;

  if (yesterday <= clickedNow && clickedNow < today) {
    filteredMoods.forEach((item) => {
      if (item.date == clickedDate) {
        // item.score = (item.score + 1)%6;
        item.score = (item.score % 5) + 1;
      }
    });
    saveData();
    render(moods);
  }
}



let isDateToggled = false;
function dateToggle() {
  const circleDateSpanElems = document.querySelectorAll('.circle-date');
  if (!isDateToggled) {
    circleDateSpanElems.forEach((item) => {
      item.classList.remove('opa-0');
      item.classList.add('opa-100');
    });
    isDateToggled = !isDateToggled;
  } else {
    circleDateSpanElems.forEach((item) => {
      item.classList.remove('opa-100');
      item.classList.add('opa-0');
    });
    isDateToggled = !isDateToggled;
  }
}

btnToggleDateElem.addEventListener('click', dateToggle);





let isQuestionOpened = false;
btnQuestionElem.addEventListener('click', () => {
  if(!isQuestionOpened) {
    questionWrapperElem.classList.remove('hidden');
    btnQuestionSpanElem.innerText = 'X';
    isQuestionOpened = !isQuestionOpened;
  } else {
    questionWrapperElem.classList.add('hidden');
    isQuestionOpened = !isQuestionOpened;
    btnQuestionSpanElem.innerText = '?';
  }
});






// 무드 추가 버튼 클릭 시 열기/닫기
function openMoodSelector() {
  currentPageInfo.year = year;
  currentPageInfo.month = month;
  btnToggleDateSpanElem.textContent = `${date} ${week}`
  moodSlcWrapperElem.classList.remove('close');
  moodSlcWrapperElem.classList.add('open');
  dimmedElem.classList.remove('hidden');
}

btnMood.addEventListener('click', openMoodSelector);


// 무드 선택창 외부 영역 클릭 시 숨기기
dimmedElem.addEventListener('click', (e) => {
  moodSlcWrapperElem.classList.add('close');
  moodSlcWrapperElem.classList.remove('open');
  dimmedElem.classList.add('hidden');
});


// 무드 선택창 외부 영역 클릭 시 숨기기
dimmedElem.addEventListener('touchend', (e) => {
  moodSlcWrapperElem.classList.add('close');
  moodSlcWrapperElem.classList.remove('open');
  dimmedElem.classList.add('hidden');
});





// 통계 그래프


const statsWrapperElem = document.querySelector('.stat-wrapper');
const statsElem1 = document.querySelector('.stats-1');
const statsElem2 = document.querySelector('.stats-2');
const statsElem3 = document.querySelector('.stats-3');
const statsElem4 = document.querySelector('.stats-4');
const statsElem5 = document.querySelector('.stats-5');
const statsDateElem = document.querySelector('.stat-date');

function setStat() {
  statsDateElem.textContent = `${currentPageInfo.year}.${String(currentPageInfo.month).padStart(2, '0')}`
  let countScore1 = 0;
  let countScore2 = 0;
  let countScore3 = 0;
  let countScore4 = 0;
  let countScore5 = 0;
  let heightScore1;
  let heightScore2;
  let heightScore3;
  let heightScore4;
  let heightScore5;
  
  filterMood();
  filteredMoods.forEach((item) => {
    if (item.score == 0) {
      return;
    } else if (item.score == 1) {
      countScore1 += 1;
    } else if (item.score == 2) {
      countScore2 += 1;
    } else if (item.score == 3) {
      countScore3 += 1;
    } else if (item.score == 4) {
      countScore4 += 1;
    } else if (item.score == 5) {
      countScore5 += 1;
    }
  });
  let countScoreSum = countScore1 + countScore2 + countScore3 + countScore4 + countScore5;
  
  heightScore1 = countScore1 == 0 ? 3 : 150 * (countScore1 / countScoreSum);
  heightScore2 = countScore2 == 0 ? 3 : 150 * (countScore2 / countScoreSum);
  heightScore3 = countScore3 == 0 ? 3 : 150 * (countScore3 / countScoreSum);
  heightScore4 = countScore4 == 0 ? 3 : 150 * (countScore4 / countScoreSum);
  heightScore5 = countScore5 == 0 ? 3 : 150 * (countScore5 / countScoreSum);
  


  statsElem1.querySelector('.stat-bar').style.height = `${heightScore1}px`;
  statsElem2.querySelector('.stat-bar').style.height = `${heightScore2}px`;
  statsElem3.querySelector('.stat-bar').style.height = `${heightScore3}px`;
  statsElem4.querySelector('.stat-bar').style.height = `${heightScore4}px`;
  statsElem5.querySelector('.stat-bar').style.height = `${heightScore5}px`;

  statsElem1.querySelector('.stat-count').innerText = `${countScore1}`;
  statsElem2.querySelector('.stat-count').innerText = `${countScore2}`;
  statsElem3.querySelector('.stat-count').innerText = `${countScore3}`;
  statsElem4.querySelector('.stat-count').innerText = `${countScore4}`;
  statsElem5.querySelector('.stat-count').innerText = `${countScore5}`;
}

setStat();


btnStatElem.addEventListener('click', () => {
  setStat();
  dimmedBlackElem.classList.remove('hidden');
  statsWrapperElem.classList.remove('hidden');
})



function closeStat() {
  statsWrapperElem.classList.add('hidden');
  dimmedBlackElem.classList.add('hidden');
}




let result = [];
let multiLineResult = '';
let textAreaElem;

function shareText() {
  result = [];
  const moodCircleElems = document.querySelectorAll('.mood-circle');
  textAreaElem = document.createElement('textarea');
  textAreaElem.classList.add('share-text');
  body.appendChild(textAreaElem);
  // textAreaElem.textContent = '';
  let oneLineResult = '';
  textAreaElem.textContent = '';
  multiLineResult = '';
  moodCircleElems.forEach((item) => {
    item.dataset.score == 6 ? false : oneLineResult += scoreEmoji[item.dataset.score];
  });
  const resultLineNum = Math.ceil((oneLineResult.length / 2) / 7);
  
  if (currentPageInfo.year == year && currentPageInfo.month == month) {
    textAreaElem.textContent = `Mood rating for today: ${filteredMoods[date - 1].score}/5 ${scoreEmoji[filteredMoods[date - 1].score]}\n\n`;
    multiLineResult = `Mood rating for today: ${filteredMoods[date - 1].score}%2f5 ${scoreEmoji[filteredMoods[date - 1].score]}%0a%0a`
  }
  textAreaElem.textContent += `Mood circles for ${monthShort[currentPageInfo.month - 1]} ${currentPageInfo.year} :\n`;
  multiLineResult += `Mood circles for ${monthShort[currentPageInfo.month - 1]} ${currentPageInfo.year} :%0a`;
  for (let i = 0; i < resultLineNum; i++) {
    result.push(oneLineResult.substr(i * 14, 14));
    textAreaElem.textContent += `${result[i]}\n`;
    multiLineResult += `${result[i]}%0a`;
  }
  textAreaElem.textContent += `\n#MoodCircle #Mood\n`;
  multiLineResult += `%0a%23MoodCircle %23Mood`;
  // textAreaElem.select();
  // textAreaElem.setSelectionRange(0, 99999);
  // document.execCommand('copy');
  }





const toast = document.querySelector('.toast');
let isToastShown = false;

function shareCheck() {
  if (isToastShown) return;
  isToastShown = true;
  toast.classList.add('show');
  setTimeout(function () {
      toast.classList.remove('show');
      isToastShown = false;
  }, 2000);
}




// URL Encoding
// %0a : 줄바꿈
// %2f : 슬래시
function shareTwitter() {
  const shareUrl = "https://mood-circle.netlify.app"; // 전달할 URL
  window.open(`https://twitter.com/intent/tweet?text=${multiLineResult}`);
}





btnShareElem.addEventListener('click', () => {
  setDate();
  shareText();
  console.log(currentPageInfo.year == year && currentPageInfo.month == month, filteredMoods[date - 1].score);
  if (currentPageInfo.year == year && currentPageInfo.month == month && filteredMoods[date - 1].score == 6) {
    shareCheck();
  } else if (navigator.share) {
    navigator.share({
      title: 'Mood Circle',
      text: `${textAreaElem.textContent}`,
      url: '',
    }).then(() => {
      console.log('Thanks for sharing!');
    })
    .catch(console.error);
  } else {
    shareTwitter();
  }
  textAreaElem.remove();
});




// 다크모드
let darkToggle = false;

function drakModeToggle() {
  if (darkToggle === true) {
    darkToggle = !darkToggle;
    localStorage.setItem('darkmode', darkToggle);
  } else {
    darkToggle = !darkToggle;
    localStorage.setItem('darkmode', darkToggle);
  }
}


function darkMode() {
  if (darkToggle == true) { // 다크모드 활성화
    body.classList.remove('white-bg');
    body.classList.add('dark-bg');
    warpperElem.classList.add('dark');
    nameFormElem.classList.add('dark');
    moodSlcWrapperElem.classList.add('dark');
    btnMood.classList.add('white');
    toastElem.classList.add('dark');
    document.querySelectorAll('.circle-date').forEach((item) => {
      item.classList.add('dark');
    });
    datePickerWrapperElem.classList.add('dark');
    datePickerYearElem.classList.add('dark');
    btnYearPrevElem.classList.add('dark');
    btnYearNextElem.classList.add('dark');
    datePickerMonthElem.classList.add('dark');
    questionWrapperElem.classList.add('dark');
    statsWrapperElem.classList.add('dark');
  } else { // 다크모드 비활성화
    body.classList.remove('dark-bg');
    body.classList.add('white-bg');
    warpperElem.classList.remove('dark');
    nameFormElem.classList.remove('dark');
    moodSlcWrapperElem.classList.remove('dark');
    btnMood.classList.remove('white');
    toastElem.classList.remove('dark');
    document.querySelectorAll('.circle-date').forEach((item) => {
      item.classList.remove('dark');
    });
    datePickerWrapperElem.classList.remove('dark');
    datePickerYearElem.classList.remove('dark');
    btnYearPrevElem.classList.remove('dark');
    btnYearNextElem.classList.remove('dark');
    datePickerMonthElem.classList.remove('dark');
    questionWrapperElem.classList.remove('dark');
    statsWrapperElem.classList.remove('dark');
  }
}


if (savedDarkMode === null) {
  darkToggle = false;
  savedUsername === null ? themeBubbleElem.classList.add('hidden') : themeBubbleElem.classList.remove('hidden');
} else {
  themeBubbleElem.classList.add('hidden');
  darkToggle = JSON.parse(savedDarkMode);
  darkMode();
}



appNameElem.addEventListener('touchend', () => {
  themeBubbleElem.classList.add('hidden');
  drakModeToggle();
  darkMode();
});




// 날짜 선택
let savedYear;
let savedMonth;
let selectedYear = currentPageInfo.year;
let selectedMonth = currentPageInfo.month;


function arrowChecker() {
  savedYear.some((item) => item < selectedYear) ? btnYearPrevElem.classList.remove('inactive') : btnYearPrevElem.classList.add('inactive');
  savedYear.some((item) => item > selectedYear) ? btnYearNextElem.classList.remove('inactive') : btnYearNextElem.classList.add('inactive');
}

function datePicker() {
  datePickerYearSpanElem.innerText = currentPageInfo.year;

  savedYear = new Set(moods.map((item) => item.year));
  savedYear = [...savedYear];

  arrowChecker();
  
  btnYearPrevElem.addEventListener('click', () => {
    if (savedYear.some((item) => item < selectedYear)) {
      selectedYear--;
      datePickerYearSpanElem.innerText = selectedYear;
      datePickerMonthRender();
    } else {
      return;
    }
    arrowChecker();
  });

  btnYearNextElem.addEventListener('click', () => {
    if (savedYear.some((item) => item > selectedYear)) {
      selectedYear++;
      datePickerYearSpanElem.innerText = selectedYear;
      datePickerMonthRender();
    } else {
      return;
    }
    arrowChecker();
  });
}

datePicker();


function datePickerMonthRender() {
  savedMonth = moods.filter((item) => {
    return item.year == selectedYear;
  });
  savedMonth = new Set(savedMonth.map(item => item.month));
  savedMonth = [...savedMonth];

  datePickerMonthCircleElems.forEach((item) => {
    item.dataset.year = selectedYear;
  });
  
  datePickerMonthCircleElems.forEach((item) => {
    if (savedMonth.includes(parseInt(item.dataset.month))) {
      item.dataset.status = 'exist';
      item.addEventListener('click', onPickerMonth);
      item.addEventListener('click', closeDatePicker);
    } else {
      item.dataset.status = 'empty';
      item.removeEventListener('click', onPickerMonth);
      item.removeEventListener('click', closeDatePicker);
    }
    if (item.dataset.year == currentPageInfo.year && item.dataset.month == currentPageInfo.month) {
      item.dataset.status = 'selected';
    }
  });
}

datePickerMonthRender();


function onPickerMonth(e) {
  currentPageInfo.year = e.currentTarget.dataset.year;
  currentPageInfo.month = e.currentTarget.dataset.month;
  monthElem.textContent = `${currentPageInfo.year}${String(currentPageInfo.month).padStart(2, '0')}`;
  datePickerMonthRender();
  render(moods);
}



function openDatePicker() {
  datePickerWrapperElem.classList.remove('close');
  datePickerWrapperElem.classList.add('open');
  dimmedBlackElem.classList.remove('hidden');
}

function closeDatePicker() {
  datePickerWrapperElem.classList.add('close');
  datePickerWrapperElem.classList.remove('open');
  dimmedBlackElem.classList.add('hidden');
}

monthElem.addEventListener('click', openDatePicker);


// 날짜 선택창 외부 영역 클릭 시 숨기기
dimmedBlackElem.addEventListener('click', () => {
  closeStat();
  closeDatePicker();
});


// 날짜 선택창 외부 영역 클릭 시 숨기기
dimmedBlackElem.addEventListener('touchend', () => {
  closeStat();
  closeDatePicker();
});

