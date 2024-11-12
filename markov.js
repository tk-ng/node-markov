/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== "");
		this.makeChains();
	}

	/** set markov chains:
	 *
	 *  for text of "the cat in the hat", chains will be
	 *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		this.chains = this.words.reduce((accum, word, idx) => {
			if (!accum[word]) {
				accum[word] = [];
			}
			accum[word].push(this.words[idx + 1] || null);
			return accum;
		}, {});
	}

	/** return random text from chains */
	static randomWord(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	makeText(numWords = 100) {
		// TODO
		let output = [];
		//pick starting word randomly
		let word = MarkovMachine.randomWord(Object.keys(this.chains));
		// if we picked null , we’ve reached the end of the chain, so stop. Otherwise, pick next-words randomly
		while (output.length < numWords && word !== null) {
			output.push(word);
			// pick next-words randomly
			word = MarkovMachine.randomWord(this.chains[word]);
		}
		return output.join(" ");
	}
}

module.exports = { MarkovMachine };
