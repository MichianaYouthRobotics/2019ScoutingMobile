<template>
    <Page class="bg-dark" statusBarStyle="dark">
        <ActionBar title="New Pit Scout" statusBarStyle="dark"/>
        <ScrollView>
            <StackLayout>

                <Label text="Snow Days" class="mt-3 label"/>
                <SegmentedBar class="mx-1" v-model="snowDaysValue">
                    <SegmentedBarItem title="0"/>
                    <SegmentedBarItem title="1"/>
                    <SegmentedBarItem title="2"/>
                    <SegmentedBarItem title="3"/>
                    <SegmentedBarItem title="4"/>
                    <SegmentedBarItem title="5+"/>
                </SegmentedBar>

                <HR/>

                <FlexboxLayout flexDirection="row" justifyContent="space-between" alignItems="center"
                               alignContent="center">
                    <Label text="Starts on Hab 2" class="label"/>
                    <Switch checked="true" v-model="startsOnHabTwoValue"/>
                </FlexboxLayout>

                <HR/>


                <Label text="Cargo in Sandstorm" class="label"/>
                <SegmentedBar class="mx-1" v-model="cargoInSandstormValue">
                    <SegmentedBarItem title="0"/>
                    <SegmentedBarItem title="1"/>
                    <SegmentedBarItem title="2"/>
                    <SegmentedBarItem title="3"/>
                </SegmentedBar>

                <HR/>


                <Label text="Hatches in Sandstorm" class="label"/>
                <SegmentedBar class="mx-1" v-model="hatchesInSandstormValue">
                    <SegmentedBarItem title="0"/>
                    <SegmentedBarItem title="1"/>
                    <SegmentedBarItem title="2"/>
                    <SegmentedBarItem title="3"/>
                </SegmentedBar>

                <HR/>

                <Label text="Cargo in Teleop" class="label"/>
                <SegmentedBar class="mx-1" v-model="cargoInTeleopValue">
                    <SegmentedBarItem title="0"/>
                    <SegmentedBarItem title="1"/>
                    <SegmentedBarItem title="2"/>
                    <SegmentedBarItem title="3"/>
                    <SegmentedBarItem title="4"/>
                    <SegmentedBarItem title="5+"/>
                </SegmentedBar>

                <HR/>

                <Label text="Hatches in Teleop" class="label"/>
                <SegmentedBar class="mx-1" v-model="hatchesInTeleopValue">
                    <SegmentedBarItem title="0"/>
                    <SegmentedBarItem title="1"/>
                    <SegmentedBarItem title="2"/>
                    <SegmentedBarItem title="3"/>
                    <SegmentedBarItem title="4"/>
                    <SegmentedBarItem title="5+"/>
                </SegmentedBar>

                <HR/>

                <Label text="Hab Climb Level" class="label"/>
                <SegmentedBar class="mx-1" v-model="climbLevelValue">
                    <SegmentedBarItem title="0"/>
                    <SegmentedBarItem title="1"/>
                    <SegmentedBarItem title="2"/>
                    <SegmentedBarItem title="3"/>
                </SegmentedBar>

                <HR/>

                <Label text="Max Rocket Level" class="label"/>
                <SegmentedBar class="mx-1" v-model="maxRocketLevelValue">
                    <SegmentedBarItem title="0"/>
                    <SegmentedBarItem title="1"/>
                    <SegmentedBarItem title="2"/>
                    <SegmentedBarItem title="3"/>
                </SegmentedBar>

                <HR/>

                <FlexboxLayout flexDirection="row" justifyContent="space-between" alignItems="center"
                               alignContent="center">
                    <Label text="Can Pickup Ground Cargo?" class="label"/>
                    <Switch checked="true" v-model="pickupGroundCargoValue"/>
                </FlexboxLayout>

                <HR/>

                <FlexboxLayout flexDirection="row" justifyContent="space-between" alignItems="center"
                               alignContent="center">
                    <Label text="Can Pickup Ground Hatch?" class="label"/>
                    <Switch checked="true" v-model="pickupGroundHatchValue"/>
                </FlexboxLayout>

                <HR/>

                <FlexboxLayout flexDirection="row" justifyContent="space-between" alignItems="center"
                               alignContent="center">
                    <Label text="Buddy Climb" class="label"/>
                    <Switch checked="true" v-model="buddyClimbValue"/>
                </FlexboxLayout>

                <HR/>

                <!--<FlexboxLayout flexDirection="row" justifyContent="space-between" alignItems="center"-->
                <!--alignContent="center">-->
                <!--<Label text="Favorite Feature" class="label"/>-->
                <!--<Button :text="fontAwesome.chevronRight" class="fa" />-->
                <!--</FlexboxLayout>-->

                <!--<HR/>-->

                <!--<Label text="Favorite Features" class="label"/>-->
                <!--<TextView text="Notes"/>-->

                <!--<HR/>-->

                <Label text="Rating" class="label"/>
                <SegmentedBar class="mx-1" v-model="ratingValue">
                    <SegmentedBarItem title="1"/>
                    <SegmentedBarItem title="2"/>
                    <SegmentedBarItem title="3"/>
                    <SegmentedBarItem title="4"/>
                    <SegmentedBarItem title="5"/>
                </SegmentedBar>

                <FlexboxLayout class="btn-fun text-center mt-3" flexDirection="row"
                               justifyContent="space-around" @tap="save">
                    <Label text="Save"/>
                </FlexboxLayout>

            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import fontAwesome from '@/util/font-awesome'
    import HR from '@/components/HR'

    export default {
        components: {HR},
        props: ['robotNumber'],
        data() {
            return {
                fontAwesome: fontAwesome,
                snowDaysValue: 0,
                startsOnHabTwoValue: false,
                cargoInSandstormValue: 0,
                hatchesInSandstormValue: 0,
                cargoInTeleopValue: 0,
                hatchesInTeleopValue: 0,
                climbLevelValue: 0,
                maxRocketLevelValue: 0,
                pickupGroundCargoValue: false,
                pickupGroundHatchValue: false,
                buddyClimbValue: false,
                ratingValue: 0,
            }
        },
        computed: {
            robot() {
                return this.$store.getters['scouting/getRobotByNumber'](this.robotNumber);
            }
        },
        methods: {
            save() {
                // alert(JSON.stringify({
                //     snow_days: ,
                //     starts_on_hab_startsOnHabTwoValue: false,
                //     cargoInSandstormValue: false,
                //     hatchesInSandstormValue: false,
                //     cargoInTeleopValue: false,
                //     hatchesInTeleopValue: false,
                //     climbLevelValue: 0,
                //     maxRocketLevelValue: 0,
                //     pickupGroundCargoValue: false,
                //     pickupGroundHatchValue: false,
                //     ratingValue: false,
                // }))

                let payload = {
                    "robot": this.robot,
                    "snow_days": this.snowDaysValue,
                    "starts_on_hab_2": this.startsOnHabTwoValue,
                    "cargo_in_sandstorm": this.cargoInSandstormValue,
                    "hatches_in_sandstorm": this.hatchesInSandstormValue,
                    "cargo_in_teleop": this.cargoInTeleopValue,
                    "hatches_in_teleop": this.hatchesInTeleopValue,
                    "climb_level": this.climbLevelValue,
                    "max_rocket_height": this.maxRocketLevelValue,
                    "ground_pickup_cargo": this.pickupGroundCargoValue,
                    "ground_pickup_hatch": this.pickupGroundHatchValue,
                    "buddy_climb": this.buddyClimbValue,
                    "favorite_feature": "",
                    "notes": "",
                    "rating": this.ratingValue,
                    "do_not_pick": false,
                    "scouter": null,
                    "unique_scout_key": null
                };
                this.$store.dispatch('scouting/addPitScout', payload)

            }
        }
    }
</script>

<style scoped>


</style>
