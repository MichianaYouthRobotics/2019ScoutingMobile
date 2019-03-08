import { request, getFile, getImage, getJSON, getString } from "tns-core-modules/http";
const appSettings = require('tns-core-modules/application-settings');

const namespaced = true;

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


const state = {
    eventName:'',
    eventID: '',
    eventKey: '',
    server: '',
    todayList: [],
    note: '',
    myName: '',
    errorMsg: '',
    scouts: [],
    offline_scouts: [],
    connected: false,
    robots: [],
    matchScouts: [],
    myMatchScouts: [],
    pitScouts: [],
    myPitScouts: [],
    coachScouts: [],
    myCoachScouts: []
};

// getters
const getters = {
    getRobotByNumber: (state) => (number) => {
        return state.robots.find(robot => robot.robot_number === number)
    },
    getPitScoutsByRobotNumber: (state) => (number) => {
        return state.pitScouts.concat(state.myPitScouts).filter(pitScout => pitScout.robot.robot_number === number)
    },
    getMatchScoutsByRobotNumber: (state) => (number) => {
        return state.matchScouts.concat(state.myMatchScouts).filter(matchScout => matchScout.robot.robot_number === number)
    },
    getCoachScoutsByRobotNumber: (state) => (number) => {
        return state.coachScouts.concat(state.myCoachScouts).filter(coachScout => coachScout.robot.robot_number === number)
    },
    todayListCount: (state) => {
        return state.todayList.length;
    },


};

// actions
const actions = {
    initializeState: (context) => {
        context.commit("INITIALIZE_STATE");
    },
    connect: (context, payload) => {
        let url = `https://${payload.server}/scout/event/${payload.id}/`;
        console.log('CONNECTING TO: ' + url);
        request({
                url: url,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    key: payload.key,
                })
            })
            .then(response => {
                let data = JSON.parse(response.content);
                if (data.error) {
                    context.commit("SET_CONNECTION_ERROR_MESSAGE", data.error.toString());
                } else {
                    let details = {
                        server: payload.server,
                        eventID: payload.id,
                        eventKey: payload.key,
                        eventName: data.name,
                        myName: payload.myName,
                    };
                    context.commit("SET_EVENT_DETAILS", details);
                }
            }).catch(e => {
                context.commit("SET_CONNECTION_ERROR_MESSAGE", e.toString());
        });
    },
    reset: (context, payload) => {
        context.commit("RESET_APP");
    },

    sync: (context, payload) => {
        actions.getRobots(context);
        actions.getMatchScouts(context);
        actions.getPitScouts(context);
        actions.getCoachScouts(context);
    },
    addNote: (context, payload) => {
        let newNote = {
            title: payload.title,
            text: payload.text
        };
        return request('note/list/', newNote)
            .then(r => r.data)
            .then(response => {
                context.commit("ADD_NOTE", response);
            })
    },
    addPitScout: (context, payload) => {
        payload.unique_scout_key = uuidv4();
        payload.scouter = state.myName;
        payload.eventKey = state.eventKey;
        context.commit("ADD_PIT_SCOUT", payload);
    },
    addCoachScout: (context, payload) => {
        payload.unique_scout_key = uuidv4();
        payload.scouter = state.myName;
        payload.eventKey = state.eventKey;
        context.commit("ADD_COACH_SCOUT", payload);
    },
    addMatchScout: (context, payload) => {
        payload.unique_scout_key = uuidv4();
        payload.scouter = state.myName;
        payload.eventKey = state.eventKey;
        context.commit("ADD_MATCH_SCOUT", payload);
    },
    getRobots: (context, payload) => {
        let url = `https://${state.server}/scout/all-robots/${state.eventID}/`;
        console.log('GETTING ROBOTS FROM: ' + url);
        request({
            url: url,
            method:'GET',
            headers: { "Content-Type": "application/json" },})
            .then(response => {
                console.log('GOT ROBOTS FROM:' + url);
                let data = JSON.parse(response.content);
                context.commit("SET_ROBOTS", data);
            })
    },
    getMatches: (context, payload) => {
        let url = `https://${state.server}/scout/match/list/`;
        request({
            url: url,
            method:'GET',
            headers: { "Content-Type": "application/json" },})
            .then(response => {
                let data = JSON.parse(response.content);
                context.commit("SET_MATCHES", data);
            })
    },
    getPitScouts: (context, payload) => {
        let url = `https://${state.server}/scout/pit/list/${state.eventID}/`;
        request({
            url: url,
            method:'GET',
            headers: { "Content-Type": "application/json" },})
            .then(response => {
                let data = JSON.parse(response.content);
                context.commit("SET_PIT_SCOUTS", data);
            })
    },
    getCoachScouts: (context, payload) => {
        let url = `https://${state.server}/scout/coach/list/${state.eventID}/`;
        request({
            url: url,
            method:'GET',
            headers: { "Content-Type": "application/json" },})
            .then(response => {
                let data = JSON.parse(response.content);
                context.commit("SET_COACH_SCOUTS", data);
            })
    },
    getMatchScouts: (context, payload) => {
        let url = `https://${state.server}/scout/match/list/${state.eventID}/`;
        request({
            url: url,
            method:'GET',
            headers: { "Content-Type": "application/json" },})
            .then(response => {
                let data = JSON.parse(response.content);
                context.commit("SET_MATCH_SCOUTS", data);
            })
    },
};

// mutations
const mutations = {
    RESET_APP(state) {
        console.log('STARTING RESET');

        state.server = '';
        appSettings.setString("server", '');
        console.log('RESET SERVER');

        state.eventID = '';
        appSettings.setString("eventID", '');
        console.log('RESET EVENTID');

        state.eventKey = '';
        appSettings.setString("eventKey", '');
        console.log('RESET EVENTKEY');

        state.eventName = '';
        appSettings.setString("eventName", '');
        console.log('RESET EVENTNAME');

        state.myName = '';
        appSettings.setString("myName", '');
        console.log('RESET MYNAME');

        state.connected = false;
        appSettings.setBoolean("connected", false);
        console.log('RESET CONNECTED');

        state.robots = [];
        appSettings.setString("robots", JSON.stringify([]));
        console.log('RESET ROBOTS');

        state.matchScouts = [];
        appSettings.setString("matchScouts", JSON.stringify([]));
        console.log('RESET MATCH SCOUTS');

        state.pitScouts = [];
        appSettings.setString("pitScouts", JSON.stringify([]));
        console.log('RESET PIT SCOUTS');

        state.coachScouts = [];
        appSettings.setString("coachScouts", JSON.stringify([]));
        console.log('RESET COACH SCOUTS');

    },
    SET_MY_NAME(state, myName) {
        state.myName = myName
    },
    INITIALIZE_STATE(state) {
        console.log('STARTING STATE INITIALIZE');
        state.server = appSettings.getString("server");
        state.eventID = appSettings.getString("eventID");
        state.eventKey = appSettings.getString("eventKey");
        state.eventName = appSettings.getString("eventName");
        console.log('getting my name');
        state.myName = appSettings.getString("myName");
        console.log('got my name');
        console.log(state.myName);
        state.connected = appSettings.getBoolean("connected", false);

        if (appSettings.getString("robots")) {
            state.robots = JSON.parse(appSettings.getString("robots"))
        }

        if (appSettings.getString("matchScouts")) {
            state.matchScouts = JSON.parse(appSettings.getString("matchScouts"))
        }

        if (appSettings.getString("pitScouts")) {
            state.pitScouts = JSON.parse(appSettings.getString("pitScouts"))
        }

        if (appSettings.getString("coachScouts")) {
            state.coachScouts = JSON.parse(appSettings.getString("coachScouts"))
        }

        if (appSettings.getString("myPitScouts")) {
            state.myPitScouts = JSON.parse(appSettings.getString("myPitScouts"))
        }

        if (appSettings.getString("myMatchScouts")) {
            state.myMatchScouts = JSON.parse(appSettings.getString("myMatchScouts"))
        }

        if (appSettings.getString("myCoachScouts")) {
            state.myCoachScouts = JSON.parse(appSettings.getString("myCoachScouts"))
        }

    },
    SET_EVENT_DETAILS(state, details) {

        state.server = details.server;
        appSettings.setString("server", state.server);

        state.eventID = details.eventID;
        appSettings.setString("eventID", state.eventID);

        state.eventKey = details.eventKey;
        appSettings.setString("eventKey", state.eventKey);

        state.eventName = details.eventName;
        appSettings.setString("eventName", state.eventName);


        state.myName = details.myName;
        appSettings.setString("myName", state.myName);

        state.connected = true;
        appSettings.setBoolean("connected", true);

    },
    SET_CONNECTION_ERROR_MESSAGE(state, errorMsg) {
        // alert(errorMsg);
        state.connected = false;
        appSettings.setBoolean("connected", false);
        state.errorMsg = errorMsg;

    },
    SET_ROBOTS(state, robots) {
        console.log('setting robots');
        appSettings.setString("robots", JSON.stringify(robots));
        state.robots = robots;
        console.log('set robots');
    },
    SET_MATCH_SCOUTS(state, scouts) {
        appSettings.setString("matchScouts", JSON.stringify(scouts));
        state.matchScouts = scouts
    },
    ADD_MATCH_SCOUT(state, scout) {
        state.myMatchScouts.unshift(scout);
        appSettings.setString("myMatchScouts", JSON.stringify(state.myMatchScouts));

    },
    SET_PIT_SCOUTS(state, scouts) {
        appSettings.setString("pitScouts", JSON.stringify(scouts));
        state.pitScouts = scouts
    },
    ADD_PIT_SCOUT(state, scout) {
        state.myPitScouts.unshift(scout);
        appSettings.setString("myPitScouts", JSON.stringify(state.myPitScouts));

    },
    SET_COACH_SCOUTS(state, scouts) {
        appSettings.setString("coachScouts", JSON.stringify(scouts));
        state.coachScouts = scouts
    },
    ADD_COACH_SCOUT(state, scout) {
        state.myCoachScouts.unshift(scout);
        appSettings.setString("myCoachScouts", JSON.stringify(state.myCoachScouts));

    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
