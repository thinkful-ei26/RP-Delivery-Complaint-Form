'use strict';

// Contains a value
// The value is non-empty
// The value is be exactly 5 characters long
// Each character is a number

export function required(value) {
  if(value === undefined) {
    return 'This is Required!'
  }
}

export function notEmpty(value) {
  if(value.trim() !== '' || undefined) {
    return 'Cannot be Empty'
  }
}

export function exactlyFive (value) {
  if(value.length !== 5) {
    return 'Must Be Exactly 5 Characters!'
  }
}

export function isANumber(value) {
  if(typeof value !== 'number') {
    return 'Must Be a Number'
  }
}