/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

// const sortString = (string) => {
// 	return string.split("").sort().join("");
// };

// function isAnagram(str1, str2) {
// 	str1 = str1.toLowerCase();
// 	str2 = str2.toLowerCase();

// 	const sortedStr1 = sortString(str1);
// 	const sortedStr2 = sortString(str2);

// 	if (sortedStr1 === sortedStr2) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// }

function isAnagram(str1, str2) {
	return (
		str1.toLowerCase().split("").sort().join("") ===
		str2.toLowerCase().split("").sort().join("")
	);
}

module.exports = isAnagram;
