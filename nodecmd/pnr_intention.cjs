// pnr-demo.js
const readline = require('readline');

class IntentionSpaceObject {
    constructor(id, initialState) {
        this.id = id;
        this.state = initialState;
        this.mappings = [];
    }

    captureIntention(intention, pnr) {
        console.log('\n🔄 Capturing intention:', intention);
        console.log('📸 State snapshot:', JSON.stringify(this.state, null, 2));
        return {
            capturedAt: Date.now(),
            state: { ...this.state }
        };
    }

    reflectIntention(capturedState) {
        const mapping = this.mappings[0];
        console.log('\n🪞 Reflecting intention');
        console.log('📤 Mapped intention:', mapping.toIntention);
        return {
            intention: mapping.toIntention,
            pnr: capturedState,
            timestamp: Date.now()
        };
    }
}

class CloudObject extends IntentionSpaceObject {
    constructor(id, initialColor) {
        super(id, {
            my_color: {
                response: [initialColor],
                trivalence: 'Y'
            }
        });

        this.mappings = [{
            fromIntention: 'change_color',
            toIntention: 'request_color_change'
        }];
    }

    render() {
        const color = this.state.my_color.response[0];
        console.log('\n☁️  Cloud current state:');
        console.log(`Color: ${color}`);
        console.log('─'.repeat(20));
    }

    handleHumanIntent(intent) {
        console.log('\n👤 Received human intent:', intent);
        return {
            intention: 'change_color',
            pnr: this.state,
            timestamp: Date.now()
        };
    }
}

class DesignNode {
    process(pnr) {
        const currentColor = pnr.my_color.response[0];
        const newColor = currentColor === 'red' ? 'green' : 'red';
        return {
            my_color: {
                response: [newColor],
                trivalence: 'Y'
            }
        };
    }
}

// Set up CLI
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Initialize objects
const cloud = new CloudObject('cloud1', 'red');
const designNode = new DesignNode();

function simulateInteraction() {
    cloud.render();
    
    rl.question('\nPress [c] to change color, [q] to quit: ', (answer) => {
        if (answer.toLowerCase() === 'q') {
            rl.close();
            return;
        }

        if (answer.toLowerCase() === 'c') {
            // Human interaction
            const humanIntent = cloud.handleHumanIntent('change');

            // Object captures intention
            const captured = cloud.captureIntention(humanIntent.intention, humanIntent.pnr);

            // Object reflects intention
            const reflected = cloud.reflectIntention(captured.state);

            console.log('\n🔧 Design Node processing...');
            // Design Node processes
            const newState = designNode.process(reflected.pnr);

            // Update cloud state
            cloud.state = newState;
            
            console.log('\n✨ Transformation complete!');
        }

        simulateInteraction();
    });
}

console.log('=== PnR Cloud Color Demo ===');
simulateInteraction();