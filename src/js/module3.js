//
//  Module Name 
//  --------------------------------------------------------------------------------------------------------------------
//  Describe the module here
//

var MyOtherModule = ( function( window, undefined ) {

  function myMethod() {
    alert( 'my method' );
  }

  function myOtherMethod() {
    alert( 'my other method' );
  }

  // explicitly return public methods when this object is instantiated
  return {
    someMethod : myMethod,
    someOtherMethod : myOtherMethod
  };

} )( window );

//  example usage
MyModule.myMethod(); // undefined
MyModule.myOtherMethod(); // undefined
MyModule.someMethod(); // alerts "my method"
MyModule.someOtherMethod(); // alerts "my other method"
