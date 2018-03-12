class SmartCalculator {
  constructor(initialValue) {
    this._value = [initialValue];
    this._tempArr = [];
    this._result;
    this.__proto__.toString = () => this._result;

    this._solver =  function() {
      this._tempArr = [];
      this._value.reduceRight( (prevValue, item, i, arr) => {
        switch( item ) {
          case '*': return arr[i - 1] * prevValue;
          break;
          case '/': return arr[i - 1] / prevValue;
          break;
          case '^': return Math.pow(arr[i - 1], prevValue);
          break;
          case '+': 
            this._tempArr.push(prevValue);
            return arr[i - 1];
          break;
          case '-': 
            this._tempArr.push(-prevValue);
            return arr[i - 1];
          break;
          default:
          if ( arr[i - 1] === undefined ) this._tempArr.push(prevValue); 
          return prevValue;
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
