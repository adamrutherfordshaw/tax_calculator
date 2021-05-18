const { FuelType } = require("./fuel-type");

let TaxCalculator = class TaxCalculator {
  constructor(year) {
    if (year === undefined) {
      let date = new Date();
      this.year = date.getFullYear();
    } else {
      this.year = year;
    }

    this.expensiveVehicleTaxToggleOn = false;
  }

  getYear() {
    return this.year;
  }

  turnOnExpensiveVehicleTax() {
    this.expensiveVehicleTaxToggleOn = true;
  }

  calculateDieselTax(emissions) {
    let price;

    if (emissions < 1) price = 0;
    else if (emissions < 51) price = 25;
    else if (emissions < 76) price = 105;
    else if (emissions < 91) price = 125;
    else if (emissions < 101) price = 145;
    else if (emissions < 111) price = 165;
    else if (emissions < 131) price = 205;
    else if (emissions < 151) price = 515;
    else if (emissions < 171) price = 830;
    else if (emissions < 191) price = 1240;
    else if (emissions < 226) price = 1760;
    else if (emissions < 256) price = 2070;
    else price = 2070;

    return price;
  }

  calculateTax(vehicle) {
    let price = 0;

    if (
      vehicle.listPrice > 40000 &&
      this.year > vehicle.dateOfFirstRegistration.getFullYear() &&
      this.expensiveVehicleTaxToggleOn
    )
      price = this.calculateExpensiveVehicleTax(vehicle);
    else
      switch (vehicle.fuelType) {
        case FuelType.PETROL:
          price = this.calculatePetrolTax(vehicle.co2Emissions);
          break;
        case FuelType.ALTERNATIVE_FUEL:
          price = this.calculateAlternativeTax(vehicle.co2Emissions);
          break;
        case FuelType.DIESEL:
          price = this.calculateDieselTax(vehicle.co2Emissions);
          break;
        case FuelType.ELECTRIC:
          price = 0;
          break;
      }

    return price;
  }

  calculatePetrolTax(emissions) {
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

  calculateAlternativeTax(emissions) {
    let price;

    if (emissions < 51) price = 0;
    else if (emissions < 76) price = 15;
    else if (emissions < 91) price = 95;
    else if (emissions < 101) price = 115;
    else if (emissions < 111) price = 135;
    else if (emissions < 131) price = 155;
    else if (emissions < 151) price = 195;
    else if (emissions < 171) price = 505;
    else if (emissions < 191) price = 820;
    else if (emissions < 226) price = 1230;
    else if (emissions < 256) price = 1750;
    else price = 2060;

    return price;
  }

  calculateExpensiveVehicleTax(vehicle) {
    let price = 0;

    switch (vehicle.fuelType) {
      case FuelType.PETROL || FuelType.DIESEL:
        price = 450;
        break;
      case FuelType.ALTERNATIVE_FUEL:
        price = 440;
        break;
      case FuelType.ELECTRIC:
        price = 310;
        break;
    }

    return price;
  }
};

module.exports = { TaxCalculator: TaxCalculator };
