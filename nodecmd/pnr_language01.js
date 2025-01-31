// Basic PnR structure for coffee bar domain
const coffeeDomainPnR = {
    // Level 1: Common words in coffee domain
    basicWords: {
        "i": {
            responses: ["personal_pronoun"],
            trivalence: "Y"
        },
        "want": {
            responses: ["request_verb"],
            trivalence: "Y"
        },
        "a": {
            responses: ["article"],
            trivalence: "Y"
        },
        "large": {
            responses: ["size_modifier"],
            trivalence: "Y"
        },
        "iced": {
            responses: ["temperature_modifier"],
            trivalence: "Y"
        },
        "latte": {
            responses: ["coffee_type"],
            trivalence: "Y"
        }
    },

    // Level 2: Word combinations
    phrases: {
        "i want": {
            responses: ["request_start"],
            trivalence: "Y"
        },
        "large latte": {
            responses: ["size_drink"],
            trivalence: "Y"
        },
        "iced latte": {
            responses: ["temperature_drink"],
            trivalence: "Y"
        }
    },

    // Level 3: Complete orders
    orders: {
        "i want a large iced latte": {
            responses: ["valid_order"],
            validModifiers: ["with milk", "extra shot"],
            trivalence: "Y"
        }
    }
};

// Design Chunk for Word Recognition
class WordRecognitionChunk {
    static perform(word) {
        const pnrSet = coffeeDomainPnR.basicWords[word.toLowerCase()] || {
            responses: ["unknown"],
            trivalence: "N"
        };
        return {
            intention: "recognize_word",
            word: word,
            pnrSet: pnrSet
        };
    }
}

// Object for Phrase Formation
class PhraseFormationObject {
    static reflect(words) {
        const phrase = words.join(' ').toLowerCase();
        const pnrSet = coffeeDomainPnR.phrases[phrase] || {
            responses: ["unknown_phrase"],
            trivalence: "N"
        };
        return {
            intention: "form_phrase",
            phrase: phrase,
            pnrSet: pnrSet
        };
    }
}

// Design Chunk for Order Validation
class OrderValidationChunk {
    static perform(fullPhrase) {
        const orderPnr = coffeeDomainPnR.orders[fullPhrase.toLowerCase()];
        if (orderPnr) {
            return {
                intention: "process_order",
                order: fullPhrase,
                pnrSet: orderPnr
            };
        }
        return {
            intention: "invalid_order",
            order: fullPhrase,
            pnrSet: { responses: ["unknown_order"], trivalence: "N" }
        };
    }
}

// CPUX flow for processing customer input
function processCustomerInput(input) {
    // Step 1: Split input into words and process each word
    const words = input.split(' ');
    const recognizedWords = words.map(word => 
        WordRecognitionChunk.perform(word)
    );

    // Step 2: Form phrases from recognized words
    const phrases = [];
    for (let i = 0; i < words.length - 1; i++) {
        const twoWordPhrase = PhraseFormationObject.reflect([words[i], words[i + 1]]);
        if (twoWordPhrase.pnrSet.trivalence === "Y") {
            phrases.push(twoWordPhrase);
        }
    }

    // Step 3: Validate complete order
    const orderValidation = OrderValidationChunk.perform(input);

    // Return comprehensive analysis
    return {
        input: input,
        wordLevel: recognizedWords,
        phraseLevel: phrases,
        orderLevel: orderValidation,
        isValidOrder: orderValidation.pnrSet.trivalence === "Y"
    };
}

// Test the system
const testInput = "I want a large iced latte";
console.log(JSON.stringify(processCustomerInput(testInput), null, 2));