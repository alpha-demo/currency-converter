# Introduction

This is a simple Currency Converter module built on Javascript, jQuery, CSS and Html.


# Structure:

+ index.html 
+ js
  - jFactSetCurrencyConverter.js 
  - jFactSetCurrencyConverter.min.js
  - jFactSetLanguages.js
  -	jFactSetRatesInput.js
  -	jquery-3.4.1.min.js
+ css
  - styleFSCurrencyConverter.css
  - styleFSCurrencyConverter.min.css
  - styleMain.css


# Purpose and Description of each file:

index.html: This brief html is the landing/home page which integrates the Module of the Currency Converter including the CSS Files for Styling and the jQuery and JavaScript files for the functionality.

jFactSetCurrencyConverter.js: This is the main JavaScript code container file, which has the code to process the conversion.

jFactSetCurrencyConverter.min.js: This file is the Minified version of jFactSetCurrencyConverter.js.

jFactSetLanguages.js: This file contains the Json Object with the Texts translations for English and Spanish. It could be extended for any other Language following the format and filling the respective translated texts.

jFactSetRatesInput.js: This file contains the Json Object with the Currency Rates for some Currencies. This information could be overriden or/and extended.

jquery-3.4.1.min.js: This is the minified file of the library jQuery current version.

styleFSCurrencyConverter.css: This CSS file has 3 options for the Style, fonts and colors, for the Currency Converter Module.

styleFSCurrencyConverter.min.css: This is the Minified version of the file: styleFSCurrencyConverter.css

styleMain.css: This file provides brief and basic styling for the landing/home page.
 
 
# Installation and Use:
  
  1. Download/Clone the Package.
  2. Decompress if needed.
  3. Open the: index.html in any browser.


# How to Customize:
  1.	With a Text Editor or Code Editor Application open the file index.html
  
  2.	To set the Language, change the first parameter of the method: FactSetCurrencyConverter:
  
    a. FactSetCurrencyConverter(0) [for Spanish]
    b. FactSetCurrencyConverter(1) [for English]
    
  3.	To customize the Style, chose one of the three available styles, changing the second parameter of the method FactSetCurrencyConverter:
    
    a. FactSetCurrencyConverter(0, 1) [White and Blue Style]
    b. FactSetCurrencyConverter(0, 2) [Black & Red Style]
    c. FactSetCurrencyConverter(0, 3) [Green Style]
