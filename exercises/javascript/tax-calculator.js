let TaxCalculator = class TaxCalculator {
  constructor(year) {
    if (year === undefined) {
      let date = new Date();
      this.year = date.getFullYear();
    } else {
      this.year = year;
    }
  }

  getYear() {
    return this.year;
  }

  calculateTax(vehicle) {
    const emissions = vehicle.co2Emissions;
    console.log(emissions);
    let price;

    if (emissions < 1) price = 0;
    else if (emissions < 51) price = 10;
    else if (emissions < 76) price = 25;
    else if (emissions < 91) price = 105;
    else if (emissions < 101) price = 125;
    else if (emissions < 111) price = 145;
    else if (emissions < 131) price = 165;
    else if (emissions < 151) price = 205;
    else if (emissions < 171) price = 515;
    else if (emissions < 191) price = 830;
    else if (emissions < 226) price = 1240;
    else if (emissions < 256) price = 1760;
    else price = 2070;

    return price;
  }
};

module.exports = { TaxCalculator: TaxCalculator };
