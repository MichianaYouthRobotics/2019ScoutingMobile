<template>
    <Page class="bg-dark" statusBarStyle="dark">
        <ActionBar :title="robot.team_name">
            <ActionItem @tap="newScout"
                        ios.systemIcon="4" ios.position="right"
                        text="add" android.position="popup"/>
        </ActionBar>
        <ScrollView orientation="vertical">
            <StackLayout orientation="vertical">


                <FlexboxLayout flexDirection="row" justifyContent="space-between">
                    <StackLayout>
                        <Label :text="robot.robot_number" class="text-light h1"></Label>
                        <Label :text="robot.location" class="text-info h3"></Label>
                    </StackLayout>
                    <FlexboxLayout flexDirection="column">
                        <Label :text="fontAwesome.heart" class="fa text-right h1 text-danger"/>
                    </FlexboxLayout>
                </FlexboxLayout>

                <StackLayout v-for="pitScout in pitScouts">
                    <WrapLayout class="text-light">
                        <Label text="Pit Scout" class="text-primary h2"></Label>
                        <Label :text="'   by ' + pitScout.scouter" class="text-small"></Label>
                    </WrapLayout>

                    <WrapLayout class="text-light">
                        <Label :text="pitScout.cargo_in_sandstorm" class="text-monospace data-value"></Label>
                        <Label text="Cargo in Sandstorm"></Label>
                    </WrapLayout>

                    <WrapLayout class="text-light">
                        <Label :text="pitScout.hatches_in_sandstorm" class="text-monospace data-value"></Label>
                        <Label text="Hatches in Sandstorm"></Label>
                    </WrapLayout>

                    <WrapLayout class="text-light">
                        <Label :text="pitScout.cargo_in_teleop" class="text-monospace data-value"></Label>
                        <Label text="Cargo in Teleop"></Label>
                    </WrapLayout>

                    <WrapLayout class="text-light">
                        <Label :text="pitScout.hatches_in_teleop" class="text-monospace data-value"></Label>
                        <Label text="Hatches in Teleop"></Label>
                    </WrapLayout>

                    <WrapLayout class="text-light">
                        <Label :text="pitScout.climb_level" class="text-monospace data-value"></Label>
                        <Label text="Hab Climb Level"></Label>
                    </WrapLayout>

                    <WrapLayout class="text-light">
                        <Label :text="pitScout.max_rocket_height" class="text-monospace data-value"></Label>
                        <Label text="Max Rocket Level"></Label>
                    </WrapLayout>

                    <WrapLayout class="text-light">
                        <Label v-if="pitScout.starts_on_hab_2" :text="fontAwesome.checkSquareO" class="fa data-value"></Label>
                        <Label v-else :text="fontAwesome.squareO" class="fa data-value text-danger"></Label>

                        <Label v-if="pitScout.starts_on_hab_2" text="Starts on Hab 2"></Label>
                        <Label v-else text="DOES NOT Start on Hab 2"></Label>
                    </WrapLayout>

                    <WrapLayout class="text-light">
                        <Label v-if="pitScout.ground_pick_cargo" :text="fontAwesome.checkSquareO" class="fa data-value"></Label>
                        <Label v-else :text="fontAwesome.squareO" class="fa data-value text-danger"></Label>

                        <Label v-if="pitScout.ground_pick_cargo" text="CAN Pickup Cargo From Ground"></Label>
                        <Label v-else text="CANNOT Pickup Cargo From Ground"></Label>
                    </WrapLayout>

                    <WrapLayout class="text-light">
                        <Label :text="fontAwesome.snowflake" class="fa data-value text-white"></Label>
                        <Label :text="pitScout.snow_days + ' Snow Days'"></Label>
                    </WrapLayout>

                    <WrapLayout class="text-light">
                        <Label :text="pitScout.rating" class="text-monospace data-value"></Label>
                        <Label :text="pitScout.scouter + '\'s Rating'"></Label>
                    </WrapLayout>

                </StackLayout>



                <WrapLayout class="text-light">
                    <Label text="Match Scouts" class="text-primary h2"></Label>
                    <Label :text="'   (' + matchScouts.length + ')'" class="text-small"></Label>
                </WrapLayout>

                <StackLayout v-if="matchScouts.length">
                    <StackLayout v-for="matchScout in matchScouts" class="tiny-card">
                        <FlexboxLayout>
                            <WrapLayout class="text-light">
                                <Label text="Match # "></Label>
                                <Label :text="matchScout.match_number" class="text-monospace extended-data-value"></Label>
                            </WrapLayout>
                            <WrapLayout class="text-light">
                                <Label v-if="matchScout.alliance == 'b'" text="blue alliance" class="blue-alliance"/>
                                <Label v-else text="red alliance" class="red-alliance"/>
                            </WrapLayout>
                        </FlexboxLayout>
                        <label :text="'Scouted By ' + matchScout.scouter" class="p text-info"/>

                        <WrapLayout class="text-light">
                            <Label :text="matchScout.speed" class="text-monospace data-value"></Label>
                            <Label text="Speed Rating"></Label>
                        </WrapLayout>

                        <WrapLayout class="text-light">
                            <Label :text="matchScout.strategy" class="text-monospace data-value"></Label>
                            <Label text="Strategy Rating"></Label>
                        </WrapLayout>

                        <WrapLayout class="text-light">
                            <Label :text="matchScout.team_work" class="text-monospace data-value"></Label>
                            <Label text="Team Work Rating"></Label>
                        </WrapLayout>

                        <WrapLayout class="text-light">
                            <Label :text="matchScout.start_position" class="text-monospace data-value"></Label>
                            <Label text="Starting Hab Position"></Label>
                        </WrapLayout>

                        <WrapLayout class="text-light">
                            <Label :text="matchScout.hatch_count" class="text-monospace data-value"></Label>
                            <Label text="Hatch Count"></Label>
                        </WrapLayout>

                        <WrapLayout class="text-light">
                            <Label :text="matchScout.cargo_count" class="text-monospace data-value"></Label>
                            <Label text="Cargo Count"></Label>
                        </WrapLayout>

                        <WrapLayout class="text-light">
                            <Label :text="matchScout.hab_level" class="text-monospace data-value"></Label>
                            <Label text="Ending Hab Position"></Label>
                        </WrapLayout>

                    </StackLayout>
                </StackLayout>


                <WrapLayout class="text-light">
                    <Label text="Coach Scouts" class="text-primary h2"></Label>
                    <Label :text="'   (' + coachScouts.length + ')'" class="text-small"></Label>
                </WrapLayout>

                <StackLayout v-if="coachScouts.length">
                    <StackLayout v-for="coachScout in coachScouts" class="tiny-card">
                        <FlexboxLayout>
                            <WrapLayout class="text-light">
                                <Label text="Match # "></Label>
                                <Label :text="coachScout.match_number" class="text-monospace extended-data-value"></Label>
                            </WrapLayout>
                            <WrapLayout class="text-light">
                                <Label text="Synergy With Team "></Label>
                                <Label :text="coachScout.synergy" class="text-monospace data-value"></Label>
                            </WrapLayout>
                        </FlexboxLayout>
                        <label :text="'Scouted By ' + coachScout.scouter" class="p text-info"/>
                    </StackLayout>
                </StackLayout>

            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import fontAwesome from '@/util/font-awesome'
    import ItemList from '@/components/ItemList'
    import NewCoachingScout from '@/views/scouting/coaching/New'
    import NewMatchScout from '@/views/scouting/match/New'
    import NewPitScout from '@/views/scouting/pit/New'

    export default {
        props: ['robotNumber'],
        data() {
            return {
                fontAwesome: fontAwesome,
                items: [
                    {name: 'matt', description: 'local 01'},
                    {name: 'was', description: 'local 02'},
                    {name: 'here', description: 'local 03'},
                    {name: 'yep', description: 'local 04'},
                    {name: 'matt', description: 'local 05'},
                ],
            }
        },
        components: {ItemList},
        computed: {
            robot() {
                return this.$store.getters['scouting/getRobotByNumber'](this.robotNumber);
            },
            pitScouts() {
                return this.$store.getters['scouting/getPitScoutsByRobotNumber'](this.robotNumber);
            },
            matchScouts() {
                return this.$store.getters['scouting/getMatchScoutsByRobotNumber'](this.robotNumber);
            },
            coachScouts() {
                return this.$store.getters['scouting/getCoachScoutsByRobotNumber'](this.robotNumber);
            }
        }
        ,
        methods: {
            newScout() {
                action("What type of scouting are you doing?", "cancel", ["Match", "Pit", "Coaching"])
                    .then(result => {
                        if (result === "Match") {
                            this.$navigateTo(NewMatchScout, { props: { robotNumber: this.robotNumber }});
                        } else if (result === "Pit") {
                            this.$navigateTo(NewPitScout, { props: { robotNumber: this.robotNumber }});
                        } else {
                            this.$navigateTo(NewCoachingScout, { props: { robotNumber: this.robotNumber }});
                        }
                    });
            },
        }
    }
</script>

<style>
    .data-value {
        font-size: 22;
        font-weight: bold;
        color: #497dff;
        margin-right: 5;
        margin-left: 5;
        margin-top: 3;
        margin-bottom: 3;
        width: 28;
    }

    .extended-data-value {
        font-size: 22;
        font-weight: bold;
        color: #497dff;
        margin-right: 10;
        margin-left: 5;
        margin-top: 3;
        margin-bottom: 3;
    }

    .scout-card {

    }

</style>
