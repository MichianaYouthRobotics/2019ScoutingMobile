<template>
    <Page class="bg-dark" statusBarStyle="dark">
        <ActionBar title="New Pit Scout" statusBarStyle="dark"/>
        <ScrollView>


            <StackLayout>

                <Label text="Hab Level" class="mt-3 label"/>
                <SegmentedBar class="mx-1" v-model="habLevelValue">
                    <SegmentedBarItem title="0"/>
                    <SegmentedBarItem title="1"/>
                    <SegmentedBarItem title="2"/>
                    <SegmentedBarItem title="3"/>
                </SegmentedBar>

                <HR/>

                <Label text="Rate the Robot's Speed" class="mt-3 label"/>
                <SegmentedBar class="mx-1" v-model="speedValue">
                    <SegmentedBarItem title="1"/>
                    <SegmentedBarItem title="2"/>
                    <SegmentedBarItem title="3"/>
                    <SegmentedBarItem title="4"/>
                    <SegmentedBarItem title="5"/>
                </SegmentedBar>

                <HR/>

                <Label text="Rate the Robot's Team Work" class="mt-3 label"/>
                <SegmentedBar class="mx-1" v-model="teamWorkValue">
                    <SegmentedBarItem title="1"/>
                    <SegmentedBarItem title="2"/>
                    <SegmentedBarItem title="3"/>
                    <SegmentedBarItem title="4"/>
                    <SegmentedBarItem title="5"/>
                </SegmentedBar>

                <HR/>

                <Label text="Rate the Robot's Strategy" class="mt-3 label"/>
                <SegmentedBar class="mx-1" v-model="strategyValue">
                    <SegmentedBarItem title="1"/>
                    <SegmentedBarItem title="2"/>
                    <SegmentedBarItem title="3"/>
                    <SegmentedBarItem title="4"/>
                    <SegmentedBarItem title="5"/>
                </SegmentedBar>

                <HR/>

                <FlexboxLayout flexDirection="row" justifyContent="space-between" alignItems="center"
                               alignContent="center">
                    <Label text="Good Robot?" class="label"/>
                    <Switch checked="true" v-model="goodRobotValue"/>
                </FlexboxLayout>

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
    import App from '@/views/App'

    export default {
        components: {HR},
        props: ['initialPayload'],

        data() {
            return {
                fontAwesome: fontAwesome,
                habLevelValue: 0,
                speedValue: 0,
                teamWorkValue: 0,
                strategyValue: 0,
                goodRobotValue: true,
            }
        },
        methods: {
            save() {
                let payload = this.initialPayload;
                payload.speed = this.speedValue + 1;
                payload.hab_level = this.habLevelValue + 1;
                payload.strategy = this.strategyValue + 1;
                payload.team_work = this.teamWorkValue + 1;
                payload.recommend = this.goodRobotValue;
                this.$store.dispatch('scouting/addMatchScout', payload);
                this.$navigateTo(App, { clearHistory: true });
            }
        }
    }
</script>

<style scoped>


</style>
