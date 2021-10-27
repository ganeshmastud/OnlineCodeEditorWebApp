<template>
        <div class=" col-12 bg-primary">
            <b-navbar class="col-11  mx-auto" toggleable="lg" type="dark" variant="primary">
                <b-navbar-brand href="#">Code Editor</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="d-flex justify-content-start col-6 ">
                    <b-nav-item href="#">Home</b-nav-item>
                    <b-nav-item href="#" >Start Coding</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class=" col-6 justify-content-end">
                    
                    <b-nav-item href="#">Hello email@exapmle.com</b-nav-item>
                    <b-nav-item href="#" >Login</b-nav-item>

                   

                   
                </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>

</template>

<script>
    export default{
        name:'NavBar'
    }
</script>

<style scoped>
@media only screen and (min-width: 900px) {


}
    
</style>