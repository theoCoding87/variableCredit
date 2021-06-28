
function UpdateTitle (f) // OnKeyUp
{
  // updating the document-title for having multiple tabs with modified titles do distinguish them
  var vTitle = "";
  vTitle = String(f.description.value);
  document.title = vTitle;
  if (vTitle == "")
  {
    document.title = "Kredit Variabel";
  }
}

function compute(f) // input class myButton
{

  // principle: total amount of all credit-payments are related to 24 months due to product warranty of 20 years

  //#####################################################
  // Creating a Div-Chart of 2 Bars for displaying the additional Output of the new PV-Generator
  // Create Fraction of two Numbers: vCurrentConsumption divided by vGeneratedOutput
  var vCurrentConsumption = Number(f.currentConsumption.value);
  var vGeneratedOutput = Number(f.generatedOutput.value);





  // Concidering wether Photovoltaik gets more than what is needed

  //ToDo: if (vCurrentConsumption == vGeneratedOutput)

  if (vCurrentConsumption < vGeneratedOutput)
  {
      //Check if ComputeFunction has been avoked before and if there is any EnBW as DIV
      //is initially "none": property document.getElementById('EnbwLegendColor').style.display
      if (document.getElementById('EnbwLegendColor').style.display == "inline")
      {
        document.getElementById('EnBW').style.visibility="hidden";
        document.getElementById('EnBW').style.Width="0px";
        document.getElementById('EnbwLegendText').style.display="none";
        document.getElementById('EnbwLegendColor').style.display="none";
        document.getElementById('LegendWrapper').style.display="none";
        document.getElementById('BarChart').style.borderBottomRightRadius="5px";
        document.getElementById('BarChart').style.borderTopRightRadius="5px";
        // Todo: Get the wraper less high after manipulating
      }


      vBarChartFraction = (vCurrentConsumption / vGeneratedOutput);
      vBarChartFraction = vBarChartFraction * 100;

      vBarChartFraction = String(vBarChartFraction);
      vBarChartFraction += '%';


      // Todo: 1ar BarChart radius 15px 2nd if (vComption > vGeneratedOutput) {BorderRadius only left}
      // right borders of   BarChart radius like left botrder
      document.getElementById('CurrentConsumptionBar').style.width=vBarChartFraction;
      document.getElementById('BarChart').style.width="100%";
  }

  if (vCurrentConsumption > vGeneratedOutput)
    {
      vBarChartFraction = (vGeneratedOutput / vCurrentConsumption);
      vBarChartFraction = vBarChartFraction * 100;

      vBarChartFractionNumber = String(vBarChartFraction);
      vBarChartFractionNumber += '%';

      // manipulating borderos of Barchart for displaying clear "cut" to vEnbwWidth

      document.getElementById('BarChart').style.borderTopRightRadius="0px";
      document.getElementById('BarChart').style.borderBottomRightRadius="0px";


      document.getElementById('EnbwLegendText').style.display="inline";
      document.getElementById('EnbwLegendColor').style.display="inline";
      document.getElementById('LegendWrapper').style.display="inline";

      document.getElementById('BarChart').style.width=vBarChartFractionNumber;
      document.getElementById('CurrentConsumptionBar').style.width="100%";

      // rescale width of div "EnBW"
      vEnbwWidth = 100 - vBarChartFraction;
      vEnbwWidth = String(vEnbwWidth);
      vEnbwWidth += '%';
      document.getElementById('EnBW').style.visibility="visible";
      document.getElementById('EnBW').style.width=vEnbwWidth;
    }









  //#####################################################
  // Calculating monthly Payment
  // Getting values of Numbers as Type of Number at first
  var vPrice = Number(f.Price.value);
  var vInterest = (Number(f.interest.value)/100).toFixed(3);
  var vDuration = Number(f.duration.value);
  var vCloudFee = Number(f.cloudFee.value);
  var vCompensation = Number(f.compensation.value);

  if (vPrice != 0 && vInterest == 0 && vDuration == 0) // direct paymant without any credit
  {
      var vRepayment = vPrice / 20; // due to having vCompenssation fixed for 20 Years
      vRepayment = vRepayment / 12;
      vCompensation = vCompensation / 12;
      vRepayment = vRepayment - vCompensation + vCloudFee
      vRepayment = vRepayment.toFixed(2);
      f.solution.value = vRepayment;
  }

  if (vPrice == 0 && vDuration == 0 && vInterest == 0) // to calculate absolute monthly costs after payment (after credit is paid)
  {
      var vSolution = vCompensation / 12;
      vSolution = vSolution + vCloudFee;
      vSolution = vSolution.toFixed(2);
      f.solution.value = vSolution;
  }


  if (vDuration > 0 && vInterest > 0.000 ) // arbitrary duration for credit
  {

    //#####################################################
    // Calculate total Annuity according to vInterest and vDuration
    var vEins = 1;
    var vOnePlusInterest = parseFloat(vInterest) + parseFloat(vEins);  // 1 + interest rate

    var vDenominator = vOnePlusInterest ** parseFloat(vDuration); // may built as variable later, due to multipe usage
    vDenominator = vDenominator * parseFloat(vInterest); // is denominator

    var vNumerator = vOnePlusInterest ** parseFloat(vDuration); // may built as variable later, due to multipe usage
    vNumerator = vNumerator - parseFloat(1);

    var vFraction = vDenominator / vNumerator;

    var vSolution = vFraction * parseFloat(vPrice);
    vSolution = vSolution * vDuration; // is the annual Annuity multiplied by Years of Credit Duration
    vSolution = vSolution / 240; // To get the amount for one month of 20 years

    var vSolutionTwo = vSolution.toFixed(2); //Due to the Need of another Variable. Not workable: vSolution = vSolution.toFixed(2);

    vSolutionTwo = Number(vSolutionTwo) + Number(vCloudFee);
    vSolutionTwo = vSolutionTwo - (vCompensation/12);
    vSolutionTwo = vSolutionTwo.toFixed(2);
    f.solution.value=vSolutionTwo;
  }
}
