/**
 * http://markliversedge.blogspot.com/2014/07/wbal-its-implementation-and-optimisation.html
 * Adapted from https://github.com/chanezgr/IQwprimebal/blob/master/source/WPRIMEBALView.mc
 */

module.exports = class WPrimeCalculator {
  
    constructor(criticalPower, wPrime) {
      this.criticalPower = criticalPower;
      this.wPrime = wPrime;
      this.wPrimeBalance = wPrime;
      this.integral = 0;
    }
  
    computeDifferential(power) {    
      if (power < this.criticalPower) {
        this.wPrimeBalance += this.recharge(power);    
      } else {
        this.wPrimeBalance += this.deplete(power);
      }    
    }  
  
    recharge(power) {
      return (this.criticalPower - power) * (this.wPrime - this.wPrimeBalance) / this.wPrime;
    }
  
    deplete(power) {
      return (this.criticalPower - power);
    }
  
    // untested
    computeIntegral(power, elapsedSec) {
      let amountAboveCriticalPower = 0;
      let amountBelowCriticalPower = 0;
      let countBelowCriticalPower = 0;
    
      if (power > this.criticalPower) {
        amountAboveCriticalPower = power - this.criticalPower;
      }
      
      if (power < this.criticalPower) {
        amountBelowCriticalPower += power;
        countBelowCriticalPower++;
      }
      
      let tau = countBelowCriticalPower > 0
        ? 546 * Math.pow(Math.E, -0.01 * (this.criticalPower - (amountBelowCriticalPower / countBelowCriticalPower))) + 316
        : 546 * Math.pow(Math.E, -0.01 * this.criticalPower) + 316;
      
      this.integral += Math.exp(elapsedSec / tau) * amountAboveCriticalPower;
      const output = Math.exp(-elapsedSec / tau) * this.integral;
      this.wPrimeBalance = this.wPrime - output;
    }
  
  }