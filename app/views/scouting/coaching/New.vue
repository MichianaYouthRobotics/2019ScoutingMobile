<template>
    <Page class="bg-dark" statusBarStyle="dark">
        <ActionBar title="Coaching Scout" statusBarStyle="dark"/>
        <StackLayout>
            <Label :text="robot.robot_number" class="h2 text-light text-monospace"/>
            <Label :text="robot.team_name" class="h3 text-info"/>
            <Label text="Type Match Number" class="mt-3 label"/>
            <TextField text="0" hint="Match Number" keyboardType="number" class="input" v-model="matchNumberValue"/>
            <Label text="Synergy" class="mt-3 label"/>
            <SegmentedBar v-model="synergyValue">
                <SegmentedBarItem title="1" />
                <SegmentedBarItem title="2" />
                <SegmentedBarItem title="3" />
                <SegmentedBarItem title="4" />
                <SegmentedBarItem title="5" />
            </SegmentedBar>
            <!--<Label text="Notes" class="mt-3"/>-->
            <!--<TextView text="Notes"/>-->
            <FlexboxLayout class="btn-fun text-center mt-5" @tap="save" flexDirection="row" justifyContent="space-around">
                <Label text="Save"/>
            </FlexboxLayout>
        </StackLayout>
    </Page>
</template>

<script>
    import fontAwesome from '@/util/font-awesome'

    export default {
        props: ['robotNumber'],
        data() {
            return {
                fontAwesome: fontAwesome,
                synergyValue: '',
                matchNumberValue: '',
                synergyLevels: [...Array(10).keys()],
                matchNumbers: [...Array(100).keys()],
            }
        },
        computed: {
            robot() {
                return this.$store.getters['scouting/getRobotByNumber'](this.robotNumber);
            }
        },
        methods: {
            save() {
                alert(JSON.stringify({
                    'robot': this.robot.robot_pk,
                    'synergy': this.synergyValue + 1,
                    'match_number': this.matchNumberValue
                }))
            }
        }
    }
</script>

<style scoped>


</style>
