// Sound offfff!!!!!!
console.log("TACOOOOOOOOOOOOOOOOOOOOS!!!");

const DEBUG = true;

import NetworkManager from "./network-manager";
import merge from "../../VendorMachine/deepmerge.js";
import uuid from "../../VendorMachine/uuid.js";
import Throttle from "../../VendorMachine/throttle.js";
import {
    init as initParticlesSystem,
    genParticles,
} from "./particles-on-click.js";
import { randomFromArr } from "../Modules/arrayUtils.js";

let cache = {};
const internals = {};

const stateListeners = new Map();

const LOCALSTORAGE_KEY = "infinitesimal_state";
// const TACOS_ROOM_ID = 'tacos-n-friends';
const TACOS_ROOM_ID = "infinitesimal";

const CURSOR_UPDATE_THROTTLE = 14; // 14 milliseconds — close to 16 which would be 60 fps

// const ADMIN_AUTO_SYNC_INTERVAL = 10000;

export const STATE_EVENTS = {
    CONNECT_TO_NETWORK: "connectToNetwork",
    DISCONNECT_FROM_NETWORK: "disconnectFromNetwork",
    SYNC_REQUEST: "syncRequest",
    SYNC_RESPONSE: "syncResponse",
    UPDATE_STATE_EVENT: "updateState",
};

export const getState = () => cache;

export const defaultNames = ["Glarg", "Snenene", "Harl", "Lermp", "Roop"];

export const defaultState = {
    _version: "0.0000000004",
    _isNetworkSynced: false,
    _sessionId: null,
    _shouldConnectToNetwork: false,
    _isConnectedToNetwork: false,
    _name: randomFromArr(defaultNames),
    _isStateInitialized: false,
    networked: {
        game: {},
        presences: {},
    },
};

// Hot path
internals.moveCursor = ({ element, x, y }) => {
    // Hopefully the 'px' at the end here will negate attempts to run a script
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
};

internals.updateScore = ({ element, score }) => {
    if (!element) {
        console.warn("Score element not found");
        return;
    }

    element.textContent = score;
};

// We'll do the security layer on the receiving end
export const sendNetworkedEvent = ({ to, stateEvent }) => {
    if (!stateEvent) {
        throw new Error("Must specify stateEvent");
    }
    if (to) {
        // NAF.connection.sendDataGuaranteed(to, TACOS_ROOM_ID, stateEvent);
    } else {
        // NAF.connection.broadcastDataGuaranteed(TACOS_ROOM_ID, stateEvent);
    }
};

export const initState = ({ shouldConnectToNetwork = false, wsUrl } = {}) => {
    internals.myTacoEl = document.getElementById(MY_TACO_ID);
    internals.myScoreEl = document.getElementById(MY_SCORE_ID);

    console.log("init stateee, shouldConnectToNetwork", shouldConnectToNetwork);
    const storageState = JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY) || "{}"
    );
    // Only persist _sessionId from localStorage if we shouldConnectToNetwork
    const previousSessionId = [].concat(storageState._previousSessionIds).pop();
    const sessionId = shouldConnectToNetwork
        ? storageState._sessionId || previousSessionId || uuid()
        : uuid();

    // Compare versions and clear out the localStorage one if there's a higher version
    const storageVersion = Number(storageState?._version);
    const defaultVersion = Number(defaultState._version);

    if (!cache._isStateInitialized) {
        if (
            isNaN(storageVersion) ||
            (!isNaN(storageVersion) && storageVersion < defaultVersion)
        ) {
            internals.saveState(
                merge(defaultState, {
                    _sessionId: sessionId,
                    _previousSessionIds: [],
                })
            );
        } else {
            internals.saveState(
                merge(cache, {
                    ...merge(defaultState, storageState),
                    _sessionId: sessionId,
                    // Set will dedupe for us
                    _previousSessionIds: [
                        ...new Set([
                            ...storageState._previousSessionIds,
                            storageState._sessionId,
                        ]),
                    ]
                        .slice(0, 5)
                        .filter((x) => !!x),
                })
            );
        }
    }

    if (shouldConnectToNetwork) {
        onStateEvent({ eventName: STATE_EVENTS.CONNECT_TO_NETWORK, wsUrl });
    }

    if (!cache._isStateInitialized) {
        initParticlesSystem();
        // Desktop and mobile clicks
        window.addEventListener("mousemove", internals.onMouseMove);
        window.addEventListener("touchmove", internals.onTouchMove);
        window.addEventListener("click", internals.onClick);
    }

    cache._isStateInitialized = true;

    internals.runStateListeners({ eventName: "initState" });

    // Cleanup
    return () => {
        window.removeEventListener("touchmove", internals.onTouchMove);
        window.removeEventListener("mousemove", internals.onMouseMove);
        window.removeEventListener("click", internals.onClick);
    };
};

// Broadcast movements to the room and only
// update my view with what we get from the server
internals.onMouseMove = (evt) => {
    internals.roomX = evt.pageX;
    internals.roomY = evt.pageY;

    if (cache._isConnectedToNetwork) {
        internals.throttledBroadcast();
    }
};

// Mobile support
internals.onTouchMove = (evt) => {
    internals.onMouseMove({
        pageX: Math.round(evt.changedTouches[0].clientX),
        pageY: Math.round(evt.changedTouches[0].clientY),
    });
};

// My taco's particles
internals.onClick = (evt) => {
    genParticles(evt.clientX, evt.clientY);

    internals.lastClick = {
        epoch: Date.now(),
        x: evt.clientX,
        y: evt.clientY,
    };

    if (cache._isConnectedToNetwork) {
        internals.throttledBroadcast();
    }
};

export const unregisterNetworkedStateListener = (func) => {
    stateListeners.delete(func);
};

export const registerNetworkedStateListener = (func, options = {}) => {
    stateListeners.set(func, { func, options });
    return () => unregisterNetworkedStateListener(func);
};

internals.runStateListeners = (evt) => {
    stateListeners.forEach(({ func, options }) => {
        if (typeof func === "function") {
            if (options?.filter?.startsWith) {
                if (!evt.eventName.startsWith(options.filter.startsWith)) {
                    return;
                }
            }
            // Event callback
            func(evt);
        }
    });
};

internals.saveState = (data) => {
    cache = merge(cache, data);
    const storageObj = JSON.stringify({
        ...cache,
        _version: String(cache._version),
    });
    delete storageObj._isStateInitialized;
    localStorage.setItem(LOCALSTORAGE_KEY, storageObj);
};

const handleSyncRequest = ({ state, data }) => {
    // Any vars that start with an underscore won't be broadcasted to anyone else
    const stateWithPublicVars = Object.entries(state).reduce(
        (obj, [key, val]) => {
            if (key.startsWith("_")) {
                return obj;
            }
            return {
                ...obj,
                [key]: val,
            };
        },
        {}
    );
    // Send the latest state to the new user!
    return sendNetworkedEvent({
        to: data._senderId,
        stateEvent: { eventName: "syncResponse", ...stateWithPublicVars },
    });
};

// THE BIG STATE REDUCER
const onStateEvent = (stateEvt) => {
    const { eventName, _senderId, wsUrl, ...data } = stateEvt;

    // Get fresh state
    const state = getState();

    // TODO SECURITY only commit to state when actions are performed by ppl who are allowed (compare against presences)

    console.log("RECEIVED STATE EVENT", stateEvt);

    switch (eventName) {
        case STATE_EVENTS.CONNECT_TO_NETWORK:
            internals.initSocket({
                wsUrl,
                onNetworkEvent: (networkEvent) => onStateEvent(networkEvent),
            });
            break;
        case STATE_EVENTS.DISCONNECT_FROM_NETWORK:
            if (internals.networkUnsubscribe) {
                internals.networkUnsubscribe();
            }
            internals.saveState({
                _shouldConnectToNetwork: false,
            });
            break;
        case STATE_EVENTS.SYNC_REQUEST:
            handleSyncRequest({ state, data });
            break;
        case STATE_EVENTS.SYNC_RESPONSE:
            internals.saveState({
                ...data,
                _isNetworkSynced: true,
            });
            break;
        case STATE_EVENTS.UPDATE_STATE_EVENT:
            internals.saveState(data);
            break;
    }

    internals.runStateListeners(stateEvt);

    if (DEBUG) {
        console.log("Fresh state after update:");
        console.log("getState()", getState());
    }
};

export const applyAndSendNetworkedEvent = (stateEvt) => {
    onStateEvent(stateEvt);
    sendNetworkedEvent(stateEvt);
};

// We need this wrapper to make async/await nice to write
internals.initSocket = async ({ callback, wsUrl, onNetworkEvent }) => {
    if (internals.RoomClient) {
        await internals.RoomClient.disconnect();
    }

    console.log("INIT SOCKET!");

    if (!wsUrl) {
        throw new Error("wsUrl is required");
    }

    const {
        location: { protocol, host },
    } = window;

    // This will replace 'https' for 'ws' which will also leave 'wss' for 'https' protocols
    const url = protocol.replace("http", "ws") + "//" + host;

    console.log("wsUrl", wsUrl);

    internals.RoomClient = NetworkManager.getClient({ wsUrl });

    console.log("internals.RoomClient", internals.RoomClient);

    try {
        console.log("Attempting connection to", wsUrl);
        await internals.RoomClient.connect();
    } catch (connectErr) {
        // Setup some kinda easy debugging or something
        const connectionMsg =
            document.getElementById("connectionMsg") ||
            document.createElement("h3");

        connectionMsg.id = "connectionMsg";

        connectionMsg.style.color = "#f88070";
        connectionMsg.textContent = `Error ${connectErr.message}`;

        throw new Error(`Connection error: ${connectErr}`);
    }

    const roomEl = document.querySelector(".room");

    const clickTracker = {};

    let roomUsers = {};

    // Coooonnnnnneeeeeeecccccctttttttt!!!!!!!
    const res = await internals.RoomClient.subscribe(
        `/rooms/${TACOS_ROOM_ID}`,
        internals.onRoomUpdate
    );
    internals.networkUnsubscribe = () => internals.RoomClient.disconnect();

    console.log("res", res);

    internals.saveState({
        _shouldConnectToNetwork: true,
        _isConnectedToNetwork: true,
    });

    // Init user
    const user = await internals.updateRoom({
        roomId: TACOS_ROOM_ID,
        userId: internals.roomUserId,
    });

    console.log("init user", user);

    // Init chat room
    internals.updateChatRoomMessages({ roomId: TACOS_ROOM_ID, messages: [] });

    if (callback) {
        callback();
    }
};

// Hot path, throttled server-side
internals.onRoomUpdate = (props) => {
    console.log("ON ROOM UPDATE", props);

    console.log("onRoomUpdate", props);

    return;

    const {
        // id: roomId,
        users = {},
        isSync,
        scoreboard,
        shouldDeleteUsers,
        chat,
    } = props;

    if (DEBUG) {
        console.log("onRoomUpdate", props);
    }

    if (chat) {
        internals.updateChatRoomMessages({
            roomId: TACOS_ROOM_ID,
            messages: chat,
        });
    }

    const ghostTacos = Array.from(
        document.getElementsByClassName("ghost-taco")
    );
    let remainingGhostTacos = ghostTacos;

    // isPartial
    if (shouldDeleteUsers) {
        Object.values(users).forEach((user) => {
            const maybeTaco = document.getElementById(user.id);

            if (maybeTaco) {
                // Remove this taco
                roomEl.removeChild();
            }
        });
        return;
    }

    if (isSync) {
        // Remove inactive tacos
        const userIds = Object.keys(users);

        ghostTacos.forEach((ghostTaco) => {
            if (!userIds.includes(ghostTaco.id)) {
                // Remove this taco
                roomEl.removeChild(ghostTaco);
            } else {
                remainingGhostTacos.push(ghostTaco);
            }
        });

        roomUsers = users;
    }

    if (scoreboard) {
        roomScoreboard = scoreboard;
        const scoreboardEl = document.getElementById("scoreboard");
        scoreboardEl.innerHTML = `<h3>Scoreboard</h3>${scoreboard
            .map(
                ({ userId, score }) =>
                    `<p>${abbreviateUserId(userId)}: ${score}</p>`
            )
            .join("")}`;
        const myScore = roomScoreboard.find(
            ({ userId }) => userId === internals.roomUserId
        )?.score;

        internals.updateScore({
            element: internals.myScoreEl,
            score: myScore,
        });
    }

    const usersNotMe = Object.keys(users)
        .filter((id) => id !== internals.roomUserId)
        .map((id) => users[id]);

    Object.values(usersNotMe).forEach(
        ({ id: userId, lastClick: { epoch, x, y } = {} }) => {
            const userClicked = epoch;
            const lastUserClick = clickTracker[userId];
            let shouldGenParticles = false;

            if (
                (userClicked && !lastUserClick) ||
                (lastUserClick && userClicked > lastUserClick)
            ) {
                shouldGenParticles = true;
            }

            if (shouldGenParticles) {
                genParticles(x, y);
            }

            clickTracker[userId] = epoch;
        }
    );

    const usersYesMe =
        users[Object.keys(users).find((id) => id === internals.roomUserId)];

    const singleUsersNotMe = usersNotMe.length === 1 ? usersNotMe[0] : null;

    if (DEBUG) {
        if (usersYesMe) {
            console.log("usersYesMe", usersYesMe);
        }
        if (singleUsersNotMe || usersNotMe.length) {
            console.log("usersNotMe", singleUsersNotMe || usersNotMe);
        }
    }

    if (usersYesMe) {
        internals.moveCursor({
            element: internals.myTacoEl,
            x: usersYesMe.x,
            y: usersYesMe.y,
        });
    }

    const getIds = (arr) => arr.map(({ id }) => id);

    // Manage ghost tacos
    remainingGhostTacos.forEach((tacoEl) => {
        const tacoUpdate = usersNotMe.find(({ id }) => id === tacoEl.id);

        if (tacoUpdate) {
            internals.moveCursor({
                element: tacoEl,
                x: tacoUpdate.x,
                y: tacoUpdate.y,
            });

            const tacoScore = document.getElementById(`${tacoEl.id}-score`);

            internals.updateScore({
                element: tacoScore,
                score: roomScoreboard.find(({ userId }) => userId === tacoEl.id)
                    ?.score,
            });
        }
    });

    const roomUserIds = Object.keys(roomUsers);
    const newGhostIds = getIds(usersNotMe).filter(
        (id) => !roomUserIds.includes(id)
    );

    usersNotMe.forEach((user) => {
        roomUsers[user.id] = user;
    });

    newGhostIds.forEach((id) => {
        // Add a new ghost taco
        const newTacoEl = document.createElement("div");
        const newTacoCursor = document.createElement("div");
        const newTacoScoreEl = document.createElement("div");

        newTacoScoreEl.id = `${id}-score`;

        internals.updateScore({
            element: newTacoScoreEl,
            score: roomScoreboard[id],
        });

        newTacoEl.id = id;
        newTacoEl.classList.add("ghost-taco");
        newTacoEl.classList.add("taco-cursor");

        newTacoEl.appendChild(newTacoScoreEl);
        newTacoEl.appendChild(newTacoCursor);

        addIdToTacoIfNotExists(newTacoEl, id);

        roomEl.appendChild(newTacoEl);

        const userInfo = usersNotMe.find(({ id }) => id === id);

        internals.moveCursor({
            element: newTacoEl,
            x: userInfo.x,
            y: userInfo.y,
        });

        genParticles(userInfo.x, userInfo.y);
    });
};

// Upsert user in room
internals.updateRoom = async ({ roomId, userId, ...rest }) => {
    const state = getState();

    if (!state._isConnectedToNetwork) {
        console.log("Can't update room, not connected to network.");
        console.trace();
        return;
    }

    const payload = rest;

    if (userId) {
        payload.id = userId;
    }

    console.log("ABOUT to request");
    const {
        payload: { error, user },
    } = await internals.RoomClient.request({
        method: "post",
        path: `/rooms/${roomId}/update`,
        payload,
    });

    if (user) {
        internals.roomUserId = user.id;
        const myTacoElEl = document.getElementById(MY_TACO_ID);
        internals.addIdToTacoIfNotExists(myTacoElEl, internals.roomUserId);
    }

    // Setup some kinda easy debugging or something
    const connectionMsg =
        document.getElementById("connectionMsg") ||
        document.createElement("h3");

    connectionMsg.id = "connectionMsg";

    if (error) {
        // let err = document.createElement(`<h3 style='color: white;'>Error ${error.message}</h3>`);
        connectionMsg.style.color = "#f88070";
        connectionMsg.textContent = `Error ${error.message || error}`;
    } else {
        connectionMsg.style.color = "#73c991";
        connectionMsg.textContent = `Connected x: ${payload.x || "null"} y: ${
            payload.y || "null"
        }`;
    }

    // Add it
    document.body.appendChild(connectionMsg);

    return user;
};

internals.abbreviateUserId = (userId) =>
    `...${(userId || "").split("-").pop()}`;

internals.addIdToTacoIfNotExists = (el, id) => {
    const idEl = el.querySelector(".taco-id");

    if (!idEl) {
        const tacoId = document.createElement("div");
        tacoId.className = "taco-id";
        tacoId.textContent = internals.abbreviateUserId(id);
        tacoId.style.color = "white";
        tacoId.style.fontSize = "16px";
        tacoId.style.position = "absolute";
        tacoId.style.transform = "translateX(-25%)";
        tacoId.style.bottom = "-20px";
        tacoId.style.whiteSpace = "nowrap";
        el.appendChild(tacoId);
    } else {
        idEl.textContent = internals.abbreviateUserId(id);
    }
};

internals.throttledBroadcast = Throttle(() => {
    const update = {
        roomId: TACOS_ROOM_ID,
        userId: internals.roomUserId,
        x: internals.roomX,
        y: internals.roomY,
    };

    if (internals.lastClick) {
        update.lastClick = internals.lastClick;
    }

    internals.updateRoom(update);
}, CURSOR_UPDATE_THROTTLE);

internals.updateChatRoomMessages = ({ roomId, messages }) => {
    let chatRoom = document.getElementById("chat-room");
    let chatRoomMessages;

    if (!chatRoom) {
        const chatRoom = document.createElement("div");
        chatRoom.id = "chat-room";

        const chatRoomHeader = document.createElement("h3");
        chatRoomHeader.id = "chat-room-header";
        chatRoomHeader.innerText = `${roomId} chat — be nice! =P`;

        chatRoomMessages = document.createElement("div");
        chatRoomMessages.id = "chat-room-messages";

        const chatInputContainer = document.createElement("div");

        const input = document.createElement("input");
        input.name = "new-chat";
        input.autocomplete = "new-password";
        input.id = "chat-room-input";

        const submitBtn = document.createElement("button");
        submitBtn.type = "submit";
        submitBtn.id = "chat-room-submit";
        submitBtn.textContent = "SUBMIT";

        const chatRoomForm = document.createElement("form");
        chatRoomForm.autocomplete = "new-password";
        chatRoomForm.id = "chat-room-form";
        chatRoomForm.appendChild(input);
        chatRoomForm.appendChild(submitBtn);

        chatRoomForm.onsubmit = (evt) => {
            evt.preventDefault();

            const chatInputEl = document.getElementById("chat-room-input");

            if (chatInputEl && chatInputEl.value) {
                sendRoomChat({
                    roomId,
                    userId: internals.roomUserId,
                    msg: chatInputEl.value,
                });

                // Clear out the input
                chatInputEl.value = "";
            }
        };

        // Append chatRoomForm
        chatInputContainer.appendChild(chatRoomForm);

        chatRoom.appendChild(chatRoomHeader);
        chatRoom.appendChild(chatRoomMessages);
        chatRoom.appendChild(chatInputContainer);

        document.body.appendChild(chatRoom);
    }

    chatRoomMessages = document.querySelector("#chat-room-messages");

    const oldChatMsgContainers = Array.from(
        document.querySelectorAll(".chat-msg-container")
    );

    // Clear out contents
    chatRoomMessages.innerHTML = "";
    // Rebuild before next repaint

    internals.buildChatMessages({ messages }).forEach((el) => {
        chatRoomMessages.appendChild(el);
    });

    const chatMsgContainers = document.querySelectorAll(".chat-msg-container");

    const lastMsg = Array.from(chatMsgContainers || []).pop();

    if (lastMsg) {
        lastMsg.scrollIntoView();
    }
};

internals.buildChatMessages = ({ messages }) => {
    return messages.map(({ id, userId, epoch, msg }, i) => {
        const msgFrom = document.createElement("div");
        msgFrom.innerText = abbreviateUserId(userId);
        msgFrom.classList.add("chat-msg-from");

        const msgTime = document.createElement("div");
        msgTime.innerText = new Date(epoch).toLocaleTimeString();
        msgTime.classList.add("chat-msg-time");

        const fromTimeContainer = document.createElement("div");
        fromTimeContainer.classList.add("from-time-container");

        fromTimeContainer.appendChild(msgFrom);
        fromTimeContainer.appendChild(msgTime);

        const message = document.createElement("div");
        message.innerText = msg;
        message.classList.add("chat-msg");

        const msgContainer = document.createElement("div");
        msgContainer.id = id;
        msgContainer.classList.add("chat-msg-container");

        if (userId === roomUserId) {
            msgContainer.classList.add("my-msg");
        }

        msgContainer.appendChild(fromTimeContainer);
        msgContainer.appendChild(message);

        return msgContainer;
    });
};
