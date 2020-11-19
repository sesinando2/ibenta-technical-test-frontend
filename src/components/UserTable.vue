<template>
    <div class='col-md-12'>
         <table class="table">
            <tr v-for="(alluser, index) in userlist">
                <td class="mx3">{{alluser.name}}</td>
                <td>{{alluser.firstName}}</td>
                <td>{{alluser.lastName}}</td>
                <td>{{alluser.email}}</td>
                <td>{{alluser.password}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    name: 'user-table',
    props: {
        userlist: Array
    }
}
</script>