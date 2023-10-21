// Using for loop
var sum_to_n_a = function (n) {
  let sum = 0

  for (i = 1; i <= n; i++) {
    sum += i
  }
  return sum
}

// Using recursion
var sum_to_n_b = function (n) {
  if (n > 0) {
    return n + sum_to_n_b(n - 1)
  } else {
    return n
  }
}

// Using the arithmetic progression formula
var sum_to_n_c = function (n) {
  return n * ((n + 1) / 2)
}

// Results
console.log('A =>', sum_to_n_a(5)) // Output: 15
console.log('B =>', sum_to_n_b(5)) // Output: 15
console.log('C =>', sum_to_n_c(5)) // Output: 15
