import initNes from "../../VendorMachine/nesClient.js";

const TACOS_ROOM_ID = "infinitesimal";
const MY_TACO_ID = "my-taco";
const MY_SCORE_ID = "my-score";

const cache = {};

export const getClient = ({ wsUrl } = {}) => {
    if (cache.client) {
        return cache.client;
    }

    const Nes = initNes();
    cache.client = new Nes.Client(wsUrl);

    return cache.client;
};

export const subscribe = async () => {
    const res = await internals.RoomClient.subscribe(
        `/rooms/${TACOS_ROOM_ID}`,
        internals.onRoomUpdate
    );
    return () => internals.RoomClient.disconnect();
};
