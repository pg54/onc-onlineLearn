<template>
    <div>
        <iframe :src="infoPath" width="100%" height="600px" name="eduIframe" id="eduIframe" frameborder="0" marginwidth="0" marginheight="0">
            <body style='overflow:scroll;overflow-y:hidden'>
            </body>
        </iframe>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    export default {
        name: 'infoItem',
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters([
                'infoPath'
            ]),
        },
        methods: {

        },
        activated() {

        }
    };
</script>

<style lang="stylus" scoped>

</style>
