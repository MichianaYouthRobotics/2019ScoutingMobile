<template>
    <Page class="bg-dark" statusBarStyle="dark">
        <ActionBar title="In Match" statusBarStyle="dark"/>
        <ScrollView>
            <StackLayout>
                <FlexboxLayout flexDirection="row" backgroundColor="#3c495e" justifyContent="space-between">
                    <StackLayout>
                        <Label :text="matchTime" class="giant text-light"></Label>
                        <Label :text="prettyTime" class="h2 text-info"></Label>
                        <Label v-if="(150 - matchTime) <= 15" text="SANDSTORM" class="h5 text-monospace"/>
                        <Label v-else text="TELEOP" class="h5 text-monospace"/>
                    </StackLayout>
                    <FlexboxLayout flexDirection="column">
                        <Label :text="initialPayload.robot.robot_number" class="text-right h1 text-light"/>
                        <Label :text="initialPayload.robot.team_name" class="text-right h3 text-danger"/>
                        <Label v-if="initialPayload.alliance === 'b'" text="blue alliance" class="blue-alliance"/>
                        <Label v-else text="red alliance" class="red-alliance"/>
                    </FlexboxLayout>
                </FlexboxLayout>


                <ScrollView orientation="horizontal" class="my-2">
                    <StackLayout orientation="horizontal">
                        <Button :text="fontAwesome.undo + ' undo'" class="fa ml-1" @tap="undoAction"/>
                        <WrapLayout :borderColor="action.color" :color="action.color" v-for="action in actions"
                                    class="action-ticker">
                            <Label :text="action.icon" class="fa"/>
                            <Label :text="action.time" class="monospace"/>
                        </WrapLayout>
                    </StackLayout>
                </ScrollView>


                <FlexboxLayout class="hatch-outline" :class="{filled: hasHatch}" @tap="gotHatch"
                               justifyContent="center">
                    <Label :text="fontAwesome.soccer + fontAwesome.arrowUp" class="fa"/>
                    <Label text="Picked up hatch"/>
                </FlexboxLayout>


                <FlexboxLayout flexDirection="column" :class="{inactive: !hasHatch}">
                    <FlexboxLayout justifyContent="space-around">
                        <WrapLayout class="hatch-action" @tap="hatchDropped">
                            <Label :text="fontAwesome.arrowDown" class="fa"/>
                            <Label text="dropped"/>
                        </WrapLayout>
                        <WrapLayout class="hatch-action" @tap="hatchCargoShip">
                            <Label :text="fontAwesome.truck" class="fa"/>
                            <Label text="Secured to Ship"/>
                        </WrapLayout>
                    </FlexboxLayout>
                    <FlexboxLayout justifyContent="space-around">
                        <WrapLayout class="hatch-action" @tap="hatchRocketLevelOne">
                            <Label :text="fontAwesome.rocket" class="fa"/>
                            <Label text="Rocket Lvl 1"/>
                        </WrapLayout>

                        <WrapLayout class="hatch-action" @tap="hatchRocketLevelTwo">
                            <Label :text="fontAwesome.rocket" class="fa"/>
                            <Label text="Lvl 2"/>
                        </WrapLayout>

                        <WrapLayout class="hatch-action" @tap="hatchRocketLevelThree">
                            <Label :text="fontAwesome.rocket" class="fa"/>
                            <Label text="Lvl 3"/>
                        </WrapLayout>
                    </FlexboxLayout>
                </FlexboxLayout>


                <FlexboxLayout class="cargo-outline mt-5" :class="{filled: hasCargo}" @tap="gotCargo"
                               justifyContent="center">
                    <Label :text="fontAwesome.circle + fontAwesome.arrowUp" class="fa"/>
                    <Label text="Picked up Cargo"/>
                </FlexboxLayout>


                <FlexboxLayout flexDirection="column" :class="{inactive: !hasCargo}">
                    <FlexboxLayout justifyContent="space-around">
                        <WrapLayout class="cargo-action" @tap="cargoDropped">
                            <Label :text="fontAwesome.arrowDown" class="fa"/>
                            <Label text="dropped"/>
                        </WrapLayout>
                        <WrapLayout class="cargo-action" @tap="cargoCargoShip">
                            <Label :text="fontAwesome.truck" class="fa"/>
                            <Label text="Secured to Ship"/>
                        </WrapLayout>
                    </FlexboxLayout>
                    <FlexboxLayout justifyContent="space-around">
                        <WrapLayout class="cargo-action" @tap="cargoRocketLevelOne">
                            <Label :text="fontAwesome.rocket" class="fa"/>
                            <Label text="Rocket Lvl 1"/>
                        </WrapLayout>

                        <WrapLayout class="cargo-action" @tap="cargoRocketLevelTwo">
                            <Label :text="fontAwesome.rocket" class="fa"/>
                            <Label text="Lvl 2"/>
                        </WrapLayout>

                        <WrapLayout class="cargo-action" @tap="cargoRocketLevelThree">
                            <Label :text="fontAwesome.rocket" class="fa"/>
                            <Label text="Lvl 3"/>
                        </WrapLayout>
                    </FlexboxLayout>
                </FlexboxLayout>

            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import fontAwesome from '@/util/font-awesome'
    import HR from '@/components/HR'
    import EndMatch from '@/views/scouting/match/EndMatch.vue'

    const timerModule = require("tns-core-modules/timer");


    export default {
        components: {HR},
        props: ['initialPayload'],
        data() {
            return {
                fontAwesome: fontAwesome,
                synergyLevels: [...Array(10).keys()],
                matchNumbers: [...Array(100).keys()],
                hasHatch: false,
                hasCargo: false,
                totalCargo: 0,
                totalHatch: 0,
                matchTime: 150,
                actions: []
            }
        },
        computed: {
            prettyTime() {
                // this.actions.unshift({title: 'H3', color: 'Green', icon: fontAwesome.truck});
                var date = new Date(null);
                date.setSeconds(this.matchTime); // specify value for SECONDS here
                return date.toISOString().substr(14, 5);
            }
        },
        methods: {
            gotHatch() {
                if (!this.hasHatch) {
                    this.hasHatch = true;
                    this.actions.unshift({
                        time: 150 - this.matchTime,
                        color: '#fcc944',
                        icon: fontAwesome.soccer + fontAwesome.arrowUp,
                        hatch: true,
                        cargo: false,
                        hatch_increase: 0,
                        cargo_increase: 0,
                        level: -2
                    });
                }
            },
            hatchDropped() {
                if (this.hasHatch) {
                    this.hasHatch = false;
                    this.actions.unshift({
                        time: 150 - this.matchTime,
                        color: '#d1484f',
                        icon: fontAwesome.soccer + fontAwesome.arrowDown,
                        hatch: true,
                        cargo: false,
                        hatch_increase: 0,
                        cargo_increase: 0,
                        level: -1
                    });
                }
            },
            hatchCargoShip() {
                if (this.hasHatch) {
                    this.hasHatch = false;
                    this.totalHatch += 1;
                    this.actions.unshift({
                        time: 150 - this.matchTime,
                        color: '#4db753',
                        icon: fontAwesome.soccer + fontAwesome.truck,
                        hatch: true,
                        cargo: false,
                        hatch_increase: 1,
                        cargo_increase: 0,
                        level: 0
                    });
                }
            },
            hatchRocketLevelOne() {
                if (this.hasHatch) {
                    this.hasHatch = false;
                    this.totalHatch += 1;
                    this.actions.unshift({
                        time: 150 - this.matchTime,
                        color: '#4db753',
                        icon: fontAwesome.soccer + fontAwesome.rocket,
                        hatch: true,
                        cargo: false,
                        hatch_increase: 1,
                        cargo_increase: 0,
                        level: 1
                    });
                }
            },
            hatchRocketLevelTwo() {
                if (this.hasHatch) {
                    this.hasHatch = false;
                    this.totalHatch += 1;
                    this.actions.unshift({
                        time: 150 - this.matchTime,
                        color: '#4db753',
                        icon: fontAwesome.soccer + fontAwesome.rocket + fontAwesome.rocket,
                        hatch: true,
                        cargo: false,
                        hatch_increase: 1,
                        cargo_increase: 0,
                        level: 2

                    });
                }
            },
            hatchRocketLevelThree() {
                if (this.hasHatch) {
                    this.hasHatch = false;
                    this.totalHatch += 1;
                    this.actions.unshift({
                        time: 150 - this.matchTime,
                        color: '#4db753',
                        icon: fontAwesome.soccer + fontAwesome.rocket + fontAwesome.rocket + fontAwesome.rocket,
                        hatch: true,
                        cargo: false,
                        hatch_increase: 1,
                        cargo_increase: 0,
                        level: 3
                    });
                }
            },
            gotCargo() {
                if (!this.hasCargo) {
                    this.hasCargo = true;
                    this.actions.unshift({
                        time: 150 - this.matchTime,
                        color: '#ff8c3f',
                        icon: fontAwesome.circle + fontAwesome.arrowUp,
                        hatch: false,
                        cargo: true,
                        hatch_increase: 0,
                        cargo_increase: 0,
                        level: -2
                    });
                }
            },
            cargoDropped() {
                if (this.hasCargo) {
                    this.hasCargo = false;
                    this.actions.unshift({
                        time: 150 - this.matchTime,
                        color: '#d1484f',
                        icon: fontAwesome.circle + fontAwesome.arrowDown,
                        hatch: false,
                        cargo: true,
                        hatch_increase: 0,
                        cargo_increase: 0,
                        level: -1
                    });
                }
            },
            cargoCargoShip() {
                if (this.hasCargo) {
                    this.hasCargo = false;
                    this.totalCargo += 1;
                    this.actions.unshift({
                        time: 150 - this.matchTime,
                        color: '#4db753',
                        icon: fontAwesome.circle + fontAwesome.truck,
                        hatch: false,
                        cargo: true,
                        hatch_increase: 0,
                        cargo_increase: 1,
                        level: 0
                    });
                }
            },
            cargoRocketLevelOne() {
                if (this.hasCargo) {
                    this.hasCargo = false;
                    this.totalCargo += 1;
                    this.actions.unshift({
                        time: 150 - this.matchTime,
                        color: '#4db753',
                        icon: fontAwesome.circle + fontAwesome.rocket,
                        hatch: false,
                        cargo: true,
                        hatch_increase: 0,
                        cargo_increase: 1,
                        level: 1
                    });
                }
            },
            cargoRocketLevelTwo() {
                if (this.hasCargo) {
                    this.hasCargo = false;
                    this.totalCargo += 1;
                    this.actions.unshift({
                        time: 150 - this.matchTime,
                        color: '#4db753',
                        icon: fontAwesome.circle + fontAwesome.rocket + fontAwesome.rocket,
                        hatch: false,
                        cargo: true,
                        hatch_increase: 0,
                        cargo_increase: 1,
                        level: 2
                    });
                }
            },
            cargoRocketLevelThree() {
                if (this.hasCargo) {
                    this.hasCargo = false;
                    this.totalCargo += 1;
                    this.actions.unshift({
                        time: 150 - this.matchTime,
                        color: '#4db753',
                        icon: fontAwesome.circle + fontAwesome.rocket + fontAwesome.rocket + fontAwesome.rocket,
                        hatch: false,
                        cargo: true,
                        hatch_increase: 0,
                        cargo_increase: 1,
                        level: 3
                    });
                }
            },
            undoAction() {
                let action = this.actions.shift();
                if (action) {
                    if (action.hatch) {
                        this.hasHatch = !this.hasHatch;
                        if (action.level >= 0) {
                            this.totalHatch -= 1;
                        }
                    } else {
                        this.hasCargo = !this.hasCargo;
                        if (action.level >= 0) {
                            this.totalCargo -= 1;
                        }
                    }
                }
            }
        },
        watch: {
            matchTime: function (newVal, oldval) {
                    if (newVal === 0) {

                        let payload = this.initialPayload;
                        payload.hatch_count = this.totalHatch;
                        payload.cargo_count = this.totalCargo;
                        payload.actions = this.actions;
                        this.$navigateTo(EndMatch, { clearHistory: true , props: {initialPayload: payload}});
                    }
                }
        },
        mounted() {
            timerModule.setInterval(() => {
                this.matchTime = this.matchTime - 1;
            }, 1000);
        }
    }
</script>

<style scoped>

    .action-ticker {
        border-radius: 5;
        border-width: 1;
        padding: 2;
        margin-right: 2;
        margin-left: 2;
    }

    .hatch-outline {
        border-color: #fcc944;
        width: 250;
        border-radius: 25;
        border-width: 3;
        color: #fcc944;
        padding: 12;
        font-weight: 900;
        text-align: center;
    }

    .hatch-outline.filled {
        color: black;
        background-color: #fcc944;
    }

    .hatch-action {
        border-radius: 25;
        color: black;
        background-color: #fcc944;
        padding: 6;
        margin: 5;
        font-weight: 900;
    }

    .cargo-outline {
        border-color: #ff8c3f;
        width: 250;
        border-radius: 25;
        border-width: 3;
        color: #fcc944;
        padding: 12;
        font-weight: 900;
        text-align: center;
    }

    .cargo-outline.filled {
        color: black;
        background-color: #ff8c3f;
    }

    .cargo-action {
        border-radius: 25;
        color: black;
        background-color: #ff8c3f;
        padding: 6;
        margin: 5;
        font-weight: 900;
    }

    .inactive {
        opacity: .1;
    }

</style>
