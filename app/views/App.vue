<template>
    <Page class="bg-dark" statusBarStyle="dark">
        <ActionBar :title="title">
            <!--<ActionItem @tap="newScout"-->
                        <!--ios.systemIcon="4" ios.position="right"-->
                        <!--text="add" android.position="popup" />-->
        </ActionBar>
        <TabView tabBackgroundColor="#2b314d"
                 tabTextColor="#cccccc"
                 selectedTabTextColor="#ffffff"
                 selectedTabBorderColor="#ffffff"
                 selectedTabBorderWidth="3"
                 selectedTabHighlightColor="#ffffff"
                 @selectedIndexChange="indexChange">
            <!--<TabViewItem title="Scouting">-->
                <!--<Scouting class="bg-dark"></Scouting>-->
            <!--</TabViewItem>-->
            <TabViewItem title="Robots">
                <Robots></Robots>
            </TabViewItem>
            <TabViewItem title="Stats">
                <Stats></Stats>
            </TabViewItem>
            <TabViewItem title="Settings">
                <Settings></Settings>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
    import Scouting from '@/views/tabs/Scouting'
    import Stats from '@/views/tabs/Stats'
    import Settings from '@/views/tabs/Settings'
    import Robots from '@/views/tabs/Robots'


    export default {
        components: {Settings, Scouting, Stats, Robots},
        data() {
            return {
                title: 'Scouting',
            }
        },
        created() {
            this.$store.dispatch('scouting/initializeState')
        },
        methods: {
            indexChange (e) {
                let newIndex = e.value;
                if (newIndex === 0) {
                    this.title = 'Robots';
                } else if (newIndex === 1) {
                    this.title = 'Stats';
                } else if (newIndex === 2) {
                    this.title = 'Settings';
                } else {
                    this.title = 'Settings';
                }
            },
        }

    }
</script>

<style scoped>
    .action-bar {
        color: #ffffff;
    }

    .action-bar {
        background-color: #ff0000;
    }
</style>
