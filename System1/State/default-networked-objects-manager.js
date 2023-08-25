const MY_TACO_ID = "my-taco";
const MY_SCORE_ID = "my-score";

const internals = {};

export const initDefaultNetworkedObjects = () => {
    internals.myTacoEl = document.getElementById(MY_TACO_ID);
    internals.myScoreEl = document.getElementById(MY_SCORE_ID);
};
