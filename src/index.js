class SmartCalculator {
  constructor(initialValue) {
    this._value = [initialValue];
    this._tempArr = [];
    this._result;
    this._tempValue;
    this._multiply;
    this.__proto__.toString = () => this._result;

    this._solver =  function() {
      this._tempArr = [];
      this._value.reduceRight( (prevValue, item, i, arr) => {
        switch( item ) {
          case '*':
            if ( this._tempValue ) {
              if ( this._multiply ) {
                prevValue *= this._tempValue;
                this._tempValue = 0; 
              } else {
                prevValue /= this._tempValue;
                this._tempValue =0;
              };
            };

            return arr[i - 1] * prevValue;
          break;
          case '/': 
            if ( this._tempValue ) {
              if ( this._multiply ) {
                prevValue *= this._tempValue;
                this._tempValue = 0; 
              } else {
                prevValue /= this._tempValue;
                this._tempValue =0;
              };
            };

            return arr[i - 1] / prevValue;
          break;
          case '^': 
            if ( arr[i + 2] === '*' ) {
              this._multiply = true;
              this._tempValue = prevValue / arr[i + 1];
              prevValue = arr[i + 1];
            };
            if ( arr[i + 2] === '/' ) {
              this._multiply = false;
              this._tempValue = arr[i + 1] / prevValue;
              prevValue = arr[i + 1];
            }
            
            return Math.pow(arr[i - 1], prevValue);
          break;
          case '+':
            if ( this._tempValue ) {
              if ( this._multiply ) {
                prevValue *= this._tempValue;
                this._tempValue = 0; 
              } else {
                prevValue /= this._tempValue;
                this._tempValue =0;
              };
            };
          
            this._tempArr.push(prevValue);
            return arr[i - 1];
          break;
          case '-': 
            if ( this._tempValue ) {
              if ( this._multiply ) {
                prevValue *= this._tempValue;
                this._tempValue = 0; 
              } else {
                prevValue /= this._tempValue;
                this._tempValue =0;
              };
            };

            this._tempArr.push(-prevValue);
            return arr[i - 1];
          break;
          default:
            if ( arr[i - 1] === undefined ) {
              if ( this._tempValue ) {
                if ( this._multiply ) {
                  prevValue *= this._tempValue;
                  this._tempValue = 0; 
                } else {
                  prevValue /= this._tempValue;
                  this._tempValue =0;
                };
              };

              this._tempArr.push(prevValue)
            } else { 
            return prevValue;
            };
        }
      } );
      
      this._result = this._tempArr.reduce( (prValue, value) => value + prValue );
    };
  }

  add(number) {
    this._value.push( '+', number );
    this._solver();
    return this;
  }
  
  subtract(number) {
    this._value.push( '-', number );
    this._solver();
    return this;
  }
  
  multiply(number) {
    this._value.push( '*', number );
    this._solver();
    return this;
  }

  devide(number) {
    this._value.push( '/', number );
    this._solver();
    return this;
  }

  pow(number) {
    this._value.push( '^', number );
    this._solver();
    return this;
  }
};

module.exports = SmartCalculator;
