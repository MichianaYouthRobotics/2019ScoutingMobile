<template>
    <Page class="bg-dark" statusBarStyle="dark">
        <ActionBar title="New Match Scout" statusBarStyle="dark"/>
        <ScrollView>


            <StackLayout>

                <Label text="Robot 17" class="h1 text-light"/>
                <Label text="Match 5" class="h3 text-light"/>


                <Label text="Tap GO! when the match starts" class="h5 text-danger"></Label>
                <FlexboxLayout class="btn-fun text-center mt-3" flexDirection="row"
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
        data() {
            return {
                fontAwesome: fontAwesome,
                synergyLevels: [...Array(10).keys()],
                matchNumbers: [...Array(100).keys()],
            }
        },
        methods: {
            go () {
                this.$navigateTo(InMatch);
            },
        }
    }
</script>

<style scoped>


</style>
