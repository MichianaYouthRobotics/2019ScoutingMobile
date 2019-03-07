<template>
    <GridLayout rows="*">
        <StackLayout row="1">
            <GridLayout columns="115, 115" rows="115, 115">
                <Label text="0,0" row="0" col="0" backgroundColor="#43b883"/>
                <Label text="0,1" row="0" col="1" backgroundColor="#1c6b48"/>
                <Label text="1,0" row="1" col="0" backgroundColor="#289062"/>
                <Label text="1,1" row="1" col="1" backgroundColor="#43b883"/>
            </GridLayout>
            <GridLayout columns="115, 115" rows="115, 115">
                <Label text="0,0" row="0" col="0" backgroundColor="#43b883"/>
                <Label text="0,1" row="0" col="1" backgroundColor="#1c6b48"/>
                <Label text="1,0" row="1" col="0" backgroundColor="#289062"/>
                <Label text="1,1" row="1" col="1" backgroundColor="#43b883"/>
            </GridLayout>
        </StackLayout>
    </GridLayout>
</template>

<script>
    import fontAwesome from '@/util/font-awesome'

    export default {
        data() {
            return {
                fontAwesome: fontAwesome
            }
        },
        computed: {
            connected () {
                return this.$store.state.scouting.connected;
            },
            errorMsg() {
                return this.$store.state.scouting.errorMsg || 'NOT CONNECTED';
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
