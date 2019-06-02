/* eslint-disable no-undef */

// Local Time & Date
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const currentDate = new Date();

let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
const ampm = hours >= 12 ? 'PM' : 'AM';

hours %= 12;
hours = hours || 12;
minutes = `0${minutes}`.slice(-2);

const formattedDate = `${hours}:${minutes} ${ampm} - ${currentDate.getDate()} ${
  months[currentDate.getMonth()]
} ${currentDate.getFullYear()}`;
const domDate = document.querySelector('#getDate');

domDate.innerHTML = formattedDate;

//  <-- Jaden Smith's Philosophical Tweets Section -->

// value determines the next lesson
let lesson = 0;

const p = [...document.querySelectorAll('.hyp')];
const q = [...document.querySelectorAll('.conc')];

const adj = adjectives['it is'][Math.floor(Math.random() * adjectives['it is'].length)];
const adjSup = adjectives.adjSupport[Math.floor(Math.random() * adjectives.adjSupport.length)];
const support = Object.keys(adjectives)[0];

const hyp = standAloneWords[Math.floor(Math.random() * standAloneWords.length)];
const conc = standAloneWords[Math.floor(Math.random() * standAloneWords.length)];
const concFB = randomFallBack[Math.floor(Math.random() * randomFallBack.length)];

const indexHyp = standAloneWords.indexOf(hyp);
const indexConc = standAloneWords.indexOf(conc);

// Loop Hypothesis in DOM
function domLoopHyp(x) {
  const random = Math.floor(Math.random() * 2);

  x.forEach((xx) => {
    xx.innerHTML = random === 0 ? `${support} ${adj}` : hyp;
  });
}

// Loop Conclusion in DOM
function domLoopConc(y) {
  const random = Math.floor(Math.random() * 2);

  y.forEach((yy) => {
    yy.innerHTML = random === 0 ? `${support} ${adjSup}` : conc;
  });
}

const randomGenerator = Math.floor(Math.random() * 2);

switch (randomGenerator) {
  case 0:
    domLoopHyp(p);
    if (indexHyp !== indexConc) {
      domLoopConc(q);
    } else {
      q.forEach((qq) => {
        qq.innerHTML = concFB;
      });
    }
    break;
  case 1:
    domLoopHyp(q);
    domLoopConc(p);
    break;
  default:
    p.innerHTML = 'no hypothesis found';
    q.innerHTML = 'no conclusion found';
}

// <-- Lesson Section -->

const snippetHeading = document.querySelector('.snippet__start');
const gameContainer = $('.snippet');
const testArea = $('.test-area');
const varBoxes = $('.varboxes');
const varP = $('.p');
const varQ = $('.q');

// Detach these on start
$('.negation').detach();
const symbolThen = $('.then').detach();
const symbolAnd = $('.and').detach();
const symbolOr = $('.or').detach();
const snippetHelper = $('.snippet-helper').detach();

const validCheck = $('.validate');
const nextBtn = $('.next');
let answerArr = [];

const checkArray = {
  thenState: [
    '0',
    '1_then',
    '2',
  ],
  orState: [
    '0',
    '1_or',
    '2',
  ],
  andState: [
    '0',
    '1_and',
    '2',
  ],
};

// Determines if validation is correct or incorrect
let timer = null;

function time() {
  timer = window.setTimeout(() => {
    validCheck.removeAttr('style').html('Validate');
  }, 1000);
}

function start() {
  window.clearTimeout(timer);
  timer = null;
}

function arraysEqual(arr1, arr2) {
  const arrayPushed = arr1.filter(x => typeof x !== 'undefined').length;

  if (arrayPushed !== arr2.length) return false;

  if (JSON.stringify(arr1) === JSON.stringify(arr2)) {
    start();
    validCheck
      .css({
        'background-color': 'var(--green-hover)',
        color: 'var(--bg-light-color)',
      })
      .html('Correct! 👍');
    if (lesson === 0) {
      nextBtn.css('visibility', 'visible');
    }
  } else {
    start();
    validCheck
      .css({
        'background-color': 'var(--red-text-color)',
        color: 'var(--bg-light-color)',
      })
      .html('Wrong! 👎');
    // console.log(timer);
    time();
  }
  return true;
}

// Changes the snippet helper html
function snippetHelperHTML(x) {
  const getHyp = $('.hyp').html();
  const getConc = $('.conc').html();
  let replaceHyp = '';
  let replaceConc = '';

  snippetHelper.insertAfter('.snippet__help');

  // Default Case if none of the specific link verbs are found
  replaceHyp = getHyp;
  replaceConc = getConc;

  if (getHyp.toLowerCase().indexOf('it is') >= 0) {
    replaceHyp = getHyp.replace('it is', 'it is not');
  }

  if (getConc.toLowerCase().indexOf('it is') >= 0) {
    replaceConc = getConc.replace('it is', 'it is not');
  }

  if (getHyp.toLowerCase().indexOf('are') >= 0) {
    replaceHyp = getHyp.replace('are', 'are not');
  }

  if (getConc.toLowerCase().indexOf('are') >= 0) {
    replaceConc = getConc.replace('are', 'are not');
  }

  if (getHyp.toLowerCase().indexOf('is') >= 0) {
    replaceHyp = getHyp.replace('is', 'is not');
  }

  if (getConc.toLowerCase().indexOf('is') >= 0) {
    replaceConc = getConc.replace('is', 'is not');
  }

  if (getHyp.toLowerCase().indexOf('can') >= 0) {
    replaceHyp = getHyp.replace('can', 'can not');
  }

  if (getConc.toLowerCase().indexOf('can') >= 0) {
    replaceConc = getConc.replace('can', 'can not');
  }

  if (getHyp.toLowerCase().indexOf('human') >= 0) {
    replaceHyp = getHyp.replace("I'm", 'I am not');
  }

  if (getConc.toLowerCase().indexOf('human') >= 0) {
    replaceConc = getConc.replace("I'm", 'I am not');
  }

  if (getHyp.toLowerCase().indexOf('twilight') >= 0) {
    replaceHyp = getHyp.replace('watch', "don't watch");
  }

  if (getConc.toLowerCase().indexOf('watch') >= 0) {
    replaceConc = getConc.replace('watch', "don't watch");
  }

  // Determines the snippet helper sentence
  if (x === 1) {
    snippetHelper.html(`${replaceHyp} or ${getConc}.`);
  }

  if (x === 2) {
    snippetHelper.html(`If ${replaceConc}, then ${replaceHyp}.`);
  }

  if (x === 3) {
    snippetHelper.html(`If ${getConc}, then ${getHyp}.`);
  }

  if (x === 4) {
    snippetHelper.html(`If ${replaceHyp}, then ${replaceConc}.`);
  }

  if (x === 5) {
    snippetHelper.html(`${getHyp} and ${replaceConc}.`);
  }
}

// Switch Statement To Determine Math Lesson
function changeLogic(x) {
  switch (x) {
    // Starting Statement
    case 0:
      lesson = 0;
      symbolThen.insertAfter(varP);
      validCheck.mousedown(() => {
        arraysEqual(answerArr, checkArray.thenState);
      });
      nextBtn.mousedown(() => {
        changeLogic(1);
        symbolThen.detach();
        answerArr = [];
        testArea.removeAttr('style');
        validCheck.removeAttr('style').html('Validate');
        // Reset dragNdrop position
        varBoxes.css({
          left: varBoxes.data('originalLeft'),
          top: varBoxes.data('origionalTop'),
        });
      });

      break;

    // OR Equivalent
    case 1:
      lesson = 1;

      snippetHelperHTML(lesson);
      snippetHeading.innerHTML = 'Equivalent Or';

      varBoxes.attr('style');
      varP.html('~P');
      symbolOr.insertAfter(varQ);
      validCheck.mousedown(() => {
        arraysEqual(answerArr, checkArray.orState);
      });

      nextBtn.mousedown(() => {
        changeLogic(2);
        symbolOr.detach();
        answerArr = [];
        validCheck.removeAttr('style').html('Validate');
        testArea.removeAttr('style');
        // Reset dragNdrop position
        varBoxes.css({
          left: varBoxes.data('originalLeft'),
          top: varBoxes.data('origionalTop'),
        });
      });

      break;

    // Contrapositive
    case 2:
      lesson = 2;

      snippetHelperHTML(lesson);
      snippetHeading.innerHTML = 'Contrapositive';

      varBoxes.attr('style');
      symbolThen.insertAfter(varQ);

      varQ.html('~P');
      varP.html('~Q');

      validCheck.mousedown(() => {
        arraysEqual(answerArr, checkArray.thenState);
      });

      nextBtn.mousedown(() => {
        changeLogic(3);
        answerArr = [];
        testArea.removeAttr('style');
        validCheck.removeAttr('style').html('Validate');
        // Reset dragNdrop position
        varBoxes.css({
          left: varBoxes.data('originalLeft'),
          top: varBoxes.data('origionalTop'),
        });
      });

      break;

    // Converse
    case 3:
      lesson = 3;

      snippetHelperHTML(lesson);
      snippetHeading.innerHTML = 'Converse';

      varBoxes.attr('style');
      varQ.html('P');
      varP.html('Q');

      validCheck.mousedown(() => {
        arraysEqual(answerArr, checkArray.thenState);
      });

      nextBtn.mousedown(() => {
        changeLogic(4);
        answerArr = [];
        testArea.removeAttr('style');
        validCheck.removeAttr('style').html('Validate');
        // Reset dragNdrop position
        varBoxes.css({
          left: varBoxes.data('originalLeft'),
          top: varBoxes.data('origionalTop'),
        });
      });

      break;

    // Inverse
    case 4:
      lesson = 4;

      snippetHelperHTML(lesson);
      snippetHeading.innerHTML = 'Inverse';

      varBoxes.attr('style');
      varQ.html('~Q');
      varP.html('~P');
      varP.insertAfter(symbolThen);

      validCheck.mousedown(() => {
        arraysEqual(answerArr, checkArray.thenState);
      });

      nextBtn.mousedown(() => {
        changeLogic(5);
        answerArr = [];
        testArea.removeAttr('style');
        validCheck.removeAttr('style').html('Validate');
        symbolThen.detach();
        // Reset dragNdrop position
        varBoxes.css({
          left: varBoxes.data('originalLeft'),
          top: varBoxes.data('origionalTop'),
        });
      });

      break;

    // Negation
    case 5:
      lesson = 5;

      snippetHelperHTML(lesson);
      snippetHeading.innerHTML = 'Negation';

      varBoxes.attr('style');
      symbolAnd.insertAfter(varQ);
      varP.html('P');
      varQ.html('~Q');

      validCheck.mousedown(() => {
        arraysEqual(answerArr, checkArray.andState);
      });

      nextBtn.mousedown(() => {
        changeLogic(6);
        answerArr = [];
        validCheck.removeAttr('style').html('Replay? 🔁');
        testArea.remove();
        varBoxes.remove();
        $('.snippet__help').remove();
        snippetHelper.remove();
        $('.snippet__test').remove();
      });

      break;

    // THE END
    case 6:
      nextBtn.remove();
      $('.follow__me').css('display', 'flex');
      $('.follow__me').insertAfter(snippetHeading);

      $('.snippet__heading').html('Thank You');
      snippetHeading.innerHTML = "You've reached the end! 🎉";

      validCheck.mousedown(() => {
        window.location.reload();
      });

      break;

    default:
      console.log('no logic found');
  }
}

changeLogic(0);

varBoxes.data({
  originalLeft: varBoxes.css('left'),
  origionalTop: varBoxes.css('top'),
});

$(() => {
  const result = {};
  // <-- Draggable Section -->

  varBoxes.draggable({
    start(e) {
      [result.drag] = [e.target.id.split('_')[1]];
    },
    containment: gameContainer,
    revert: 'invalid',
  });

  // <-- Droppable Section -->

  testArea.droppable({
    accept: varBoxes,
    activeClass: 'active',
    hoverClass: 'hover',
    drop(event, ui) {
      const $this = $(this);
      const [draggable] = [ui.draggable];

      [result.drop] = [event.target.id.split('_')[1]];

      if (
        result.drag === result.drop &&
        (lesson === 0 || lesson === 2 || lesson === 3 || lesson === 4)
      ) {
        answerArr[result.drag] = checkArray.thenState[result.drag];
      } else if (result.drag === result.drop && lesson === 1) {
        answerArr[result.drag] = checkArray.orState[result.drag];
      } else if (result.drag === result.drop && lesson === 5) {
        answerArr[result.drag] = checkArray.andState[result.drag];
      } else {
        answerArr[result.drag] = '';
      }

      draggable.position({
        my: 'center',
        at: 'center',
        of: $this,
        using(pos) {
          $(this).animate(pos, 200, 'linear');
        },
      });
    },
  });
});
