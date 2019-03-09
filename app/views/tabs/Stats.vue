<template>
    <GridLayout rows="*">
        <StackLayout row="1">
            <SegmentedBar v-model="listPicker">
                <SegmentedBarItem title="Hatch Bots" />
                <SegmentedBarItem title="Climb Bots" />
                <ScrollView>
                    <StackLayout>
                        <StackLayout v-for="bot in topClimbBots">
                            <GridLayout columns="*, auto, *"  backgroundColor="#3c495e">
                                <Label :text="bot.robot_number" col="0" backgroundColor="#43b883"/>
                                <Label :text="bot.avg" col="1" backgroundColor="#1c6b48"/>
                                <Label :text="bot.total" col="2" backgroundColor="#289062"/>
                            </GridLayout>
                        </StackLayout>
                    </StackLayout>
                </ScrollView>
            </SegmentedBar>
        </StackLayout>
    </GridLayout>
</template>

<script>
    import fontAwesome from '@/util/font-awesome'

    export default {
        data() {
            return {
                fontAwesome: fontAwesome,
                listPicker: 0
            }
        },
        computed: {
            connected () {
                return this.$store.state.scouting.connected;
            },
            errorMsg() {
                return this.$store.state.scouting.errorMsg || 'NOT CONNECTED';
            },
            topHatchBots() {
                return this.$store.state.scouting.topHatchBots;
            },
            topClimbBots() {
                return this.$store.state.scouting.topClimbBots;
            }
        },
        methods: {
            testy() {
                this.heythere = 'matthew was here';
            },
            doLogin: function () {
                let payload = {
                    'server': this.server.replace('http://', '').replace('https://', ''),
                    'id': this.id,
                    'name': this.name,
                    'key': this.key,
                }
                this.$store.dispatch('scouting/login', payload)
            }
        }
    }
</script>

<style scoped>
</style>
