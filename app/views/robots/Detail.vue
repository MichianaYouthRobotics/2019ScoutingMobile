<template>
    <Page class="bg-dark" statusBarStyle="dark">
        <ActionBar :title="robot.team_name">
            <ActionItem @tap="newScout"
                        ios.systemIcon="4" ios.position="right"
                        text="add" android.position="popup" />
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




                <Label :text="JSON.stringify(robot)" textWrap="true"/>

                <Label text="Match Scouts" class="text-light h3"></Label>
                <Label :text="JSON.stringify(matchScouts)" textWrap="true" />


                <Label text="Pit Scout" class="text-light h2"></Label>
                <Label :text="JSON.stringify(pitScouts)" textWrap="true" />
                <WrapLayout class="text-light">
                    <Label :text="fontAwesome.snowflake" class="fa"></Label>
                    <Label :text="pitScouts.snow_days + ' Snow Days'"></Label>
                </WrapLayout>

                <WrapLayout class="text-light">
                    <Label v-if="pitScouts.starts_on_hab_2" :text="checkSquareO" class="fa"></Label>
                    <Label v-else :text="checkSquareO" class="fa"></Label>

                    <Label v-if="pitScouts.starts_on_hab_2" text="Starts on Hab 2"></Label>
                    <Label v-else text="DOES NOT Start on Hab 2"></Label>
                </WrapLayout>

                <WrapLayout class="text-light">
                    <Label v-if="pitScouts.ground_pick_cargo" :text="checkSquareO" class="fa"></Label>
                    <Label v-else :text="checkSquareO" class="fa"></Label>

                    <Label v-if="pitScouts.ground_pick_cargo" text="CAN Pickup Cargo From Ground"></Label>
                    <Label v-else text="CANNOT Pickup Cargo From Ground"></Label>
                </WrapLayout>

                <WrapLayout class="text-light">
                    <Label :text="fontAwesome.snowflake" class="fa"></Label>
                    <Label :text="' ' + pitScouts.snow_days + ' Snow Days'"></Label>
                </WrapLayout>



                <Label text="Coach Scouts" class="text-light h3"></Label>
                <Label :text="JSON.stringify(coachScouts)" textWrap="true" />

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
                            this.$navigateTo(NewMatchScout);
                        } else if (result === "Pit") {
                            this.$navigateTo(NewPitScout);
                        } else {
                            this.$navigateTo(NewCoachingScout);
                        }
                    });
            },
        }
    }
</script>

<style scoped>
</style>
