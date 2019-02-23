<template>
    <Page class="bg-dark">
        <FlexboxLayout flexDirection="column" justifyContent="center" alignContent="center">
            <Label text="Login" class="text-light h1 mx-3"/>
            <StackLayout backgroundColor="#3c495e" class="mx-3 card">
                <Label text="Server" class="label"/>
                <TextField :text="textFieldValue" hint="server.com" class="input mb-3" />

                <Label text="Event Passcode" class="label"/>
                <TextField :text="textFieldValue" hint="GROUND-ZERO" class="input mb-3" />

                <Label text="Your Name" class="label"/>
                <TextField :text="textFieldValue" hint="Matt K" class="input" />

            </StackLayout>
            <Button text="LOG ME IN" @tap="doLogin" class="btn-fun mx-3 my-3"/>

            <Label text="Ground Zero Scouting 2019" class="text-light text-center" paddingTop="100" />

        </FlexboxLayout>


    </Page>
</template>

<script >
  export default {
    data() {
      return {
        msg: ''
      }
    },
      methods: {
        doLogin: function() {
            alert('logging in!')
        }
      }
  }
</script>

<style scoped>
</style>
