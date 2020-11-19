<template>
    <div class="row">
        <add-user></add-user>
        <user-table :userlist="name"></user-table>
        <p>{{allusers}}</p>    
    </div>
</template>
<script>
import AddUser from '@/components/AddUser.vue'
import UserTable from '@/components/UserTable.vue'
export default {
    components: {
        AddUser,
        UserTable
    },
    data() {
        return {
            allusers: [],
            name: [],
            test: null
        }
    },
    mounted(){
        fetch('http://localhost:9000/oauth/tokens')
        .then(response =>response.json())
        // .then(data=>(this.allusers = data.body.content));
        .then(data=>{
            this.allusers = data.body.content
            this.name = [...this.allusers]
        });
        
    },
    methods:{
        thisName(){
            this.name = this.allusers;
        }
    }
}
</script>