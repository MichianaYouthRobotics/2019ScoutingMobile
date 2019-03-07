<template>
    <Page class="bg-dark" statusBarStyle="dark">
        <ActionBar title="New Coaching Scout" statusBarStyle="dark"/>
        <StackLayout>
            <Label text="Match Number" class="mt-3"/>
            <TextField text="0" hint="Match Number" keyboardType="number" class="input"/>
            <Label text="Synergy" class="mt-3"/>
            <SegmentedBar>
                <SegmentedBarItem title="1" />
                <SegmentedBarItem title="2" />
                <SegmentedBarItem title="3" />
                <SegmentedBarItem title="4" />
                <SegmentedBarItem title="5" />
                <SegmentedBarItem title="6" />
                <SegmentedBarItem title="7" />
                <SegmentedBarItem title="8" />
                <SegmentedBarItem title="9" />
                <SegmentedBarItem title="10" />
            </SegmentedBar>
            <Label text="Notes" class="mt-3"/>
            <TextView text="Notes"/>
            <FlexboxLayout class="btn-fun text-center mt-5" @tap="newScout" flexDirection="row" justifyContent="space-around">
                <Label text="Save"/>
            </FlexboxLayout>
        </StackLayout>
    </Page>
</template>

<script>
    import fontAwesome from '@/util/font-awesome'

    export default {
        data() {
            return {
                fontAwesome: fontAwesome,
                synergyLevels: [...Array(10).keys()],
                matchNumbers: [...Array(100).keys()],
            }
        },
    }
</script>

<style scoped>


</style>
