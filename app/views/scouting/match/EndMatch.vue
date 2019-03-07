<template>
    <Page class="bg-dark" statusBarStyle="dark">
        <ActionBar title="New Pit Scout" statusBarStyle="dark"/>
        <ScrollView>


            <StackLayout>

                <Label text="Hab Level" class="mt-3 label"/>
                <SegmentedBar class="mx-1">
                    <SegmentedBarItem title="0"/>
                    <SegmentedBarItem title="1"/>
                    <SegmentedBarItem title="2"/>
                    <SegmentedBarItem title="3"/>
                </SegmentedBar>

                <HR/>

                <Label text="Robot Speed" class="mt-3 label"/>
                <SegmentedBar class="mx-1">
                    <SegmentedBarItem title="1"/>
                    <SegmentedBarItem title="2"/>
                    <SegmentedBarItem title="3"/>
                    <SegmentedBarItem title="4"/>
                    <SegmentedBarItem title="5"/>
                </SegmentedBar>

                <HR/>

                <Label text="Team Work" class="mt-3 label"/>
                <SegmentedBar class="mx-1">
                    <SegmentedBarItem title="1"/>
                    <SegmentedBarItem title="2"/>
                    <SegmentedBarItem title="3"/>
                    <SegmentedBarItem title="4"/>
                    <SegmentedBarItem title="5"/>
                </SegmentedBar>

                <HR/>

                <Label text="Strategy" class="mt-3 label"/>
                <SegmentedBar class="mx-1">
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
                    <Switch checked="true"/>
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
        data() {
            return {
                fontAwesome: fontAwesome,
                synergyLevels: [...Array(10).keys()],
                matchNumbers: [...Array(100).keys()],
            }
        },
        methods: {
            save() {
                this.$navigateTo(App, { clearHistory: true });
            }
        }
    }
</script>

<style scoped>


</style>
