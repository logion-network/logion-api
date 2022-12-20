import { NetworkState } from "../src/index.js";

describe("NetworkState", () => {

    it("detects equality", () => {
        const nodesUp = [{
            url: "http://domain1.com",
        }];
        const nodesDown = [{
            url: "http://domain2.com",
        }];
        const networkState1 = new NetworkState(nodesUp, nodesDown);
        const networkState2 = new NetworkState(nodesUp, nodesDown);
        expect(networkState1.equals(networkState2)).toBeTrue();
    });

    it("detects inequality", () => {
        const nodesUp = [{
            url: "http://domain1.com",
        }];
        const nodesDown1 = [{
            url: "http://domain2.com",
        }];
        const nodesDown2 = [{
            url: "http://domain3.com",
        }];
        const networkState1 = new NetworkState(nodesUp, nodesDown1);
        const networkState2 = new NetworkState(nodesUp, nodesDown2);
        expect(networkState1.equals(networkState2)).toBeFalse();
    });
});
