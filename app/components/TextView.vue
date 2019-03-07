<template>
    <Page class="bg-dark" statusBarStyle="dark">
        <ActionBar :title="robot.team_name">
            <ActionItem @tap="save"
                        ios.systemIcon="3" ios.position="right"
                        text="save" android.position="popup" />
        </ActionBar>
        <ScrollView orientation="vertical">
            <TextView text="Multi\nLine\nText"  v-model="text"/>
        </ScrollView>
    </Page>
</template>

<script>

    export default {
        props: ['initialText'],
        data() {
            return {
                text: this.initialText,
            }
        }
        ,
        methods: {
            save() {
               this.$modal.close(this.text)
            },
        }
    }
</script>

<style scoped>
</style>
