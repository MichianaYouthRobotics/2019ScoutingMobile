<template>
    <GridLayout rows="*, auto" class="bg-dark">
        <StackLayout row="0">
            <item-list  :items="items"></item-list>
            <ListView for="item in items" @itemTap="onItemTap">
                <v-template>
                    <StackLayout class="item bg-dark">
                        <label :text="item.name" class="h4"/>
                        <label :text="item.description" class="p"/>
                    </StackLayout>
                </v-template>
            </ListView>
        </StackLayout>
        <StackLayout row="1">
            <FlexboxLayout class="btn-fun btn-sm text-center" @tap="newScout" flexDirection="row" justifyContent="space-around">
                <Label :text="fontAwesome.plus" class="fa"/>
                <Label text="Scout"/>
            </FlexboxLayout>
        </StackLayout>
    </GridLayout>
</template>

<script>
    import fontAwesome from '@/util/font-awesome'
    import ItemList from '@/components/ItemList'
    import {mapState} from 'vuex'
    import NewCoachingScout from '@/views/scouting/coaching/New'
    import NewMatchScout from '@/views/scouting/match/New'
    import NewPitScout from '@/views/scouting/pit/New'
    import HR from '@/components/HR'


    export default {
        data() {
            return {
                fontAwesome: fontAwesome,
                items: [
                            {name: 'matt', description: 'local 01'},
                            {name: 'matt', description: 'local 02'},
                            {name: 'matt', description: 'local 03'},
                            {name: 'matt', description: 'local 04'},
                            {name: 'matt', description: 'local 05'},
                            {name: 'matt', description: 'local 01'},
                            {name: 'matt', description: 'local 02'},
                            {name: 'matt', description: 'local 03'},
                            {name: 'matt', description: 'local 04'},
                            {name: 'matt', description: 'local 05'},
                            {name: 'matt', description: 'local 01'},
                            {name: 'matt', description: 'local 02'},
                            {name: 'matt', description: 'local 03'},
                            {name: 'matt', description: 'local 04'},


                ],
            }
        },
        components: {ItemList, HR},
        computed: mapState({
            // arrow functions can make the code very succinct!
            count: state => state.count,

            // passing the string value 'count' is same as `state => state.count`
            countAlias: 'count',

            // to access local state with `this`, a normal function must be used
            countPlusLocalState(state) {
                return state.count + this.localCount
            }
        }),
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
            onItemTap(item) {
                alert(item);
            }

        }
    }
</script>

<style scoped>
</style>
