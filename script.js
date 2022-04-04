const buttonData = [
  { id: 0, data: null },
  { id: 1, data: null },
  { id: 2, data: 'C' },
  { id: 3, data: '/' },
  { id: 4, data: '9' },
  { id: 5, data: '8' },
  { id: 6, data: '7' },
  { id: 7, data: '*' },
  { id: 8, data: '6' },
  { id: 9, data: '5' },
  { id: 10, data: '4' },
  { id: 11, data: '+' },
  { id: 12, data: '3' },
  { id: 13, data: '2' },
  { id: 14, data: '1' },
  { id: 15, data: '-' },
  { id: 16, data: null },
  { id: 17, data: '0' },
  { id: 18, data: null },
  { id: 19, data: '=' }
];
const buttons = buttonData.map((button) => {
  if (button.data) {
    return `<div class="btn calc-btn">
                <div class="btn-contentful">${button.data}</div>
            </div>`;
  }

  return '<div class="btn"></div>';
});
$('.btn-container').append(buttons);

let operationsArray = [];
let operationResult;
$('.calc-btn').click(function (e) {
  if (e.target.classList.contains('btn-contentful')) {
    const currentValue = e.target.textContent;
    const pushCurrentValue = () => operationsArray.push(currentValue);

    if (currentValue === 'C') {
      operationsArray.length = 0;
      operationResult = 0;
      $('.screen-value').css('color', 'black');
    } else if (currentValue === '=') {
      if (operationsArray.some((values) => values.match(/[/*\-+]/g))) {
        const notEval = new Function(`return ${operationsArray.join('')}`);
        operationResult = notEval();

        operationsArray.push('=');
        operationsArray.push(`${operationResult}`);
        const operationToLog = operationsArray.join('');

        if ($('.screen-value').text() !== 'ERROR') {
          $('.log').prepend(`<div class="log-entry">
              <button class="btn circle-btn"></button>
              <p class="logged-operation ${
                operationToLog.includes('48') && 'underlined-text'
              }">${operationToLog}</p>
              <button class="btn close-btn">
                <i class="fas fa-times"></i>
              </button>
            </div>`);
        }
      }
    } else if (currentValue.match(/[0-9]/g)) {
      if (operationsArray.some((v) => v === '=')) {
        operationsArray.length = 0;
        operationResult = 0;
      }
      pushCurrentValue();
    } else if (currentValue.match(/[/*\-+]/g)) {
      const MINUS_ONE = -1;
      if (
        operationsArray.at(MINUS_ONE) &&
        operationsArray.at(MINUS_ONE).match(/[/*\-+]/g)
      ) {
        operationsArray.pop();
      }
      pushCurrentValue();
    } else {
      pushCurrentValue();
    }
  }

  const operationToShowOnScreen = operationsArray.join('');
  operationToShowOnScreen.includes('/0')
    ? $('.screen-value').text('ERROR').css('color', 'red')
    : $('.screen-value').text(operationResult || operationToShowOnScreen || 0);
});

$('.log').on('click', '.circle-btn', function () {
  $(this).toggleClass('explicit-fill-class');
});
$('.log').on('click', '.close-btn', function () {
  $(this).parent().remove();
});
$('.log').scroll(function () {
  console.log(`Scroll Top: ${$(this).scrollTop()}`);
});
