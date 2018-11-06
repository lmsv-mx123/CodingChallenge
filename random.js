function flip() {
	return Math.random() >= 0.5;
}

// returns a random binary of len bits
function rndUnboundedBinary(len) {
	var string = "";
	for(var i=0; i < len; i++) {
		string += flip() ? "1" : "0";
	}
	return string;
}

// returns a constrained binary delimited by upperBound
function rndBoundedBinary(len, upperBound) {
	var string;
	do {
		string = rndUnboundedBinary(len);
	} while(parseInt(string, 2) > upperBound);
	return string;
}

// returns a constrained binary delimited that can be also biased
function rndBinary(maxLen, upperBound, biased) {
	var len;
	var lenOfMaxLen = maxLen.toString(2).length;
	// biases generator by weighting similar between binary string lengths
	if(biased) {
		len = parseInt(rndBoundedBinary(lenOfMaxLen, maxLen), 2);
	}
	else {
		len = maxLen;
	}
	return rndBoundedBinary(len, upperBound);
}

function randomNumber(n) {
	if(n === undefined)
		throw new Error('Please supply n');
	if(isNaN(n))
		throw new Error('The specified n is not numeric');
	if(n != parseInt(n, 10))
		throw new Error('The specified n must be an integer');
	if(n <= 0)
		throw new Error('Number n must be greater than 0');
	if(n > 1000000)
		throw new Error('Number n must be less than 1,000,000');
	
	if(n === 1)
		return 0;
	
	var upperBound = n - 1;
	//length of upper bound, being represented as binary bits 
	var stringLength = upperBound.toString(2).length;
	
	var binaryString = rndBinary(stringLength, upperBound, false);
	return parseInt(binaryString, 2);
}