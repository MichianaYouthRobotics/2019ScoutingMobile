<template>
    <GridLayout rows="*, auto">
        <StackLayout row="0">
            <FlexboxLayout height="100%" flexDirection="column" justifyContent="space-around">
                <StackLayout alignSelf="center" backgroundColor="#3c495e" class="mx-1 card" width="95%" marginLeft="10">
                    <Label text="Server URL" class="label"/>
                    <TextField v-model="server" hint="server.com" class="input mb-3"/>

                    <Label text="Event ID" class="label"/>
                    <TextField v-model="id" hint="1" class="input mb-3"/>

                    <Label text="Event Passcode" class="label"/>
                    <TextField v-model="key" hint="GROUND-ZERO" class="input mb-3"/>

                    <Label text="Your Name" class="label"/>
                    <TextField v-model="name" hint="Matt K" class="input"/>
                </StackLayout>
                <StackLayout>
                    <Label v-if="this.$store.state.scouting.connected" text="CONNECTED" class="text-primary text-center status"/>
                    <Label v-else alignSelf="center" :text="this.errorMsg" class="text-danger text-center status"/>
                    <Button v-if="this.$store.state.scouting.connected" alignSelf="center" text="SYNC" @tap="sync" class="btn-fun mx-3"/>
                    <Button v-else alignSelf="center" text="CONNECT" @tap="connect" class="btn-fun mx-3"/>
                </StackLayout>
            </FlexboxLayout>
        </StackLayout>
        <Label text="POWERED BY 4409 GROUND ZERO" class="text-light text-center small" row="1" @tap="resetApp"/>
    </GridLayout>
</template>

<script>
    import fontAwesome from '@/util/font-awesome'

    export default {
        data() {
            return {
                server: this.$store.state.scouting.server,
                id: this.$store.state.scouting.eventID,
                key: this.$store.state.scouting.eventKey,
                name: this.$store.state.scouting.myName,
                fontAwesome: fontAwesome,
                tapCount: 0,

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
            connect: function () {
                let payload = {
                    'server': this.server.replace('http://', '').replace('https://', ''),
                    'id': this.id,
                    'myName': this.name,
                    'key': this.key,
                };
                this.$store.dispatch('scouting/connect', payload)
            },
            sync: function () {
                this.$store.dispatch('scouting/sync')
            },
            resetApp() {
                this.tapCount += 1;
                if (this.tapCount > 8) {
                    confirm({
                        title: "WARNING",
                        message: "Would you like to reset the app and all your local data?",
                        okButtonText: "Yes",
                        cancelButtonText: "Cancel"
                    }).then(result => {
                        if (result) {
                            this.$store.dispatch('scouting/reset')
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>
</style>
