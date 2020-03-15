/**
 * FACTSET Javascript Library for Currency Converter.
 *
 * @author    Alejandro D. Bakker
 * @version   1.0.
 * @copyright 2020 Alejandro D. Bakker
 *
 */


/**
 *  Main and Unique Class to give the functionality of a Currency Converter Module which could be inserted into any
 *  web page and it is easy to customize in currency options, style and language.
 */
class FactSetCurrencyConverter {

    /**
     * The Constructor of the Class.
     *
     * @param prmLanguage integer chosen Language. Optional parameter.
     * @param prmStyle integer chosen Style. Optional parameter.
     * @param prmJsnRatesInput string customized rates provided as stringified json object.
     * @param prmJsnLanguageTranslationFile string customized language translations provided as stringified json object.
     */
    constructor(
        prmLanguage                   = 0,
        prmStyle                      = 3,
        prmJsnRatesInput              = "",
        prmJsnLanguageTranslationFile = "") {

        // >> Setting the jSon Input properties

        // jSon of Rates
        if ("" !== prmJsnRatesInput) {
            try {
                jsnFactSetRatesInput = JSON.parse(prmJsnRatesInput);
            } catch (e) {
                alert('The provided Rates are not valid.');
            }
        }

        // jSon of Language Translations
        if ("" !== prmJsnLanguageTranslationFile) {
            try {
                jsnFactSetLanguages = JSON.parse(prmJsnLanguageTranslationFile);
            } catch (e) {
                alert('The provided Language Translations are not valid.');
            }
        }

        // >> Setting public Properties

        // Validation of the chosen language parameter
        this.untCurrentLanguage = 0; // By Default
        this.strLocale          = "es-ES";
        if (Number.isInteger(prmLanguage) && (0 <= prmLanguage && jsnFactSetLanguages.length > prmLanguage)) {
            this.untCurrentLanguage = prmLanguage;
            this.strLocale          = jsnFactSetLanguages[prmLanguage].language;
        }

        // Validation of the chosen style parameter
        this.untChosenStyle = 3; // By Default
        if (Number.isInteger(prmStyle)) {
            this.untChosenStyle = prmStyle;
        }

    }

    /**
     * Method to build Html Currency Converter Module.
     *
     * @param prmStrDivId string the id of the
     */
    mthGenerateHtmlForm(prmStrDivId) {

        // Currency Options Selector
        let strCurrencyAcronym = '';
        let strCurrencyOptions = '';
        for (let arrIndex in jsnFactSetRatesInput) {
            strCurrencyAcronym = jsnFactSetRatesInput[arrIndex].base;
            strCurrencyOptions += '<option data-index="' + arrIndex + '" value="' + strCurrencyAcronym + '">' +
                                  jsnFactSetLanguages[this.untCurrentLanguage].currency_names[strCurrencyAcronym] +
                                  '</option>';
        }
        strCurrencyOptions += '</select>';

        // Base Currency Options
        let strBaseCurrencyOptions = '<select id="slcFactSetBaseCurrencyOptions">' +
                                     strCurrencyOptions;

        // Target Currency Options
        let strTargetCurrencyOptions = '<select id="slcFactSetTargetCurrencyOptions">' +
                                       strCurrencyOptions;

        // Html Table
        let strTable = '<table id="tblFactSet">' +
                       '<tr>' +
                       '<td><input type="number" id="nmbInputValue" name="nmbInputValue" min="0.01" max="1000.00" ' +
                       ' step="0.01" value="1"></td>' +
                       '<td>' + strBaseCurrencyOptions + '</td>' +
                       '</tr>' +
                       '<tr>' +
                       '<td><div id="divResult"></div></td>' +
                       '<td>' + strTargetCurrencyOptions + '</td>' +
                       '</td>' +
                       '</table>';

        // Calculate the currency conversion
        let fncCalculate = function (prmLocale) {

            // Input value
            let dblInputValue = $("#nmbInputValue").val();

            // Base Currency
            let untBaseCurrencyIndex = $("#slcFactSetBaseCurrencyOptions option:selected").attr("data-index");

            // Target Currency
            let strTargetCurrencyAcronym = $("#slcFactSetTargetCurrencyOptions option:selected").val();

            // Currency Factor
            let dblCurrencyFactor = jsnFactSetRatesInput[untBaseCurrencyIndex].rates[strTargetCurrencyAcronym];

            // Result
            let dblCurrencyConverterResult = dblCurrencyFactor * dblInputValue;
            let strCurrencyConverterResult = Intl.NumberFormat(prmLocale,
                {style: 'currency', currency: strTargetCurrencyAcronym}).format(dblCurrencyConverterResult);
            $("#divResult").html(strCurrencyConverterResult);

        };

        // Html Currency Converter Module compressed into string format.
        let strHtml = '<h3>' + jsnFactSetLanguages[this.untCurrentLanguage].title + '</h3>' +
                      '<p>' + jsnFactSetLanguages[this.untCurrentLanguage].description + '</p>';
        strHtml += strTable;

        // Display
        let fncGetStyleName = function (prmUntChosenStyle) {
            switch (prmUntChosenStyle) {
                case 1:
                    return "clsStyleOption1";
                case 2:
                    return "clsStyleOption2";
                case 3:
                    return "clsStyleOption3";
                default:
                    return "clsStyleOption3";
            }
        };
        let strStyleName    = fncGetStyleName(this.untChosenStyle);
        $('#' + prmStrDivId).html(strHtml).addClass(strStyleName).show("slow");


        // >> Triggers

        // Change at the input value triggers the currency conversion
        $('#divMyCurrencyConverter').on('change', '#nmbInputValue', fncCalculate);

        // Select Base Currency option triggers the currency conversion
        $('#divMyCurrencyConverter').on('change', '#slcFactSetBaseCurrencyOptions', fncCalculate);

        // Select Base Currency option triggers the currency conversion
        $('#divMyCurrencyConverter').on('change', '#slcFactSetTargetCurrencyOptions', fncCalculate);

    }

}