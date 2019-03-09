<template>
    <Page class="bg-dark" statusBarStyle="dark">
        <ActionBar title="New Match Scout" statusBarStyle="dark"/>
        <ScrollView>


            <StackLayout>
                <Label :text="robot.robot_number" class="h2 text-light text-monospace"/>
                <Label :text="robot.team_name" class="h3 text-info"/>
                <Label text="Type Match Number" class="mt-3 label"/>
                <TextField text="0" hint="Match Number" keyboardType="number" class="input" v-model="matchNumberValue"/>

                <HR/>

                <Label text="Alliance" class="mt-3 label"/>
                <SegmentedBar v-model="allianceValue">
                    <SegmentedBarItem title="Blue Alliance" />
                    <SegmentedBarItem title="Red Alliance" />
                </SegmentedBar>

                <HR/>

                <Label text="Starting Hab Level" class="mt-3 label"/>
                <SegmentedBar v-model="startPositionValue">
                    <SegmentedBarItem title="Lvl 1" />
                    <SegmentedBarItem title="Lvl 2" />
                </SegmentedBar>


                <Label text="Tap GO! when the match starts" class="h5 mt-3 text-danger text-center"></Label>
                <FlexboxLayout class="btn-fun text-center" flexDirection="row"
                               justifyContent="space-around" @tap="go">
                    <Label text="GO!"/>
                </FlexboxLayout>

            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import fontAwesome from '@/util/font-awesome'
    import HR from '@/components/HR'
    import App from '@/views/App'


    import InMatch from '@/views/scouting/match/InMatch'

    export default {
        components: {HR},
        props: ['robotNumber'],

        data() {
            return {
                fontAwesome: fontAwesome,
                startPositionValue: 0,
                allianceValue: 0,
                matchNumberValue: '',
            }
        },
        computed: {
            robot() {
                return this.$store.getters['scouting/getRobotByNumber'](this.robotNumber);
            }
        },
        methods: {
            go () {
                let payload = {
                    robot: this.robot,
                    alliance: this.allianceValue === 0 ? "b" : "r",
                    match_number: this.matchNumberValue,
                    start_position: this.startPositionValue + 1,
                };
                this.$navigateTo(InMatch, { props: {initialPayload: payload }});
            },
        }
    }
</script>

<style scoped>


</style>
