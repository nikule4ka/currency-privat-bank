# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## High-level mockups for tech task
https://drive.google.com/file/d/1c23I1p57iTinRdsLrWleEHYSxb43Cq95/view?usp=sharing

## Currency API
https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5

 - On each 5th api request - imitate server error (create counter, store it in localStorage). After - reset value in localStortage. On error case - hide table, show error message.
- Buy/Sell cells must be editable, on cell hover - edit icon appears, edit icon onClick - appears editable input with two save/cancel icons, input value validations - input value must be +- 10%  + initial currency value from api, otherwise - save icon must be disabled.
- Example of editable cell mockup https://drive.google.com/file/d/1JkF_n03lIO4T6WDcfRG5nUZL38b15U3o/view?usp=sharing
- Create currency converter: two input fields and appropriate dropdown with currencies(USD, EUR, UAH, BTC), calculate button, currency for calculations - get actual (can be changed in the table) value from cell with currency
Example - in the mockups (https://drive.google.com/file/d/1c23I1p57iTinRdsLrWleEHYSxb43Cq95/view?usp=sharing two dropdowns with currencies). Values in the input can be swapped (please see arrow, functionality the same as in google translate for example).
- On page reloading - wipe out editabled data, fetch fresh currency rates from api
- Cover by unit tests  - currency converter and function, that will validate input values in the editable cells.
- Height of layout application - full screen height, without vertical scroll  header, footer - 100px height, all another vertical space - content.





