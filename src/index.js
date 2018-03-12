class SmartCalculator {
  constructor(initialValue) {
    let self = this;
    this._value = [initialValue];
    this._tempArr = [];
    this._result;

    this._solver =  function() {
      self._value.reduceRight( (prevValue, item, i, arr) => {
        switch( item ) {
          case '*': return arr[i - 1] * prevValue;
          break;
          case '/': return arr[i - 1] / prevValue;
          break;
          case '^': return Math.pow(arr[i - 1], prevValue);
          break;
          case '+': 
            self._tempArr.push(prevValue);
            return arr[i - 1];
          break;
          case '-': 
            self._tempArr.push(-prevValue);
            return arr[i - 1];
          break;
          default:
          if ( arr[i - 1] === undefined ) self._tempArr.push(prevValue); 
          return prevValue;
        }
      } );
      
      self._result = self._tempArr.reduce( (prValue, value) => value + prValue );
    };
  }

  add(number) {
    this._value.push( '+', number );
    if ( this._flag ) clearTimeout( this._flag );
    this._flag = setTimeout( this._solver, 0 );
    return ( this._result )? this._result: this;
  }
  
  subtract(number) {
    this._value.push( '-', number );
    if ( this._flag ) clearTimeout( this._flag );
    this._flag = setTimeout( this._solver, 0 );
    return ( this._result )? this._result: this;
  }
  
  multiply(number) {
    this._value.push( '*', number );
    if ( this._flag ) clearTimeout( this._flag );
    this._flag = setTimeout( this._solver, 0 );
    return ( this._result )? this._result: this;
  }

  devide(number) {
    this._value.push( '/', number );
    if ( this._flag ) clearTimeout( this._flag );
    this._flag = setTimeout( this._solver, 0 );
    return ( this._result )? this._result: this;
  }

  pow(number) {
    this._value.push( '^', number );
    if ( this._flag ) clearTimeout( this._flag );
    this._flag = setTimeout( this._solver, 0 );
    return ( this._result )? this._result: this;
  }
};

module.exports = SmartCalculator;
