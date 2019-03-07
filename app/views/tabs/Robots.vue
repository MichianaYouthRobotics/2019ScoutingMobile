<template>
    <GridLayout rows="*, auto" class="bg-dark">
        <StackLayout row="0">
            <RadListView ref="listView"
                         for="item in robots"
                         class="bg-dark"
                         @itemTap="goToRobot">
                <v-template>
                    <StackLayout class="item bg-dark">
                        <label :text="item.robot_number" class="h4 text-light"/>
                        <label :text="item.team_name" class="p text-danger"/>
                    </StackLayout>
                </v-template>
            </RadListView>
            <!--<Label :text="robots"></Label>-->
            <!--<Button @tap="alertRobots" text="do something"></Button>-->
        </StackLayout>
    </GridLayout>
</template>

<script>
    import fontAwesome from '@/util/font-awesome'
    import ItemList from '@/components/ItemList'
    import RobotDetail from '@/views/robots/Detail'
    import {mapState} from 'vuex'
    import NewCoachingScout from '@/views/scouting/coaching/New'
    import NewMatchScout from '@/views/scouting/match/New'
    import NewPitScout from '@/views/scouting/pit/New'


    export default {
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
        computed: mapState({
            // arrow functions can make the code very succinct!
            robots: state => state.scouting.robots,

            // passing the string value 'count' is same as `state => state.count`
            countAlias: 'count',

            // to access local state with `this`, a normal function must be used
            countPlusLocalState(state) {
                return state.count + this.localCount
            }
        }),
        methods: {
            goToRobot({ item }) {
                this.$navigateTo(RobotDetail, { props: { robotNumber: item.robot_number }});
            },
        }
    }
</script>

<style scoped>
</style>
