<template>
    <Page class="bg-dark" statusBarStyle="dark">
        <ActionBar title="New Pit Scout" statusBarStyle="dark"/>
        <ScrollView>


            <StackLayout>

                <Label text="Snow Days" class="mt-3 label"/>
                <SegmentedBar class="mx-1">
                    <SegmentedBarItem title="0"/>
                    <SegmentedBarItem title="1"/>
                    <SegmentedBarItem title="2"/>
                    <SegmentedBarItem title="3"/>
                    <SegmentedBarItem title="4"/>
                    <SegmentedBarItem title="5"/>
                    <SegmentedBarItem title="6"/>
                    <SegmentedBarItem title="7"/>
                    <SegmentedBarItem title="8"/>
                    <SegmentedBarItem title="9"/>
                    <SegmentedBarItem title="10"/>
                </SegmentedBar>

                <HR></HR>

                <FlexboxLayout flexDirection="row" justifyContent="space-between" alignItems="center"
                               alignContent="center">
                    <Label text="Starts on Hab 2" class="label"/>
                    <Switch checked="true"/>
                </FlexboxLayout>

                <HR></HR>

                <FlexboxLayout flexDirection="row" justifyContent="space-between" alignItems="center"
                               alignContent="center">
                    <Label text="Cargo in Sandstorm" class="label"/>
                    <Switch checked="true"/>
                </FlexboxLayout>

                <HR></HR>

                <FlexboxLayout flexDirection="row" justifyContent="space-between" alignItems="center"
                               alignContent="center">
                    <Label text="Hatches in Sandstorm" class="label"/>
                    <Switch checked="true"/>
                </FlexboxLayout>

                <HR></HR>

                <FlexboxLayout flexDirection="row" justifyContent="space-between" alignItems="center"
                               alignContent="center">
                    <Label text="Cargo in Teleop" class="label"/>
                    <Switch checked="true"/>
                </FlexboxLayout>

                <HR></HR>

                <Label text="Climb Level" class="label"/>
                <SegmentedBar class="mx-1">
                    <SegmentedBarItem title="0"/>
                    <SegmentedBarItem title="1"/>
                    <SegmentedBarItem title="2"/>
                    <SegmentedBarItem title="3"/>
                </SegmentedBar>

                <HR></HR>

                <Label text="Climb Level" class="label"/>
                <SegmentedBar class="mx-1">
                    <SegmentedBarItem title="0"/>
                    <SegmentedBarItem title="1"/>
                    <SegmentedBarItem title="2"/>
                    <SegmentedBarItem title="3"/>
                </SegmentedBar>

                <HR></HR>

                <FlexboxLayout flexDirection="row" justifyContent="space-between" alignItems="center"
                               alignContent="center">
                    <Label text="Pickup Ground Cargo" class="label"/>
                    <Switch checked="true"/>
                </FlexboxLayout>

                <HR></HR>

                <FlexboxLayout flexDirection="row" justifyContent="space-between" alignItems="center"
                               alignContent="center">
                    <Label text="Pickup Ground Hatch" class="label"/>
                    <Switch checked="true"/>
                </FlexboxLayout>

                <HR></HR>

                <FlexboxLayout flexDirection="row" justifyContent="space-between" alignItems="center"
                               alignContent="center">
                    <Label text="Favorite Feature" class="label"/>
                    <Button :text="fontAwesome.chevronRight" class="fa" />
                </FlexboxLayout>

                <HR></HR>

                <Label text="Favorite Features" class="label"/>
                <TextView text="Notes"/>

                <HR></HR>

                <Label text="Rating" class="label"/>
                <SegmentedBar class="mx-1">
                    <SegmentedBarItem title="0"/>
                    <SegmentedBarItem title="1"/>
                    <SegmentedBarItem title="2"/>
                    <SegmentedBarItem title="3"/>
                    <SegmentedBarItem title="4"/>
                    <SegmentedBarItem title="5"/>
                    <SegmentedBarItem title="6"/>
                    <SegmentedBarItem title="7"/>
                    <SegmentedBarItem title="8"/>
                    <SegmentedBarItem title="9"/>
                    <SegmentedBarItem title="10"/>
                </SegmentedBar>

                <FlexboxLayout class="btn-fun text-center mt-3" flexDirection="row"
                               justifyContent="space-around">
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
